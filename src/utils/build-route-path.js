export function buildRoutePath(path){

    const routeParameterRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParameterRegex,'(?<$1>[a-z0-9\_]+)')
    
    console.log(pathWithParams)
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
} 