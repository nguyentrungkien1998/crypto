const request = require('request-promise');
module.exports = async transaction_id=>{
	try{
		let options = {
			url:'https://api.eosflare.io/v1/eosflare/get_transaction',
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			
			rejectUnauthorized:false,
			formData:{
				id:transaction_id
			}
		};
		let responseText = await request(options);
		let responseJson = JSON.parse(responseText);
		return responseJson.traces[0].act.data.from;
	}catch(error){
		return null;
	}
};