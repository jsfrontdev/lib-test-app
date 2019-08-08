import React, { Component } from 'react';
//import './../index.styl';
import './UserLog.styl';

import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import AllUsers from '../AllBooks/AllBooks.js';
import AllBooks from '../AllBooks/AllBooks.js';
import UserView from '../UserView/UserView.js';

import Book from '../Book/Book.js';

import { createStore, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import hocConsummer from '../../hoc/hoc-context.js'

const USERS_API = '/db/users.json';

class UserLog extends Component{

	constructor(props){
		super(props);
		//this.Click = this.Click.bind(this);
		this.state = {
			inputValue:'',
			inputAddUser:'',
			isLogged:false,
			isUserAdd:false,
			errorMesage:''
		}

	}

	componentDidMount(){

		let thisContext = this;

		if(this.props.libStore.users === null){

			this.props.appContext.ServerUploadDatas(USERS_API)
				.then((data)=>{
				
					thisContext.props.usersLoaded(data)
					console.log(this.props)
				})
		} 

	}

	userLogin = (e) => {

		e.preventDefault();
		let users = this.props.libStore.users;

		if(this.state.inputValue != ''){

			let usr = this.state.inputValue;

			const index = users.findIndex((item) => { return usr === item.name });

			if(index != -1){
				this.setState({
					isLogged: true
				})

				this.props.isUserRole({admin:false, user: usr});

			}else if(index === -1){
				this.setState({
					errorMesage: 'Пользователь с таким именем не зарегистрирован!'
				})
			}
			console.log(index)

		} else if(this.state.inputValue === ''){

			this.setState({
				errorMesage: 'Введите какие нибудь буквы!)'
			})
		}

	}

	userAddView = () =>{
		this.setState({

				isUserAdd: true


		});
	}

	inputChange = (e) =>{

		if(e.target.name === 'log'){
			this.setState({
				inputValue: e.target.value
			})
		}else{
			this.setState({
				inputAddUser: e.target.value
			})
		}
	}

	userAdd = (e) => {

		e.preventDefault();
		let users = this.props.libStore.users;

		if(this.state.inputAddUser != ''){
			let usr = this.state.inputAddUser;

			const index = users.findIndex((item) => { return usr === item.name });

			if(index != -1){

				this.setState({
					errorMesage: 'Пользователь с таким именем уже зарегистрирован!'
				})

			}else if(index === -1){

				this.setState({
					isLogged: true
				})

				this.props.userAdd({
					name:usr,
					books: []
				});

				this.props.isUserRole({admin:false, user: usr});
			}
		}

	}

	render(){

		//console.log(this.props.libStore.userRole.user);

		if(this.state.isLogged == false){
			if(this.props.libStore.users != null){
				return(
					<div className="lib-app__user-content flex--wh common__itm-style wh--40">
						<div className="wh--100">
							<form onSubmit={this.userLogin}>
								<h1 >Введите свое имя пользователя</h1>
								<input placeholder="user-1 или user-2" className="common__input-text" onChange={this.inputChange} name="log" type="text" />
								<button className="common__btn-ctrl-small btn--rd">Войти</button>
								{this.state.errorMesage}
							</form>
							<a onClick={this.userAddView}>Или зарегистрируйтесь</a>
							<form className={`add-user-form hidden-${this.state.isUserAdd}`} onSubmit={this.userAdd}>
								<input className="common__input-text" onChange={this.inputChange} name="add" type="text" />
								<button className="common__btn-ctrl-small btn--rd">Зарегистрироваться</button>
							</form>
						</div>
					</div>
				);
			} else {
				return <p className="app--loading">Load...</p>
			}
		}
		else{
			return(
				<div className="lib-app__user-content flex--wh">
					<UserView name={this.props.libStore.userRole.user}/>
				</div>
			)
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

export default hocConsummer()(connect(mapState,mapDispatch)(UserLog));