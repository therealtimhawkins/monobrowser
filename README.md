<h1 align="center">monobrowser {:-)</h1>
<p align="center">Promise-based browser extension helpers</p>

## Features

- Router - express style routing between browser extension scripts
- Scraper - high level web scraping from within a browser extension

## Install

- `npm install monobrowser`

## Router

- The router is used to provide express style, promise based routing between the scripts of a browser extension.

```
import { Router } from "monobrowser";
const router = new Router(browser);
```

- Each router should be passed the browser instance. An optional second argument `route` can be passed to the router `new Router(browser, '/base-route')`. This sets the base route of the router.

### receive()

- `router.receive(route, callback)` adds a route to the router. The callback is passed the `body` arguement passed through from `router.send()`. This does not need to return a response.

```
router.receive("/example-path", (body) => {
  const message = body.message
  return { payload: `Your message: ${body.message}` }
});

```

### send()

- `router.send(route, body)` sends a message to the `current tab`. If the receiving router has been given a base route you will need to append that to the route.

```
const response = await router.send("/base-route/example-path", { message: "message payload" });

```

- `router.sendAll(route, body)` sends a message to the `all tabs`. You will need to used sendAll() when routing message from most scripts to the background script.

```
const response = await router.sendAll("/example-path", { message: "message payload" });

```

### log()

- The router has some built in logging functionality. To use this run `router.logInit()` in the background script. All logs from `router.log('logging message!')` will be routed to the background script. This can accept strings or objects

```
router.log("Logging!");
```

## Scraper

- The scraper is used to easily access and parse web page data. The scraper will only work in scripts which have access to the dom.

```
import { Scraper } from "monobrowser";
const scraper = new Scraper(browser);
```

- Each router should be passed the document instance.

### get()

- `scraper.get(element)` returns an array of elements. className, tag or id can be used.

```
const response = scraper.get({tag: 'img'})

```

### getListData()

- `scraper.getListData(list, element)` returns an array of parsed html data. The list arguement The element arguemenmt specifies the name of the

```
const response = scraper.getListData()

```
