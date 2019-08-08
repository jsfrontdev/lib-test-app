import React, { Component } from 'react';
//import './../index.styl';
//import './AdminView.styl';

// import AllUsers from '../AllBooks/AllBooks.js';
// import AllBooks from '../AllBooks/AllBooks.js';


import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';


import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js';

const USERS_API = 'db/users.json';

class AllBook extends Component{


	constructor(props){
		super(props);

		this.count = 0;

	}

	componentDidMount(){


	}



	render(){

		return(
			<div classnName="all-books">
				books
			</div>
		);
	}
}

const mapState = (state) =>{
		console.log(state)

		return{
			libStore:state
		}
	}

const mapDispatch = (dispatch) =>{

	return bindActionCreators(actions,dispatch);

	
}


//export default Shit3;
export default hocConsummer()(connect(mapState,mapDispatch)(AllBook));