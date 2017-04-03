import React from 'react'
import types from '../types'
export default function template() {

	let state = this.state;

	function isChecked(type) {
		return state.types.indexOf(type) !== -1;
	}

	return <ul className="col-lg-12 layered_filter_ul">
		<li key={types.rose.value} className="nomargin hiddable col-lg-12">
			<input type="checkbox" className="checkbox" name="type0" id="type0"
			       checked={isChecked(types.rose.value)}
			       onChange={this.filterOnChanged}
			       value={types.rose.value}/>
			<label htmlFor="type0">
				<strong>
					{types.rose.name}
				</strong>
			</label>
		</li>
		<li key={types.chrysanthemum.value} className="nomargin hiddable col-lg-12">
			<input type="checkbox" className="checkbox" name="type1" id="type1"
			       checked={isChecked(types.chrysanthemum.value)}
			       onChange={this.filterOnChanged}
			       value={types.chrysanthemum.value}/>
			<label htmlFor="type1">
				<strong>
					{types.chrysanthemum.name}
				</strong>
			</label>
		</li>
	</ul>
		;
}

