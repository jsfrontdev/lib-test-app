import React, { Component } from 'react';
//import './../index.styl';
//import './LibsRoles.styl';

import AdminViewBookRev from '../AdminViewBookRev/AdminViewBookRev.js';
import AdminViewBookText from '../AdminViewBookText/AdminViewBookText.js';


class AdminViewBook extends Component{

	constructor(props){
		super(props);

		let{id, title, desctiption, textBook, rating} = props.itmProp;


		this.id = id;
	

		this.title = title;
		this.desctiption = desctiption;
		this.textBook = textBook;
		this.rating = rating;
		//this.reviews = reviews;
		//this.Click = this.Click.bind(this);
		this.state = {
			bookContent:false
		}
		this.changeView = this.changeView .bind(this);

		//console.log(props.onGetReviews)

	}

	changeView(e){


		if(this.state.bookContent){
			e.target.innerHTML = 'Посмотреть отзывы'

		}
		else{
			e.target.innerHTML = 'Почитать книгу'
			// let x = this.props.onGetReviews();

			// console.log(x);
		}

		this.setState(({bookContent}) => {
			return{
				bookContent:!bookContent
			}
		});



	}

	render(){

		let returnView;
		let thisContext = this;

		if(this.state.bookContent)
			returnView = () => {return <AdminViewBookRev onDelitReview={this.props.onDelitReview} onGetReviews={this.props.onGetReviews} thisBookId={this.id}/>}		
		else
			returnView = () => {return <AdminViewBookText textProp={this.textBook}/>}

		return(
			
			<div className="admin-view__book-item" >
				<h1>Название книги {this.title}</h1>
				{returnView()}
				<div className="admin-view__book-item-controls">
					<button  onClick={thisContext.changeView} className="component__btn admin-vew-btn btn-reviews">Посмотреть отзывы</button>
				</div>
				
			</div>
			
		);
	}
}

export default AdminViewBook;