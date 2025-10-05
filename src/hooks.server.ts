import type { Handle } from '@sveltejs/kit';

const isolationHeaders: Record<string, string> = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp'
};

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  for (const [header, value] of Object.entries(isolationHeaders)) {
    if (!response.headers.has(header)) {
      response.headers.set(header, value);
    }
  }

  return response;
};
