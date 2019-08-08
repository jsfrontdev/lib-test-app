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
const REVIEWS_API = '/db/reviews.json';

class AllBook extends Component{


	constructor(props){
		super(props);

		this.count = 0;
		this.state = {

			filterRaiting: [],
			searchRaiting: [],
			searchName: true,
			searchValue: ''
		}

		//this.addData = this.addData.bind(this);
		this.addToUsrList = this.addToUsrList.bind(this);
	}

	componentDidMount(){

		if(this.props.libStore.books === null){
			this.props.appContext.ServerUploadDatas(BOOKS_API)
				.then(function(data){
					console.log(data)
					this.props.booksLoaded(data)
				}.bind(this))
		}

		if(this.props.libStore.reviews === null){
			this.props.appContext.ServerUploadDatas(REVIEWS_API)
				.then((data)=>{
					this.props.reviewsLoaded(data)
					this.setState({
						filterRaiting: this.addRitingStateCount(this.props.libStore.books,data),
						searchRaiting: this.addRitingStateCount(this.props.libStore.books,data)
					})
				})
			
		}
		
		if(this.props.libStore.books !== null && this.props.libStore.reviews !== null){
			this.setState({
				filterRaiting: this.addRitingStateCount(this.props.libStore.books,this.props.libStore.reviews),
				searchRaiting: this.addRitingStateCount(this.props.libStore.books,this.props.libStore.reviews)
			})
	
		}

	}

	addToUsrList(itm){

		console.log(itm)

		itm.state = 'admin';
		this.props.addToUsrList(itm,'admin')

	}

	addRitingStateCount = (books,reviews) => {	

		if(books != undefined && reviews != undefined){
			return books.map((item,i,arr) => {
				let res = 0;
				let count = 0;
				let x = reviews.find((itemRev) => { return item.id === itemRev.id});

				if(x != undefined){
					x.reviews.forEach(function(itm) {

						if(itm.rating != undefined){
							count ++;
							res += itm.rating;
						}
					});
					console.log(res,count)
					item.rating = Math.round(res/count);
				}else{

					item.rating = 0;
				}
				return item;
			})
		}
		else{
			return []
		}

	}

	setSearch = () =>{
		this.setState(({searchName})=>{
			return {
				searchName: !searchName	
			}
		})
	}

	setSearchValue = (e) =>{
		this.setState({
			
			searchValue: e.target.value
			
		})
	}

	searchItm = (e) =>{
		e.preventDefault();

		if(this.state.searchValue.length !== 0){
			let newArr = [...this.state.filterRaiting];
			let str = this.state.searchValue.toLowerCase();
			let find = [];

			if(this.state.searchName === true){
				find =newArr.filter(function(itm){
					return itm.title.toLowerCase().indexOf(str) != -1;
				}.bind(this));
			} else {
				find =	newArr.filter(function(itm){
					return itm.autor.toLowerCase().indexOf(str) != -1;
				}.bind(this));
			}

			console.log(find)

			this.setState((filterRaiting)=>{
				return{
					searchRaiting:find
				}
			})
		}
	}

	filterItm(action){
		console.log(action)

		let newArr = [...this.state.filterRaiting];
		let find = [];

		switch (action){
			// case 'rate':
			// 	find = newArr.filter(function(itm){
			// 		return itm.rating !== 0 
			// 	}.bind(this));
			// 	//console.log(find.sort(compare))
			// 	setState.call(this,find.sort(compare));
			// 	break;

			case 'users':
				find = newArr.filter(function(itm){
					return itm.state !== 'admin';
				}.bind(this));
				setState.call(this,find);
				break;



			case 'free':
				find = newArr.filter(function(itm){
					return itm.state.toLowerCase().indexOf('admin') != -1;
				}.bind(this));
				setState.call(this,find);
				break;

			case 'all':
				find = newArr;
				setState.call(this,find);
				break;

			default:
				break;
		}

		function setState(arr){
			this.setState((filterRaiting)=>{
				return{
					searchRaiting:arr
				}
			})
		}

		// function compare(a, b) {
		//   	let A = a.rating, B = b.rating;

		//   	console.log(a,b)
		// 	if (A > B) return -1;
		// 	if (A < B) return 1;
		// 	return 0;
		// }
	}

	render(){

		let elements = '';

		if(this.state.searchRaiting){

			return(
				<div className="all-books flex--wh">



				<div className="all-books__filtered wh--60">

					{
						this.state.searchRaiting.map((item,key) => {

							let path = `/adminbooks/${item.id}`;
							let getBook = <a onClick={this.addToUsrList.bind(this,item)} className="common__btn-ctrl-small btn--rd">Переместить в библиотеку</a>
							if(this.props.libStore.userRole.admin === false){
								path = `/userbooks/${item.id}`;
								
							}

							if(item.state === 'admin')
								getBook = null;


							return(

								<div key={`book-${key}`}  className="all-books__book-itm common__itm-style">
									<h3 className="common__title-small">Назавание: {item.title}</h3>
									<p>Книга у: {item.state}</p>
									<div className="book-itm-text">Краткое описание: {item.desctiption}</div>
									<Link to={path} className="common__btn-ctrl-small btn--grn">Перейти</Link>
									{getBook}
								</div>

							)
						})
					}
				</div>
				<div className="filter__box common__itm-style wh--35">
					<h3 className="common__title-small">Фильтовать</h3>
					<button onClick={this.filterItm.bind(this,'free')} className="common__btn-ctrl-small btn--grn">Свободные</button>
					<button onClick={this.filterItm.bind(this,'users')} className="common__btn-ctrl-small btn--rd">У читателей</button>
					<button onClick={this.filterItm.bind(this,'all')} className="common__btn-ctrl-small btn--blu">Показать все</button>
					<p>Искать совпадения</p>
					<form onSubmit={this.searchItm}>
						<input onChange={this.setSearchValue} type="text" className="common__input-text"/>
						<a onClick={this.setSearch} className="common__btn-ctrl-small btn--grn">{(this.state.searchName) ? "По названию" : "По автору"}</a>
						<button className="common__btn-ctrl-small btn--blu">Найти</button>
					</form>
				</div>

				</div>
			);
		}
		else{
			return <p className="app--loading">load...</p>
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

//export default Shit3;
export default hocConsummer()(connect(mapState,mapDispatch)(AllBook));