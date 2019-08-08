import React, { Component } from 'react';
//import './../index.styl';
import './UserReviews.styl';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import AllUsers from '../AllBooks/AllBooks.js';
//import FormReview from '../FormReview/FormReview.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

const REVIEWS_API = '/db/reviews.json';




const Review = ({thisItm,thisDel,parentProps}) => {


  const showForm = (e) => {
  	e.target.nextElementSibling.classList.toggle('reviews-form-show')
  }

  const deliteElement = () => {
  	//thisDel.bind(this,thisItm.user,false)

  	thisDel(thisItm.user,false);
  }





  return (
    <ReactCSSTransitionGroup 
    	transitionName="anim" 
    	transitionAppear={true} 
    	transitionAppearTimeout={200} 
    	transitionEnter={false} 
    	transitionLeave={false}
    	className="common__itm-field wh--100">

    	<div className="review__name">
    		{thisItm.user}
    	</div>
    	<div className="review__text">
    		{thisItm.review}
    	</div>
    	<div className="review__rating">
    		<span className="review__rating-title">Рейтинг книги у пользователя:</span> 
			{ new Array(thisItm.rating).fill(null).map((items,i)=>{
				return(
						<i key={i} className="fa fa-star" aria-hidden="true"></i>
					)
				})	
			}
    	</div>
    	
    </ReactCSSTransitionGroup>
  );


  //return null
};

const AddRaiting = ({addRate}) => {


	const onRateAdd = (i,e) =>{
		console.log(e.target);
		
		let elm = document.querySelectorAll('.star-rate');
		for(let i = 0; i<elm.length;i++){
			elm[i].setAttribute('style','color:#676464;')
		}
		e.target.setAttribute('style','color:#91c18a;')

		addRate(i+1);

	}

	return (

			<div className="review__form-raiting">

				{ new Array(5).fill(null).map((items,i)=>{
					return(
							<i key={i} onClick={onRateAdd.bind(this,i)} className="fa fa-star-o star-rate" aria-hidden="true"></i>
						)
					})	
				}

			</div>
		)


}



class Reviews extends Component{

	constructor(props){
		super(props);

		this.count = 0;

		this.state = {
			reviews:[],
			newReview:null,
			newRate:null,
			isShowForm: false
		}
	}

	componentDidMount(){

		this.id = this.props.thisId;	
		let thisContext = this;

		if(this.props.libStore.reviews === null){

			this.props.appContext.ServerUploadDatas(REVIEWS_API)

				.then((data)=>{

					thisContext.props.reviewsLoaded(data)

					//console.log(thisContext.trimReviews(this.count,data));
					thisContext.setState(({reviews})=>{

						return {
							reviews: thisContext.trimReviews(this.count,data)
						}
					})

				}).catch((error)=>{
					alert(error)
				})

		
		}else if(this.props.libStore.reviews){

			thisContext.setState(({reviews})=>{
				return {
					reviews: thisContext.trimReviews(this.count,this.props.libStore.reviews)
				}
			})

		}
	}

	incCount = (e) =>{

		let items = [];

		e.target.innerHTML = 'Еще';


		if(this.count > this.state.reviews.length)
			e.target.innerHTML = 'Это все отзывы';

		if(this.props.libStore.reviews){
			this.count = this.count + 5
			if(this.count > 20)
				this.count = 20;
			items = this.trimReviews(this.count,this.props.libStore.reviews);
			this.setState(({reviews})=>{
				const newArr = [...items]
				return {
					reviews: newArr
				}
			})
		}
	}

	showForm = (e) =>{

		this.setState(({isShowForm})=>{

			return {
				isShowForm: !isShowForm
			}
		})
	}


	trimReviews = (...args) =>{

		if(args && args.length > 0)
			this.count = args[0]

		let id = this.props.thisId
		let elements = args[1].find((item)=>{return id.id === item.id})

		if(elements == undefined || elements == null)
			return []
		else
			return elements.reviews.slice(0,this.count);

	}

	addRate = (e) =>{
		console.log(e)

		this.setState({
			newRate:e
		});
	}

	submitReview = (e) =>{

	

		e.preventDefault();

		console.log(this.props.libStore.reviews)
	

		let newReview = {};
		let index;
		const elm = this.props.libStore.reviews.find((item) => { 
			
			console.log(item.id, this.id.id , this.props.libStore.userRole.user)

			return this.id.id === item.id

		});

		console.log(elm)

		if(elm)
			index = elm.reviews.findIndex((item) => { return this.props.libStore.userRole.user === item.user });
		else
			index = -1;

		if(index == -1 && this.state.newReview !== null && this.state.newRate !== null){

			newReview = {user:this.props.libStore.userRole.user, review:this.state.newReview,rating:this.state.newRate}

			this.setState(({reviews}) => {

				const newArr = [
					...reviews,
					newReview
				]

				return {
					reviews:newArr
				}
			});

			this.props.addReview(this.id.id, newReview);


		}else if(this.state.newReview === null && this.state.newRate === null){
			console.log('words!')
		}

		console.log(index);


	}

	onReviewState = (e) =>{

		console.log(e.target.value)
		this.setState({
				newReview:e.target.value
			
		})
	}

	render(){

		let element = '';

		if(this.props.libStore.reviews && this.props.libStore.reviews.length > 0){
			return(

					<div className="user-review">
					{
						this.state.reviews.map((items,key)=>{
							return(
									
									<Review  key={`review-${key}`} thisItm={items}/>
								)
						})
					}

					<div className="review__ctrls">
						<button onClick={this.incCount} className="common__btn-ctrl btn--grn">
						 Посмотреть отзывы
						</button>
						<button onClick={this.showForm} className="common__btn-ctrl btn--blu">
							Написать отзыв
						</button>
					</div>

					<div className={`common__itm-field review__form show-${this.state.isShowForm}`}>
						<p>Напишите свой отзыв о книге</p>
						<AddRaiting addRate={this.addRate}/>
						<form className="wh--100" onSubmit={this.submitReview}>
					 		<input className="wh--60 common__input-text" onChange={this.onReviewState} type="text"/>
					 		<button className="common__form-send">Добавить отзыв</button>
					 	</form>
					</div>	
				</div>	
			)

		}else{
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

export default hocConsummer()(connect(mapState,mapDispatch)(Reviews));