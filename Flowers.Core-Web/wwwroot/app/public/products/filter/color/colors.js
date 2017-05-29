let colors = [];

if (window.__INITIAL_STATE__.colorsFilterModel !== void 0
	&& window.__INITIAL_STATE__.colorsFilterModel.colors !== void 0) {
	colors = window.__INITIAL_STATE__.colorsFilterModel.colors;
}

export default colors;