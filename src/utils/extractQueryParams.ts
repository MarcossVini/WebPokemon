export function extractQueryParams(query: string): Record<string, string> {
  return query
    .substring(1)
    .split('&')
    .reduce((queryParams: Record<string, string>, param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
      return queryParams;
    }, {});
}