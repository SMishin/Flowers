import initialState from '../../../initial-state';
let colors = [];

if (initialState.colorsFilterModel !== void 0 && initialState.colorsFilterModel.colors !== void 0) {
	colors = initialState.colorsFilterModel.colors;
}

export default colors;