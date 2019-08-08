import React, { Component } from 'react';
//import './../index.styl';
import './IndexView.styl';


class IndexView extends Component{

	constructor(props){
		super(props);
		//this.Click = this.Click.bind(this);
	}

	Click(e){
		//console.log(e)
		this.props.onChooseRole(e);
	}

	render(){
		return(
			<div className="wrapper">
				<h1>Добро пожаловать в библиотеку</h1>
				<a onClick={this.Click.bind(this,'user')} className="main-page__btn component__btn">Я читатель</a>
				<a onClick={this.Click.bind(this,'admin')} className="main-page__btn component__btn">Я администратор</a>
			</div>
		);
	}
}


export default IndexView;