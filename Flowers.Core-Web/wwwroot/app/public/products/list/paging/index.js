import React from 'react'
import template from './template.jsx'
import PageFilter from '../../../../common/filters/page';
import store from '../../filter/store';
import scrollTo from '../../../global/scroll-to';

class Paging extends React.Component {

	constructor(props) {
		super();
		console.log(arguments);
		this.state = {
			model: props.model
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			model: props.model
		});
	}

	onClick(page) {
		store.applyFilter({name: PageFilter._name, value: new PageFilter({page})});

		scrollTo(document.body, 0, 100);

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