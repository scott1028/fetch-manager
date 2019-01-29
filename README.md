# fetch-manager
A fetch-manager for hooking pre-action for you.

# Usage

```js
// mock session
let session = {
  expired: true,
  value: 'my-token',
};

const setSessionValid = () => {
  session.expired = false; // this will be executed before fetch.
  perform();
}

// config fetch in manager
const { perform, fetch: fetchApi } = fetchManager(fetch, () => !session.expired)

// test-case
const emitFetch = () => {
  const url = `/api/${new Date().getTime()}`;
  fetchApi(url).then(resp => console.log(`${new Date().getTime()}`, url));
  console.log(`fetchApi invoked: ${url}`);
};

// all fetch will be pending, until you execute perform function,
// so you can do something before you execute perform function.
emitFetch();
emitFetch();
emitFetch();
setSessionValidMessage();
```

# Platforms

1. CommonJs: `dist/ciam-express-sdk.cjs.js`
2. ES Module: `dist/ciam-express-sdk.esm.js`
3. UMD(Browser): `dist/ciam-express-sdk.umd.js`
