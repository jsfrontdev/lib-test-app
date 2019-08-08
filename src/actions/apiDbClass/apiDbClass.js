class apiDbClass{

	ServerUploadDatas(path){

		let thisContext = this;

		return fetch(path)
			.then(function(response) {
				console.log(response.headers.get('Content-Type'));
				console.log(response.status);
				return response.json();
			})
			.then(function(data) {
				return data;
			})
			.catch(function(error) {
				console.log(error);
		})

	}
}

export default apiDbClass;