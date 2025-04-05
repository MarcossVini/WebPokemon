export function buildRoutePath(path: string): RegExp {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replace(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
}