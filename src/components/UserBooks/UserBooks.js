import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';

// import AllUsers from '../AllBooks/AllBooks.js';
import Book from '../Book/Book.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

const BOOKS_API = '/db/books.json';

class AllBook extends Component{


	constructor(props){
		super(props);

		this.count = 0;

		//this.addData = this.addData.bind(this);
		//this.addOnclick = this.addOnclick.bind(this);
	}

	componentDidMount(){
		console.log(this.props.libStore)
		
		let thisContext = this;

		if(this.props.libStore.books === null){
			this.props.appContext.ServerUploadDatas(BOOKS_API)
			.then((data)=>{	
				thisContext.props.booksLoaded(data)
			})
		}
	}

	addToUsrList = (itm) =>{
		console.log(itm)
		itm.state = 'admin';
		this.props.addToUsrList(itm,'admin')

	}

	render(){

		let elements = '';

		if(this.props.libStore.books){

			return(
				<div className="all-books flex--wh">	
					
					{
						this.props.libStore.books.map((item,key) => {

							if(item.state === this.props.libStore.userRole.user && item.state != 'admin'){

								let path = `/userbooks/${item.id}`;

								return(

									<div key={`book-${key}`}  className="all-books__book-itm common__itm-style wh--45">
										<h3 className="common__title-small">Название: {item.title}</h3>
										<p>Книга у: {item.state}</p>
										<div className="book-itm-text">Краткое описание: {item.desctiption}</div>
										<div className="book-itm-reviews">Рейтинг: {item.rating}</div>
										<Link className="common__link" to={path}>Подробнее</Link>
										<button onClick={this.addToUsrList.bind(this,item)} className="common__btn-ctrl-small btn--grn">Вернуть в библиотеку</button>
									</div>


								)
							}

						})
					}	
					
				</div>
			);
		} 
		else{
			return <p>load...</p>
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


export default hocConsummer()(connect(mapState,mapDispatch)(AllBook));