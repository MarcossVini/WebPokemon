import http from 'node:http';
import { IncomingMessage } from 'node:http';

declare module 'node:http' {
  interface IncomingMessage {
    params?: Record<string, string>;
    query?: Record<string, string>;
  }
}
import { json } from './middlewares/json.js';
import { routes } from './routes/pokemon.routes.js';
import { extractQueryParams } from './utils/extractQueryParams.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url ?? '');
  });

  if (route) {
    const routeParams = req.url?.match(route.path);

    if (routeParams?.groups) {
      req.params = { ...routeParams.groups };
      
      if (routeParams.groups.query) {
        req.query = extractQueryParams(routeParams.groups.query);
      }
    }

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log('🚀 Server running on port 3333');
});