// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const config = {
        method: customConfig.method,
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }
    console.info("comes here", JSON.stringify(customConfig))
    console.info("endpoint", endpoint)
    let data
    try {
        const response = await window.fetch(endpoint, config)
        data = await response.json()
        if (response.ok) {
            return data
        }
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body , method:'POST'})
}
client.delete = function(endpoint ,customConfig={}){
    return client(endpoint,{...customConfig , method:'DELETE'})
}
client.put=function(endpoint,updates,customConfig={}){
    return client(endpoint,{...customConfig, method:'PUT',body :updates})
}
// return client(`list-items/${listItemId}`, {
//     method: 'PUT',
//     body: updates,
//   })