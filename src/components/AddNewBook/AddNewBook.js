import React, { Component } from 'react';
import './AddNewBook.styl';

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

const BOOKS_API = '/db/books.json';

class NewBookAdd extends Component{

	constructor(props){

		super(props);
		this.state = {

			errorMsg:''
		}
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

	addNewBook = (e) =>{

		e.preventDefault();

		let form =  e.target.elements;

		if(form.name.value == '' || form.desc.value == '' || form.autor.value == '' || form.text.value == ''){

			this.setState({
				errorMsg: true
			})

		} else {

			const newItm = {

			}

			this.props.newBookAdd(newItm);
		}
	}

	addState = (e) =>{

		this.setState({
			errorMsg:false
		})



		//console.log(inputValue[key])
		//console.log(this.state,key);
	}

	render(){
		let view = <p className="new-book-add__error">Все поля должны быть заполнены</p>
		if(!this.state.errorMsg)
			view = null

		return(
			<div className="common__itm-style new-book-add wh--100">
				<form onSubmit={this.addNewBook} className="wh--70">
					<h1 className="common__h1">Добавить книгу</h1>
					<p>Название</p>
					<input onChange={this.addState} className="common__input-text" name="name" type="text"/>
					<p>Автор</p>
					<input onChange={this.addState} className="common__input-text" name="autor" type="text"/>
					<p>Краткое описание</p>
					<input onChange={this.addState} className="common__input-text wh--100" name="desc" type="text"/>
					<p>Содержание</p>
					<textarea onChange={this.addState} className="common__input-text wh--100" name="text"  ></textarea>
					{view}
					<button className="common__btn-ctrl btn--blu">Добавить книгу</button>
				</form>
			</div>
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
export default hocConsummer()(connect(mapState,mapDispatch)(NewBookAdd));