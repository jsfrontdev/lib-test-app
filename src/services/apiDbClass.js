class apiDbClass{

	ServerUploadDatas(path){

		console.log(path)

		let thisContext = this;

		return fetch(path,{
			headers : { 
			    'Content-Type': 'application/json',
			    'Accept': 'application/json'
			}
		}).then(function(response) {
				console.log(response.headers.get('Content-Type'));
				console.log(response.status);
				return response.json();
			})
			.then(function(data) {
				return data;
			})
			.catch(function(error) {
				return error;
		})
	}

	testDatas(){

		return ['some','shit','array']

	}
}

export default apiDbClass;