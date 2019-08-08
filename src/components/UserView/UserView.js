import React, { Component } from 'react';
//import './../index.styl';
//import './LibsRoles.styl';

import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
//import AllUsers from '../AllBooks/AllBooks.js';
import AllBooks from '../AllBooks/AllBooks.js';

import UserBooks from '../UserBooks/UserBooks.js';
import Filter from '../Filter/Filter.js';
import AllUsersBooks from '../AllUsersBooks/AllUsersBooks.js';

import Book from '../Book/Book.js';

import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js'

class UserView extends Component{

	constructor(props){
		super(props);
		//this.Click = this.Click.bind(this);
		console.log(props)
		this.name = props.name;



	
	}


	render(){


		return(
			<Router>
				
					<div className="wh--100"><h1 className="common__itm-style">Добро пожаловать {this.name}</h1></div>
					<div className="lib-app__admin-content-left common__itm-style wh--25">
						<Link className="common__link" to="/allbooks">Все книги</Link>
						<Link className="common__link" to="/userbooks">Ваши книги</Link>	
					</div>
					<div className="lib-app__admin-content-right wh--70">
						<Route
							exact
							path="/"
						/>
						<Route
							exact
							path="/allbooks"
							component={AllUsersBooks}
						/>
						<Route
							exact
							path="/userbooks"
							component={UserBooks}
						/>
						<Route
							exact
							path="/filter"
							component={Filter}
						/>
						
						<Route
							path="/userbooks/:id"
							render={({match})=>{
								return <Book thisId={match.params.id}/>
							}}
						/>
					</div>
				
				
			</Router>

		);
	}
}


export default UserView;