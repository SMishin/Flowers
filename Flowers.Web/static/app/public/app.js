import blankshield from 'blankshield';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import TotalCounter from './total-counter/index';
import FlowerList from './flowers/list/index';
import FlowerFilter from './flowers/filter/index';
import flowerStore from './flowers/store';

blankshield(document.querySelectorAll('a[target=_blank]'));

let flowerStoreState = flowerStore.getState();

ReactDOM.render(<TotalCounter totalCount={flowerStoreState.flowers.totalCount}/>,
	document.getElementById('items-counter'));

ReactDOM.render(<FlowerFilter />,
	document.getElementById('flowers-filter'));

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/flowers" component={FlowerList}>
		</Route>
	</Router>, document.getElementById('product_list_container'));

// ReactDOM.render(<Paging model={flowerStoreState.paging}/>,
// 	document.getElementById('pagination_bottom'));




