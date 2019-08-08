import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import ModelApp from './ModelApp.js';
import ErrorBond from './components/ErrorBond/ErrorBond.js';
//import './static/stylus/index.styl';
//import './common/common/index.css';
import Reducer from './reducers/index.js';
import { AppProvider } from './components/Context/index.js';

import store from './redux-store.js'
import apiDbClass from './services/apiDbClass.js'

const apiClassService = new apiDbClass();

ReactDOM.render(
	<AppProvider value={apiClassService}>
		<ErrorBond>
			<Provider store={store}>
				<ModelApp />
			</Provider>
		</ErrorBond>
	</AppProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
