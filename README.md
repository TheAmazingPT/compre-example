# Testcase for HotW with Deno and Compre
I am testing the concept of microfrontends with nanoservices in the
backend.

The backend is powered by [Deno](https://deno.land) and each endpoint is
its own deployable nanoservice.

There are data endpoints and HTML endpoints (views). There is no need anymore
for JSON APIs to exchange data and to duplicate state with the frontend.

For each request from the frontend the response will be an HTML component, pre-rendered with data.
The frontend will have a super lightweight library for managing the microfrontends,
when to update them or when to change the structure.
This works with Compre (Component Registry), which acts as a messagebus and
components registry, where each component is registering itself and signaling to
other components that an event has happened.

Its easily possible to create static, reactive and dynamic components.

This project is a showcase, which shows a twitter-like chat application, in which
many different kinds of components are created.

### Dependencies
- (Deno ~v1.13.0)[https://github.com/denoland/deno/releases/latest]
- (sqlite3)[https://sqlite.org/download.html]

For both you should be able to use Homebrew or MacPorts to install those tools on macOS.

### Setup
```
make setup
```

### Usage
```
make start
```
