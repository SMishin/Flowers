import React from 'react'
import template from './template.jsx'
import store from '../flowers/store';

class Paging extends React.Component {

	constructor(props) {
		super();
		console.log(arguments);
		this.state = {
			model: props.route.model
		}
	}

	onClick(page) {

		store.changePage(page);

		this.setState((prevState, props) => {
			let model = prevState.model;
			model.page = page;
			return model;
		});
	}

	componentDidMount() {
		console.log(this);
	}

	componentWillUnmount() {
	}

	render() {
		return template.apply(this, []);
	}
}

export default Paging;