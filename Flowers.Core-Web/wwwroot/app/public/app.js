import blankshield from 'blankshield';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import TotalCounter from './total-counter/index';
import FlowersList from './flowers/list/index';
import FlowerTypesFilter from './flowers/filter/index';
import flowerStore from './products/store';

blankshield(document.querySelectorAll('a[target=_blank]'));

let flowerStoreState = flowerStore.getState();

ReactDOM.render(<TotalCounter totalCount={flowerStoreState.data.totalCount}/>,
	document.getElementById('items-counter'));

let flowerTypesFilter = document.getElementById('flower-types-filter');
flowerTypesFilter && ReactDOM.render(<FlowerTypesFilter />, flowerTypesFilter);

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/flowers" component={FlowersList}>
		</Route>
	</Router>, document.getElementById('product_list_container'));

// ReactDOM.render(<Paging model={flowerStoreState.paging}/>,
// 	document.getElementById('pagination_bottom'));



