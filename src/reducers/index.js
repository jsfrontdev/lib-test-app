import { createStore } from 'redux';

let initial = {

	books:null,
	reviews:null,
	users:null,
	userRole:{
		admin:false,
		user:false
	}
};

const reducer = (state = initial, action) => {


	switch (action.type){

		case 'USER_ROLE':
			console.log(action)
			return {
				...state,
				userRole:action.isUserRole	

			};
			break;
	

		case 'USER_ADD':
			console.log(action)
			return {
				...state,
				users:
					[...state.users,
						action.userAdd]
			};
			break;

		case 'USER_LIST_ADD':

			const indexBookToUsr = state.books.findIndex((item) => { return item.id === action.id })
			console.log(state)

			return {
				books:[
					...state.books.slice(0, indexBookToUsr),
					action.addToUsrList,
					...state.books.slice(indexBookToUsr + 1)
				],
				...state
			}
			break;

			
		case 'USERS_LOADED':
			console.log(action)
			return {
				...state,
				users:action.usersLoad
				

			};
			break;

		case 'BOOKS_LOADED':
			console.log(action)
			return {
				...state,
				books:action.booksLoad

			};
			break;



		case 'REVIEWS_LOADED':
			console.log(action)
			return {
				...state,
				reviews:action.reviewsLoad
				
			};
			break;


		case 'REVIEW_ADD':
			let indexNewRev = state.reviews.findIndex((item) => { return item.id === action.id })
			let addReviewsArr = []; 
			
			if(indexNewRev == -1){
				addReviewsArr = [action.addReview];
				return {
					...state,
					reviews:[
						...state.reviews,
						{id:action.id,reviews:addReviewsArr}
					]
				}
			}	
			else{
				addReviewsArr = [
			 	...state.reviews[indexNewRev].reviews,
			 	   action.addReview
				]
				return {
					...state,
					reviews:[
						...state.reviews.slice(0, indexNewRev),
						{id:action.id,reviews:addReviewsArr},
						...state.reviews.slice(indexNewRev + 1)
					]
				}
			}

			break;

		case 'NEW_BOOK_ADD':
			console.log(action,action.booksLoadedAdd)
			const newItm = action.booksLoadedAdd
			return {

					...state,
					books:[...state.books, newItm]
				
			};
			break;

		case 'REVIEW_REMOVE_DELETE':
			let newReviewsArr = [];
			const index = state.reviews.findIndex((item) => { return item.id === action.id })
			const indexRev = state.reviews[index].reviews.findIndex((item) => { 
				return item.user === action.delIndex
				
			})

			if(action.flag){
				newReviewsArr = [
			 	...state.reviews[index].reviews.slice(0,indexRev ),
			 	   action.reviewDeleteArr,
			 	...state.reviews[index].reviews.slice(indexRev + 1)
				]

			}else{
				newReviewsArr = [
			 	...state.reviews[index].reviews.slice(0,indexRev ),
			 	...state.reviews[index].reviews.slice(indexRev + 1)
				]

			}

			return {
				...state,
				reviews:[
					...state.reviews.slice(0, index),
					{id:action.id,reviews:newReviewsArr},
					...state.reviews.slice(index + 1)
				]
			}
			break;

		default:
			return state;
			break;
	}

}

export default reducer;