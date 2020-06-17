const baseUrl = "https://api.airtable.com/v0/appSlGM6UHvPEi9Mj/Todos"
const myRequest = new Request(baseUrl);
const myHeaders = new Headers();
let myInit = {
    method: 'GET',
    headers: myHeaders
};
myHeaders.append('Authorization', 'Bearer keyqL6Ke0FIAQtmOQ');
myHeaders.append('Content-Type', 'application/json');

export const get = () => {
    return fetch(myRequest, myInit)
        .then(response => response.json())
        .then(data => {
            const formatData = data.records.map(data => {
                return {
                    id: data.id,
                    text: data.fields.text,
                    status: data.fields.status ? data.fields.status : false
                }
            })
            return formatData
        })
}

export const update = (todo) => {
    myInit.method = "PATCH"
    let data = {
        records: [{
                id: todo.id,
                fields: {
                    text: todo.text,
                    status: todo.status
                }
            }

        ]
    }
    myInit.body = JSON.stringify(data)
    return fetch(myRequest, myInit)
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const create = (todo) => {
    myInit.method = "POST"
    let data = {
        records: [{
            fields: {
                text: todo.text,
                status: todo.status
            }
        }]
    }
    myInit.body = JSON.stringify(data)
    return fetch(myRequest, myInit)
        .then(response => response.json())
        .then(data => {
            const formatData = data.records.map(data => {
                return {
                    id: data.id,
                    text: data.fields.text,
                    status: data.fields.status ? data.fields.status : false
                }
            })
            return formatData[0]
        })
}

export const destroy = (id) => {
    myInit.method = "DELETE"
    fetch(baseUrl+"/"+id, myInit)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}