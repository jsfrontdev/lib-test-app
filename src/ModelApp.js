//import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';

import './index.styl';

//import Shit3 from './components/Shit3/Shit3.js';
//import Shit4 from './components/Shit4/Shit4.js';
//import Shit5 from './components/Shit5/Shit5.js';

//import apiDbClass from './apiDbClass/apiDbClass.js';

import IndexView from './components/IndexView/IndexView.js';
import { AppProvider } from './components/Context/index.js';
//import LibsRoles from './components/LibsRoles/LibsRoles.js';

//import {inc,rnd} from './actions.js'
import * as actions from './actions/index.js';

import UserLog from './components/UserLog/UserLog.js';
import AdminView from './components/AdminView/AdminView.js';
import {connect} from 'react-redux';



import{BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import {Link} from 'react-router-dom';



import hocConsummer from './hoc/hoc-context.js';




//import Reducer from './reducer.js';


//let store = createStore(Reducer);
// let inc = () => { return {type:'inc'}}
// let rnd = (payload) => { return {type:'rnd',payload}}

// const { dispatch } = store;

// let dispathers = bindActionCreators({
// 	incDispath: inc,
// 	rndDispath: rnd
// }, dispatch)



class ModelApp extends Component{

	Click = () =>{
		
		console.log(this.props)
		
		//this.mapDispatch()
	}

	// constructor(props){
	// 	super(props)
	// 	console.log(props)

	// //	console.log(dispatchers)
	// 	this.shit = 'shit!'
		

	
	// }

	isUserRole = () =>{
		

		this.props.isUserRole({
			admin:true,
			user:false
		});

		// console.log(this.props)
		// let thisContext = this;
		// this.props.appContext.ServerUploadDatas()
		// 	.then((data)=>{
		// 		console.log(data)
		// 		thisContext.props.booksLoaded(data)
		// 	})
		// console.log(this.props)
		//this.props.booksLoaded(this.props.appContext())

	}


	
	render(){

		
			
		return(

			<Router>

		
			    <div className="lib-app">

			    	<div className="wrapper">

			    		<div className="container">


					    	<div className="lib-app__header ">
					    		<h1 className="common__h1 common__itm-style">Это библиотека
					    		</h1>
					    		<ul className="lib-app__header-list">
						  			<li>
						  				<Link className="header-list__link" to="/user">Можно быть Читателем</Link>
						  			</li>
						  			<li>
						  				<Link className="header-list__link" to="/admin">Или Администраторм</Link>
						  			</li>
					  			</ul>
					    	</div> 

					    	<Switch>
						  		
						  		<Route path="/admin" component={AdminView}/>
						  		<Route path="/user" component={UserLog}/>
						  		<Route exact path="/" />

					  		</Switch>
					  	</div>
				  	</div>
			  		
			    </div>
			</Router>
		
	    )
				
			
			
		
	}

	
}

const mapState = (state) =>{
		console.log(state)

		return{
			libStore:state
		}
	}

	const mapDispatch = (dispatch) =>{

		return bindActionCreators(actions,dispatch);

		
	}




export default hocConsummer()(connect(mapState,mapDispatch)(ModelApp));

