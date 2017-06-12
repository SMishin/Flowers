import React from 'react'
import Paging from './paging/index';

export default function template() {

	let liItems = [];

	if (this.state.items) {
		let l = this.state.items.length;

		for (let i = 0; i < l; i++) {
			let item = this.state.items[i];
			liItems.push(
				<li key={item.id} className="ajax_block_product col-xs-12 col-sm-6 col-md-4">
					<div className="product-container">
						<div className="left-block">
							<div className="product-image-container">
								<a className="product_img_link"
								   href={item.typeString + '/' + item.id}
								   title={item.name}>
									<img className="replace-2x img-responsive"
									     src={item.imageUrl ? item.imageUrl : "/app/img/no_photo.jpg"}
									     alt={item.name}
									     title={item.name}/>
								</a>
							</div>
						</div>
						<div className="right-block">
							<h5 itemProp="name">
								<a className="product-name"
								   href={item.typeString + '/' + item.id}
								   title={item.name}
								   itemProp="url">
								<span className="grid-name">
									{item.name}
								</span>
								</a>
							</h5>
							<div className="content_price">
							<span className="price product-price product-price-new">

								{item.formatedPrice}

							</span>

							</div>
						</div>
					</div>
				</li>
			);
		}
	}

	return <div id="product_list_items_container">
		{this.state.loading && <div className="loader"></div>}
		<ul className="product_list grid row c-count-3">
			{liItems}
		</ul>

		{
			this.state.data.totalCount > this.state.data.items.length && <div className="content_sortPagiBar">
				<div id="pagination_bottom" className="bottom-pagination-content clearfix">
					<Paging model={this.state.data}/>
				</div>
			</div>
		}
		{
			this.state.data.items.length === 0 && <div className="empty-results">
				<h3>
					Нет подходящих товаров
				</h3>
				<p>
					попробуйте смягчить условия поиска
				</p>
			</div>
		}
	</div>
		;
}

