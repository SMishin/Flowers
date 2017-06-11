import React from 'react'

export default function template() {

	let state = this.state;

	return <div className="n-filter-block__range">

            <span className="input" data-sign-title="от">
                    <span className="input__box">
                        <input type="text" name="from" className="input__control" value={state.from}
							   onChange={this.filterOnChanged}/>
                        <span
							className={`input__clear ${state.from !== null && state.from !== '' ? 'input__clear_visibility_visible' : ''}`}
							unselectable="on" onClick={() => this.clearField('from')}/>
                    </span>
                </span>

		<span className="input" data-sign-title="до">
                <span className="input__box">
                    <input type="text" name="to" className="input__control" value={state.to}
						   onChange={this.filterOnChanged}/>
                    <span
						className={`input__clear ${state.to !== null && state.to !== '' ? 'input__clear_visibility_visible' : ''}`}
						unselectable="on" onClick={() => this.clearField('to')}/>
                </span>
            </span>

	</div>
		;
}

