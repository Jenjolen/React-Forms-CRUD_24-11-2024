export function fetchData(url, callback, method, body) {

    const headers =
        {
            'Accept': 'application/json'
        }

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json'
    }

    const options = {
        method,
        headers
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    fetch(url, options)
        .then(res => res.json())
        .then(data => callback(data)) // callback kan være en setter function, som opdaterer state i App.jsx
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
            } else {
                console.log("Network error");
            }
        })
}
