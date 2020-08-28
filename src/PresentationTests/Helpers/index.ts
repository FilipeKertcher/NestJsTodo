export function makeHttpRequest({ body = {}, query = {}, params = {}, headers = {} }) {
    return {
        body,
        headers,
        query,
        params,
    };
}