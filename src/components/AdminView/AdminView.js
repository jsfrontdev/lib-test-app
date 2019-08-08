import React, { Component } from 'react';
//import './../index.styl';
import './AdminView.styl';

import AllUsers from '../AllBooks/AllBooks.js';
import AllBooks from '../AllBooks/AllBooks.js';

import Book from '../Book/Book.js';
import Reviews from '../Reviews/Reviews.js';
import AddNewBook from '../AddNewBook/AddNewBook.js';

import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

//let BOOKS_API = '/db/books.json';


class AdminView extends Component{


	constructor(props){
		super(props);

		this.count = 0;

		//this.addData = this.addData.bind(this);
		//this.addOnclick = this.addOnclick.bind(this);
	}


	// addData(){

	// 	console.log(this.props)

	componentDidMount(){
		
		
		this.props.isUserRole({admin:true, user: false});


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

		

	// 	//thisContext.props.booksLoaded('2')


	// }

	// addOnclick(){
	
	// 	this.props.booksLoadedAdd({index:0})

	// 	//console.log(this.props)

	// }

	render(){


		return(
			<Router>
				<div className="lib-app__admin-content">
					<div className="wh--100">
						<h1 className="common__itm-style">Вы Администратор</h1>
					</div>
					<div className="lib-app__admin-content-left common__itm-style">
						<Link className="common__link" to="/adminusers">Все пользователи</Link>
						<Link className="common__link" to="/adminbooks">Все книги</Link>

					</div>
					<div className="lib-app__admin-content-right">
						<Route
							exact
							path="/adminusers"
						/>
						<Route
							exact
							path="/adminbooks"
							component={AllBooks}
						/>
						<Route
							path="/adminbooks/:id"
							render={({match})=>{
								return <Book thisId={match.params.id}/>
							}}
						/>
					</div>
				</div>
				
			</Router>

		);
	}
}

const mapState = (state) =>{
		//console.log(state)

		return{
			libStore:state
		}
	}

	const mapDispatch = (dispatch) =>{

		return bindActionCreators(actions,dispatch);

		
	}


//export default Shit3;
export default hocConsummer()(connect(mapState,mapDispatch)(AdminView));