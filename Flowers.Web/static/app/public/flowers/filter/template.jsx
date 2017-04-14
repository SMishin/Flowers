import React from 'react'
import types from '../types'
export default function template() {

	let state = this.state;

	function isChecked(type) {
		return state.types.indexOf(type) !== -1;
	}

	let items = [];

	for (let itemName in types) {

		let item = types[itemName];

		items.push(<li key={item.value} className="nomargin hiddable col-lg-12">
			<input type="checkbox" className="checkbox"
			       name={'type' + item.value}
			       id={'type' + item.value}
			       checked={isChecked(item.value)}
			       onChange={this.filterOnChanged}
			       value={item.value}/>
			<label htmlFor={'type' + item.value}>
				<strong>
					{item.name}
				</strong>
			</label>
		</li>);
	}

	return <ul className="col-lg-12 layered_filter_ul">
		{items}
	</ul>
		;
}

