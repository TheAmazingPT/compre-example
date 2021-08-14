# Microfrontends Testcase
I am testing the concept of micro frontends with nano services in the
backend.
The backend is powered by [Deno](https://deno.land) and each endpoint is
its own deployable nano service.

There are data endpoints and HTML endpoints (views). There is no need anymore
for JSON APIs to exchange data and to duplicate state.
For every request the response will be an HTML component, pre-rendered with data.
The frontend will have a super lightweight library for managing the micro-
frontends, when to update them or when to change the structure. This works via
a messagebus, where each component is registering itself and signaling to
other components that an update has happened.

### Dependencies
- Deno ~v1.13.0

### Usage
```
# For development
deno run --watch --allow-net --allow-read main.ts
```
