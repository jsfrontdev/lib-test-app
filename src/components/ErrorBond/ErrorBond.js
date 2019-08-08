import React, { Component } from 'react';
//import './../index.styl';
//import './Spinner.styl';
import Errors from '../Errors/Errors.js';

class ErrorBond extends Component{

	state =  {
		hasError:false
	}

	componentDidCath(){
		this.setState({
			hasError:true
		});
	}

	render(){

		if(this.props.hasError)
			return <Errors/>;

		return this.props.children

	}

}

export default ErrorBond;