const request = require('request-promise');
module.exports = async transaction_id=>{
	try{
		let options = {
			url:'https://api.ftmscan.com/api',
			method:'GET',
			headers:{
				'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
			},
			rejectUnauthorized:false,
			qs:{
				module:'proxy',
				action:'eth_getTransactionReceipt',
				txhash:transaction_id,
				apikey:'G2HGJZY1N4EW28EUUM18YD8M1HYFYI5UDU'

			}
		};
		let responseText = await request(options);
		let {result:{from}} = JSON.parse(responseText);
		return from;
	}catch(error){
		return null;
	}
};
