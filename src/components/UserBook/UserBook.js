import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';

// import AllUsers from '../AllBooks/AllBooks.js';
// import Reviews from '../Reviews/Reviews.js';
import UserReviews from '../UserReviews/UserReviews.js';


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
		//console.log(this.props)

		

		//this.addData = this.addData.bind(this);
		//this.addOnclick = this.addOnclick.bind(this);
	}
	componentDidMount(){
		//console.log(this.props.match)
		
		let thisContext = this;


		// if(this.props.libStore.books === null){
		// 	this.props.appContext.ServerUploadDatas(BOOKS_API)
		// 	.then((data)=>{	
		// 		thisContext.props.booksLoaded(data)
		// 	})
		// }
	}
	render(){

		let element = '';


		if(this.props.libStore.books){

			element = this.props.libStore.books.find((item)=>{ return item.id === this.id })

			//console.log(element)
		
			return(
				<div className="item-book flex--wh common__itm-style">
					<h3 className="wh--100">{element.title}</h3>
					<div className="item-book__content wh--70">
						{element.textBook}
					</div>
					<div className="item-book__controlls wh--30">
						
						<UserReviews thisId={this.props.match.params}/>
					</div>
					
				</div>
			)
				
		}
		else{
			return(<p>load...</p>)
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
export default withRouter(hocConsummer()(connect(mapState,mapDispatch)(Book)));