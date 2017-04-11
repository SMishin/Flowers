import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Paging from './paging/index';
import TotalCounter from './total-counter/index';
import FlowerList from './flowers/list/index';
import FlowerFilter from './flowers/filter/index';
import flowerStore from './flowers/store';

let flowerStoreState = flowerStore.getState();

ReactDOM.render(<TotalCounter totalCount={flowerStoreState.flowers.totalCount} />,
	document.getElementById('items-counter'));

ReactDOM.render(<FlowerList />,
	document.getElementById('product_list_container'));

ReactDOM.render(<FlowerFilter />,
	document.getElementById('flowers-filter'));


let pagination_bottom_Elem = document.getElementById('pagination_bottom');
if (pagination_bottom_Elem) {
	ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/flowers" component={Paging} model={flowerStoreState.flowers}>
			</Route>
		</Router>, pagination_bottom_Elem);
}

// ReactDOM.render(<Paging model={flowerStoreState.paging}/>,
// 	document.getElementById('pagination_bottom'));




