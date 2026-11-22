import { isAllowedPapaCambridgePdfUrl } from '../../../src/utils/papacambridge';

export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const reqUrl = new URL(context.request.url);
  const rawUrl = reqUrl.searchParams.get('url') || '';
  const parsed = isAllowedPapaCambridgePdfUrl(rawUrl);

  if (!parsed) {
    return new Response(
      JSON.stringify({ error: 'Invalid or disallowed PapaCambridge PDF URL' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
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
      return new Response(
        JSON.stringify({ error: `Upstream returned ${upstream.status}` }),
        {
          status: upstream.status,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }
      );
    }

    const contentType = upstream.headers.get('content-type') || 'application/pdf';
    const buf = await upstream.arrayBuffer();
    const head = new TextDecoder('latin1').decode(new Uint8Array(buf, 0, Math.min(buf.byteLength, 1024)));

    if (!head.includes('%PDF-')) {
      return new Response(
        JSON.stringify({
          error: `PapaCambridge returned ${contentType} instead of a PDF (this file may not exist in the archive).`,
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }
      );
    }

    const filename = parsed.pathname.split('/').pop() || '0580.pdf';

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve PDF from PapaCambridge' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
}
