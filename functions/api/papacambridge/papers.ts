import { fetchPapaCambridgePapers } from '../../../src/utils/papacambridge';

export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const reqUrl = new URL(context.request.url);
  const session = reqUrl.searchParams.get('session') || '2024-may-june';

  if (!/^[a-z0-9-]+$/i.test(session)) {
    return new Response(JSON.stringify({ error: 'Invalid session parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const result = await fetchPapaCambridgePapers(session);
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
    },
  });
}
