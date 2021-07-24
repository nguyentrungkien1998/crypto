const request = require('request-promise');
module.exports = async transaction_id=>{
	try{
		let options = {
			url:'https://fcd.terra.dev/v1/tx/'+transaction_id,
			method:'GET',
			headers:{
				'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
			},
			rejectUnauthorized:false
		};
		let responseText = await request(options);
		let {tx:{value:{msg}}} = JSON.parse(responseText);
		return msg[0].value.from_address;
	}catch(error){
		return null
	}
};