import React from 'react'

export default function template() {
	return <div>
		<div className="box">
			<h1 className="page-subheading">
				Информация о получателе и адресе доставки
			</h1>
			<p className="info-title">
				To add a new address, please fill out the form below.
			</p>
			<p className="required">
				<sup>*</sup>
				Обязаьельные поля
			</p>
			<form className="std">
				<div className="required form-group">
					<label htmlFor="firstName">
						Имя
						<sup>*</sup>
					</label>
					<input className="is_required validate form-control"
					       type="text"
					       name="firstName"
					       id="firstName"
					       value={this.state.model.firstName}
					       onChange={this.handleInputChange}/>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">
						Фамилия
					</label>
					<input className="validate form-control"
					       type="text" id="lastName"
					       name="lastName"
					       value={this.state.model.lastName}
					       onChange={this.handleInputChange}/>
				</div>
				<div className="form-group">
					<label htmlFor="company">
						Отчество
					</label>
					<input className="form-control validate"
					       type="text"
					       id="middleName"
					       name="middleName"
					       value={this.state.model.middleName}
					       onChange={this.handleInputChange}/>
				</div>

				<div className="required form-group">
					<label htmlFor="address">
						Адресс доставки
						<sup>*</sup>
					</label>
					<input className="is_required validate form-control"
					       type="text" id="address" name="address"
					       value={this.state.model.address}
					       onChange={this.handleInputChange}/>
				</div>

				<div className="clearfix"></div>
				<div className="required form-group">
					<label htmlFor="phone_mobile">
						Телефон для связи
						<sup>*</sup>
					</label>
					<input className="validate form-control"
					       type="tel" id="mobilePhone" name="mobilePhone"
					       value={this.state.model.mobilePhone}
					       onChange={this.handleInputChange}/>
				</div>

				<div className="required form-group">
					<label htmlFor="email">
						Email
						<sup>*</sup>
					</label>
					<input className="is_required validate form-control"
					       type="text" id="email" name="email"
					       value={this.state.model.email}
					       onChange={this.handleInputChange}/>
				</div>

				<p className="submit2">
					<button type="submit" name="submitAddress"
					        className="btn btn-default btn-md icon-right">
								<span>
								Оформить
								</span>
					</button>
				</p>
			</form>
		</div>
		<ul className="footer_links clearfix">
			<li>
				<a className="btn btn-default btn-sm icon-left"
				   href="https://ld-prestashop.template-help.com/prestashop_58383/index.php?controller=addresses"
				   title="Back to your addresses">
<span>
Back to your addresses
</span>
				</a>
			</li>
		</ul>
	</div>

}

