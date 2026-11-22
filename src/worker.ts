import { handleApiRequest } from './utils/workerApi';

interface AssetsFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface WorkerEnv {
  ASSETS: AssetsFetcher;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const apiResponse = await handleApiRequest(request);
    if (apiResponse) {
      return apiResponse;
    }
    return env.ASSETS.fetch(request);
  },
};
