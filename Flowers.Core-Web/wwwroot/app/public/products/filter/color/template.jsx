import React from 'react'
import colors from './colors';

function isChecked(source, color) {
	return source.indexOf(color) !== -1;
}

export default function template() {

	let state = this.state,
		items = [];

	for (let itemName in colors) {

		let item = colors[itemName];

		items.push(<li key={item.id} className="nomargin hiddable col-lg-12">
			<input type="button" className={`color-option ${isChecked(state.colors, item.id) ? 'active' : ''}`}
				   style={{'background': item.id}}
				   data-value={item.id}
				   onClick={this.filterOnChanged}/>
		</li>);
	}

	return <ul className="col-lg-12 layered_filter_ul color-group">
		{items}
	</ul>
		;
}

