import { createMocks } from 'next-test-api-route-handler';

export async function invoke(handler, { method='GET', headers={}, body } = {}) {
  const { req, res } = createMocks({ method, headers, body });
  await handler(req, res);
  return res;
}
