import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';
//import './Reviews.styl';

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



//const Form = ({onChangeForm,thisItm,thisFlag}) => {

class FormReview extends Component{


	constructor({onChangeForm,thisItm,thisFlag}){

		super({onChangeForm,thisItm,thisFlag})
		this.onChangeForm = onChangeForm;
		this.thisItm = thisItm;
		this.thisFlag = thisFlag;

		this.state = {
			isShowForm: false
		}

	}

	removeElement = (e) =>{

		//if(!e.target.value) 
		e.preventDefault();

		if(e.target.firstChild.value != ''){

			this.onChangeForm(this.thisItm,this.thisFlag,e.target.firstChild.value);
		}	
	}

	showForm = (e) =>{

		this.setState(({isShowForm})=>{

			return {
				isShowForm: !isShowForm
			}
		})
	}

	render(){

		console.log(this.state.isShowForm)

	 return (
		<div className="wh--100">
		 	<form onSubmit={this.removeElement} className={`review__form show-${this.state.isShowForm}`}>
		 		<input className="common__input-text" type="text" />
		 		<button className="common__form-send">
		 			Редактировать
		 		</button>
		 	</form>
		 	<button className={`common__btn-ctrl btn--grn `} onClick={this.showForm}><i className="fa fa-pencil-square" aria-hidden="true"></i></button>
		</div>
	 )
	}

}

export default FormReview;