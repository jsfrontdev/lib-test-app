import React, { Component } from 'react';
//import './../index.styl';
import './Book.styl';

// import AllUsers from '../AllBooks/AllBooks.js';
import Reviews from '../Reviews/Reviews.js';
import UserReviews from '../UserReviews/UserReviews.js';
//import Raiting from '../Raiting/Raiting.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

//let BOOKS_API = 'db/books.json';


class Book extends Component{

	constructor(props){
		super(props);

		this.count = 0;
		this.id = props.thisId;

	}
	componentDidMount(){
		
		let thisContext = this;

	}
	render(){

		let element = '';

		let reviews = <Reviews thisId={this.props.match.params}/>
		

		if(this.props.libStore.userRole.admin === false && this.props.libStore.userRole.user !== false)
			reviews = <UserReviews thisId={this.props.match.params}/>




		if(this.props.libStore.books){

			element = this.props.libStore.books.find((item)=>{ return item.id === this.id })

			console.log(element.state)

			
		
			return(
				<div className="item-book flex--wh common__itm-style">
					<h3 className="wh--100 common__title-small">Название: {element.title}</h3>
					<p className="item-book__date">Автор: {element.autor}</p>
					<div className="item-book__content wh--70">
						{element.textBook}
					</div>
					
					<div className="item-book__reviews wh--100">
						{reviews}
					</div>
				</div>
			)
		}
		else{
			return(<p className="app--loading">load...</p>)
		}
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


export default withRouter(hocConsummer()(connect(mapState,mapDispatch)(Book)));