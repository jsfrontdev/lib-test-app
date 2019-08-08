import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';

// import AllUsers from '../AllBooks/AllBooks.js';
//import Book from '../Book/Book.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

const BOOKS_API = '/db/books.json';
const REVIEWS_API = '/db/reviews.json';

class Filter extends Component{


	constructor(props){
		super(props);

		this.count = 0;

		this.state = {

			filterRaiting: null
		}

		//this.stateMount = this.stateMount.bind(this);
		//this.addOnclick = this.addOnclick.bind(this);
	}

	componentDidMount(){

		// if(this.props.libStore.books === null){
		// 	this.props.appContext.ServerUploadDatas(BOOKS_API)
		// 		.then((data)=>{
		// 			this.props.booksLoaded(data)
		// 		})
		// }

		if(this.props.libStore.reviews === null){
			this.props.appContext.ServerUploadDatas(REVIEWS_API)
			.then((data)=>{	
				this.props.reviewsLoaded(data)
				this.setState({
					filterRaiting: this.addRitingStateCount(this.props.libStore.books,data)
				})			
			})
		}else{	
			this.setState({
				filterRaiting: this.addRitingStateCount(this.props.libStore.books,this.props.libStore.reviews)
			})
		}

	}

	addToUsrList = (itm) =>{

		itm.state = this.props.libStore.userRole.user;
		this.props.addToUsrList(itm,itm.id);

	}

	addRitingStateCount = (books,reviews) => {

		let res = 0;
		let count = 0;

		return books.map((item,i,arr) => {
	 		let x = reviews.find((itemRev) => { return item.id === itemRev.id});

			if(x != undefined){
				x.reviews.forEach(function(itm) {
			  
					  if(itm.rating != undefined){
					  	count ++;
					  	res += itm.rating;
					  }
				});
				item.rating = Math.round(res/count);
			}else{

				item.rating = 0;
			}
			return item;
	 	})		
	}

	setFilter = () =>{

	}

	render(){

		let elements = '';

		console.log(this.state)

	

		if(this.state.filterRaiting){


			return(
				<div className="all-books flex--wh filter">
					<div className="filter__box common__itm-style">
						<button className="common__btn-ctrl-small btn--rd">По рейингу</button>
						<button className="common__btn-ctrl-small btn--grn">Свободные</button>
						

					</div>
			
					{
						this.state.filterRaiting.map((item,key) => {

							let holderTitle = 'Библиотеки';

							let action = <button onClick={this.addToUsrList.bind(this,item)} className="common__btn-ctrl-small btn--grn">Можно взять почитать</button>

							console.log(item.state, this.props.libStore.userRole.user)
							if(item.state === this.props.libStore.userRole.user){
								action = <p className="color--rd">Эта книга сейчас у вас</p>
								holderTitle = item.state;
							}
							else if(item.state !== this.props.libStore.userRole.user && item.state !== 'admin'){
								action = <p className="color--blu">Эта книга у другого читателя</p>
								holderTitle = item.state;
							}

							return(

								<div key={`book-${key}`}  className="all-books__book-itm common__itm-style wh--100">
									<h3>{item.title}</h3>
									<p>Книга у: {holderTitle}</p>
									<div className="book-itm-text">Краткое описание: {item.desctiption}</div>
									<div className="book-itm-reviews">Рейтинг: {item.rating}</div>
									{action}
								</div>		
							)
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

//export default Shit3;
export default hocConsummer()(connect(mapState,mapDispatch)(Filter));