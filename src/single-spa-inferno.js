const defaultOpts = {
	// required opts
	Inferno: null,
	createElement: null,
	rootComponent: null,
	domElementGetter: null,
}

export default function singleSpaInferno(userOpts) {
	if (typeof userOpts !== 'object') {
		throw new Error(`single-spa-inferno requires a configuration object`);
	}

	const opts = {
		...defaultOpts,
		...userOpts,
	};

	if (!opts.Inferno) {
		throw new Error(`single-spa-inferno must be passed opts.Inferno`);
	}

	if (!opts.createElement) {
		throw new Error(`single-spa-inferno must be passed opts.createElement`);
	}

	if (!opts.rootComponent) {
		throw new Error(`single-spa-inferno must be passed opts.rootComponent`);
	}

	if (!opts.domElementGetter) {
		throw new Error(`single-spa-inferno must be passed opts.domElementGetter function`);
	}

	return {
		bootstrap: bootstrap.bind(null, opts),
		mount: mount.bind(null, opts),
		unmount: unmount.bind(null, opts),
	};
}

function bootstrap(opts) {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

function mount(opts) {
	return new Promise((resolve, reject) => {
		opts.Inferno.render(opts.createElement(opts.rootComponent), getRootDomEl(opts));
		resolve();
	});
}

function unmount(opts) {
	return new Promise((resolve, reject) => {
		opts.Inferno.render(null, getRootDomEl(opts)); // see https://github.com/infernojs/inferno/issues/114
		resolve();
	});
}

function getRootDomEl(opts) {
	const el = opts.domElementGetter();
	if (!el) {
		throw new Error(`single-spa-inferno: domElementGetter function did not return a valid dom element`);
	}

	return el;
}