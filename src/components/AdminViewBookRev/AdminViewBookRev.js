import React, { Component } from 'react';
//import './../index.styl';
//import './LibsRoles.styl';


class AdminViewBookRev extends Component{


	state  = {
		review:null
	};

	constructor(props){

		super(props);


		// this.reviews = props.onGetReviews();


		// this.id = props.thisBookId;

		// if(this.reviews instanceof Promise){
		// 	//console.log('asda',this.reviews)
		// 	this.getPromise(this.reviews);
		// }

	


	}

	getPromise = (obj) => {

		console.log(obj)
		let id = this.id;

		obj
			.then(([data])=>{
				console.log(data[id])
				this.setState({
					review: data[id]
				});
			});
	}



	render(){

		let view1 = '';


		// if(this.reviews instanceof Promise){
			

		// 	//console.log(this.state.review);

		// 	if(this.state.review){

		// 		view1 = this.state.review.map(function(item){
		// 			return (
		// 				<div>{item.review}</div>
		// 			);
		// 		})
		// 	}
		// }
		// else{
		// 	console.log(this.reviews);
		// 	view1 = this.reviews[0][this.id].map(function(item){
		// 		return (
		// 			<div>{item.review}</div>
		// 		);
		// 	})
		// }


		

	

		return(
			<div className="admin-view__book-item-review">
				<div className="admin-view__reviews">
					{view1}
				</div>
				<button onClick={this.props.onDelitReview}>DELLLL</button>
		
			</div>
		);

		
	}
}

export default AdminViewBookRev;