export function extractQueryParams(query) {
    return query.substr(i).split('&').reduce((queryParams,param) => {
        const [key, value] = param.split('=')
        
        queryParams[key]= value
    
        return queryParams
    }, {})
}