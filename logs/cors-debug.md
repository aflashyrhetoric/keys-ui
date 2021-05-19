## Cors Issues

### Breakdown of the diagnostic steps

- The back-end was properly handling the request when sent via Insomnia, but not the web front-end
- Because we had `Content-Type: Application/json`, the POST request was sending a CORS pre-flight request. It normally does not get sent for POST, but it did because of that header. 
  - FYI, the request (from the front-end) was set up via a function that uses Fetch(). Fetch takes in a JS object as config, but this switches the method from "POST" to `OPTIONS` apparently.
- So we needed a way to tell our server to enable cors for all routes, so we install the cors middleware and enable. Something like that fk i didn't update this on time i forgot it all now