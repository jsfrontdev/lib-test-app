
// export const inc = () => { return {type:'inc'}}
// export const rnd = (payload) => { return {type:'rnd',payload}}

export const isUserRole = (isUserRole) => { 
	return {
		type:'USER_ROLE',
		isUserRole
	}
}

export const usersLoaded = (usersLoad) => { 
	return {
		type:'USERS_LOADED',
		usersLoad
	}
}



export const userAdd = (userAdd) => {
	return {
		type:'USER_ADD',
		userAdd
	}
}

export const addToUsrList = (addToUsrList,id) => {
	return {
		type:'USER_LIST_ADD',
		addToUsrList,
		id
	}
}

export const newBookAdd = (newBookAdd) => {
	return {
		type:'NEW_BOOK_ADD',
		newBookAdd
	}
}

export const booksLoaded = (booksLoad) => { 
	return {
		type:'BOOKS_LOADED',
		booksLoad
	}
}

export const reviewsLoaded = (reviewsLoad) => { 
	return {
		type:'REVIEWS_LOADED',
		reviewsLoad
	}
}

export const deliteRemoveReview = (reviewDeleteArr,delIndex,id,flag) => { 
	return {
		type:'REVIEW_REMOVE_DELETE',
		reviewDeleteArr,
		delIndex,
		id,
		flag
	}
}

export const addReview = (id,addReview) => { 
	return {
		type:'REVIEW_ADD',
		addReview,
		id
	}
}

export const booksLoadedAdd = (booksLoadedAdd) => { 
	return {
		type:'NEW_BOOK_ADD',
		booksLoadedAdd	
	}
}