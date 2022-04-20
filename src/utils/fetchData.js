export function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(json => json)
}
export function postData(url, payload) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(json => json)
}
