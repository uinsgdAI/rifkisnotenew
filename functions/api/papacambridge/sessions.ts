import { fetchPapaCambridgeSessions } from '../../../src/utils/papacambridge';

export async function onRequestGet(): Promise<Response> {
  const result = await fetchPapaCambridgeSessions();
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
    },
  });
}
