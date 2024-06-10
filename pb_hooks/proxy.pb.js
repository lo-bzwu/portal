
routerAdd("GET", "/api/proxy/lessons", (c) => {

    const res = $http.send({
        url: "http://davinci-cache:8000/lessons?classes=" + encodeURIComponent(c.queryParam("classes")) + "&teachers=" + encodeURIComponent(c.queryParam("teachers")),
        method: "GET",
        headers: $apis.requestInfo(c).headers,
        timeout: 120,
    })

    const responseType = res.headers['content-type']
    for (let [key, value] of Object.entries(res.headers)) c.response().header().set(key, value)

    if (responseType === "application/json") return c.json(res.statusCode, res.json)
    return c.string(res.statusCode, res.raw)
})

routerAdd("GET", "/api/proxy/classes", (c) => {

    const res = $http.send({
        url: "http://davinci-cache:8000/classes",
        method: "GET",
        headers: $apis.requestInfo(c).headers,
        timeout: 120,
    })

    const responseType = res.headers['content-type']
    for (let [key, value] of Object.entries(res.headers)) c.response().header().set(key, value)

    if (responseType === "application/json") return c.json(res.statusCode, res.json)
    return c.string(res.statusCode, res.raw)
})

routerAdd("GET", "/api/proxy/menus/current.json", (c) => {

    const res = $http.send({
        url: "https://migros-lindenhof-api.janic.cc/current.json",
        headers: $apis.requestInfo(c).headers,
        method: "GET",
        timeout: 120,
    })

    for (let [key, value] of Object.entries(res.headers)) c.response().header().set(key, value)

    return c.json(res.statusCode, res.json)
})

routerAdd("GET", "/api/proxy/menus/next.json", (c) => {

    const res = $http.send({
        url: "https://migros-lindenhof-api.janic.cc/next.json",
        headers: $apis.requestInfo(c).headers,
        method: "GET",
        timeout: 120,
    })

    for (let [key, value] of Object.entries(res.headers)) c.response().header().set(key, value)

    return c.json(res.statusCode, res.json)
})

routerAdd("GET", "/api/ci/update", (c) => {

    c.string(res.statusCode, "Update scheduled.")

    const res = $http.send({
        url: "http://watchtower:8080/v1/update",
        headers: $apis.requestInfo(c).headers,
        method: "GET",
        timeout: 120,
    })


})
