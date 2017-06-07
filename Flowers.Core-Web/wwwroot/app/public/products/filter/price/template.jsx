import React from 'react'

export default function template() {

    let state = this.state;

    return <div className="n-filter-block__range">

            <span className="input input_size_s input_type_range input_price_from" data-sign-title="от">
                    <span className="input__box">
                        <input type="number" name="from" className="input__control" value={state.from} onChange={this.filterOnChanged}/>
                        <span className="input__clear" unselectable="on"/>
                    </span>
                </span>

            <span className="input input_size_s input_type_range input_price_to" data-sign-title="до">
                <span className="input__box">
                    <input type="number" name="to" className="input__control" value={state.to} onChange={this.filterOnChanged}/>
                        <span className="input__clear input__clear_visibility_visible" unselectable="on"/>
                </span>
            </span>

        </div>
        ;
}

