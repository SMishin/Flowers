import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import Paging from './paging/index'
import FlowerList from './flowers/list/index'
import flowerStore from './flowers/store';

let flowerStoreState = flowerStore.getState();

ReactDOM.render(<FlowerList />,
	document.getElementById('product_list_container'));

let elem= document.getElementById('pagination_bottom');

if(elem) {
	ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/flowers" component={Paging} model={flowerStoreState}>
			</Route>
		</Router>, elem);
}

// ReactDOM.render(<Paging model={flowerStoreState.paging}/>,
// 	document.getElementById('pagination_bottom'));




