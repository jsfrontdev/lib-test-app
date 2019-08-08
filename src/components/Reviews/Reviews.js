import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';
import './Reviews.styl';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import AllUsers from '../AllBooks/AllBooks.js';
import FormReview from '../FormReview/FormReview.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

const REVIEWS_API = '/db/reviews.json';




const Review = ({thisItm,thisDel,parentProps}) => {


  // const showForm = (e) => {

  // 	console.log(e.target)

  // }

  const deliteElement = () => {

  	thisDel(thisItm.user,false);
  }


  return (
    <ReactCSSTransitionGroup 
    	transitionName="anim" 
    	transitionAppear={true} 
    	transitionAppearTimeout={200} 
    	transitionEnter={false} 
    	transitionLeave={false}
    	>
    	<div className="review common__itm-field wh--100 flex--wh">
    		<div className="wh--80">
	    		<div className="review__name">
	    			<i className="fa fa-user" aria-hidden="true"></i>
	    			{thisItm.user}
	    		</div>
	    		<div className="review__text">
	    			{thisItm.review}
	    		</div>
	    	</div>
    		<div className="review__ctrls wh--100">
	    		<button className="common__btn-ctrl btn--rd" onClick={deliteElement}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
	    		<FormReview thisItm={thisItm.user} thisFlag={true} onChangeForm={thisDel}/>
    		</div>
    	</div>
    	
    </ReactCSSTransitionGroup>
  );



};



class Reviews extends Component{

	constructor(props){
		super(props);

		this.count = 0;

		this.state = {
			reviews:[]
		}
	}

	componentDidMount(){

		this.id = this.props.thisId;	
		let thisContext = this;

		if(this.props.libStore.reviews === null){

			this.props.appContext.ServerUploadDatas(REVIEWS_API)

				.then((data)=>{

					thisContext.props.reviewsLoaded(data)

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

	deliteRemoveReview = (e,flag,value) =>{

		console.log(e)

		this.setState(({reviews}) => {

	      const index = reviews.findIndex((item) => { return e === item.user });
	      let elm = reviews.find((item) => { return e === item.user });
	      let newArr = [];

	      if(flag === true){
	      	
	      	elm.review = value;
	      	console.log(elm)
	      	newArr = [
		        ...reviews.slice(0,  index),
		        elm,
		        ...reviews.slice(index + 1)
	      	];
	      	
	      }else if(flag === false){
	      	newArr = [
		        ...reviews.slice(0,  index),
		        ...reviews.slice(index + 1)
	      	];
	      }

	      this.props.deliteRemoveReview(elm,e,this.id.id,flag);

	      return {
	        reviews: newArr
	      };

	    });
	}

	render(){

		let element = '';

		if(this.props.libStore.reviews && this.props.libStore.reviews.length > 0){
			return(

					<div>
					{
						this.state.reviews.map((items,key)=>{
							return(

								<Review  key={`review-${key}`} thisDel={this.deliteRemoveReview} thisItm={items}/>
							)
						})
					}

					<button className="common__btn-ctrl-small btn--blu" onClick={this.incCount}>
						Посмотреть отзывы
					</button>
				</div>
				)
		}else{
			return( <p className="app--loading">load...</p>)
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