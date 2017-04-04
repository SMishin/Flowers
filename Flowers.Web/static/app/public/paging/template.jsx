import React from 'react'
import {Link} from 'react-router'

function buildUrl(page) {
	let baseUrl = window.location.pathname;
	baseUrl += window.location.search ? window.location.search + '&' : '?';
	baseUrl += 'page=' + page;
	return baseUrl
}

export default function template() {

	let model = this.state.model,
		liItems = []
		;

	let pageCount = 3,
		from = model.page - 2 <= 0 ? 1 : model.page - 2,
		to = from + pageCount
		;

	if (model.page - 1 > 0) {
		liItems.push(
			<li key={model.page - pageCount - 1}
			    id="pagination_previous_bottom" className="pagination_previous">

				<Link to={buildUrl(model.page - 1)} onClick={() => this.onClick(model.page - 1)}>
					<i className="fa fa-chevron-left"></i>
					<b>Назад</b>
				</Link>

			</li>
		)
	}

	if (to > model.totalCount / model.pageSize) {
		to = model.totalCount / model.pageSize;
		if (model.totalCount % model.pageSize != 0) {
			to++;
		}
	}

	for (let i = from; i <= to; i++) {
		if (i == model.page) {
			liItems.push(
				<li key={i}
				    className="active current">
								<span>
									<span>
										{i}
									</span>
								</span>
				</li>
			);
		}
		else {
			liItems.push(
				<li
					key={i}
				>
					<Link to={buildUrl(i)} onClick={() => this.onClick(i)}>
									<span>
										{i}
									</span>
					</Link>
				</li>
			);
		}
	}


	if (model.page < model.totalCount / model.pageSize) {
		liItems.push(
			<li key={model.page + pageCount + 1}
			    id="pagination_next_bottom" className="pagination_next">
				<Link to={buildUrl(model.page + 1)} onClick={() => this.onClick(model.page + 1)}>
					<b>Вперед</b>
					<i className="fa fa-chevron-right"></i>
				</Link>
			</li>
		)
	}

	return <div className="pagination clearfix">

		<ul className="pagination">
			{liItems}
		</ul>
		<div className="product-count">
			{model.page * model.pageSize - (model.pageSize - model.items.length)} из {model.totalCount}
		</div>
	</div>
}

