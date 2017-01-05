# single-spa-inferno

Generic lifecycle hooks for Inferno applications that are registered as [child applications](https://github.com/CanopyTax/single-spa/blob/master/docs/child-applications.md) of [single-spa](https://github.com/CanopyTax/single-spa).

## Quickstart

First, in the child application, run `npm install --save single-spa-inferno` (or `jspm install npm:single-spa-inferno` if your child application is managed by jspm). Then, in your [child app's entry file](https://github.com/CanopyTax/single-spa/blob/docs-1/docs/configuring-child-applications.md#the-entry-file), do the following:

```js
import Inferno from 'inferno';
import rootComponent from './path-to-root-component.js';
import singleSpaInferno from 'single-spa-inferno';

const infernoLifecycles = singleSpaInferno({
  Inferno,
  createElement,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = [
  infernoLifecycles.bootstrap,
];

export const mount = [
  infernoLifecycles.mount,
];

export const unmount = [
  infernoLifecycles.unmount,
];
```

## Options

All options are passed to single-spa-inferno via the `opts` parameter when calling `singleSpaInferno(opts)`. The following options are available:

- `inferno`: (required) The main Inferno object, which is generally either exposed onto the window or is available via `require('inferno')` or `import Inferno from 'inferno'`.
- `createElement`: (required) The default export from Inferno's `inferno-create-element` package.
- `rootComponent`: (required) The top level Inferno component which will be rendered.
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the Inferno application will be bootstrapped, mounted, and unmounted.