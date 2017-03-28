import React from 'react'
export default function template() {

	let liItems = [];

	let l = this.state.items.length;

	for (let i = 0; i < l; i++) {
		let item = this.state.items[i];
		liItems.push(
			<li key={item.id} className="ajax_block_product col-xs-12 col-sm-6 col-md-4">
				<div className="product-container">
					<div className="left-block">
						<div className="product-image-container">
							<a className="product_img_link"
							   href="/@item.Type.ToString().ToLower()/@item.Id"
							   title="@item.Name">
								<img className="replace-2x img-responsive"
								     src={item.imageUrl ? item.imageUrl : "/static/app/img/no_photo.jpg"}
								     alt={item.name}
								     title={item.name}/>
							</a>
						</div>
					</div>
					<div className="right-block">
						<h5 itemProp="name">
							<a className="product-name"
							   href={item.type.toString().toLowerCase() + '/' + item.Id}
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

	return <div id="product_list_items_container">
		{this.state.loading && <div className="loader"></div>}
		<ul className="product_list grid row c-count-3">
			{liItems}
		</ul>
	</div>
	;
}

