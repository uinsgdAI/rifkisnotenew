import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  fetchPapaCambridgePapers,
  fetchPapaCambridgeSessions,
  isAllowedPapaCambridgePdfUrl,
} from './src/utils/papacambridge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/papacambridge/sessions', async (_req, res) => {
    const result = await fetchPapaCambridgeSessions();
    res.json(result);
  });

  app.get('/api/papacambridge/papers', async (req, res) => {
    const session = typeof req.query.session === 'string' ? req.query.session : '2024-may-june';
    if (!/^[a-z0-9-]+$/i.test(session)) {
      res.status(400).json({ error: 'Invalid session parameter' });
      return;
    }
    const result = await fetchPapaCambridgePapers(session);
    res.json(result);
  });

  app.get('/api/papacambridge/pdf', async (req, res) => {
    const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
    const parsed = isAllowedPapaCambridgePdfUrl(rawUrl);
    if (!parsed) {
      res.status(403).json({ error: 'Invalid or disallowed PapaCambridge PDF URL' });
      return;
    }

    try {
      const upstream = await fetch(parsed.toString(), {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'application/pdf,application/octet-stream,*/*;q=0.9',
          Referer: 'https://pastpapers.papacambridge.com/',
        },
        signal: AbortSignal.timeout(20000),
      });

      if (!upstream.ok) {
        res.status(upstream.status).json({ error: `Upstream returned ${upstream.status}` });
        return;
      }

      const contentType = upstream.headers.get('content-type') || 'application/pdf';
      const arrayBuf = await upstream.arrayBuffer();
      const bytes = Buffer.from(arrayBuf);
      const head = bytes.subarray(0, 1024).toString('latin1');

      if (!head.includes('%PDF-')) {
        res.status(404).json({
          error: `PapaCambridge returned ${contentType} instead of a PDF (this file may not exist in the archive).`,
        });
        return;
      }

      const filename = path.basename(parsed.pathname);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(bytes);
    } catch {
      res.status(502).json({ error: 'Failed to retrieve PDF from PapaCambridge' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cambridge 0580 Assistant listening on http://localhost:${PORT}`);
    // Pre-warm live PapaCambridge cache non-blockingly
    void fetchPapaCambridgeSessions();
    void fetchPapaCambridgePapers('2024-may-june');
  });
}

startServer();
