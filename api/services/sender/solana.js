const request = require('request-promise');
const random = require('randomstring');
module.exports = async transaction_id=>{
	try{
		var headers = {
			'authority': 'api.mainnet-beta.solana.com',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36 OPR/74.0.3911.218',
			'content-type': 'application/json',
			'accept': '*/*',
			'origin': 'https://explorer.solana.com',
			'sec-fetch-site': 'same-site',
			'sec-fetch-mode': 'cors',
			'sec-fetch-dest': 'empty',
			'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5'
		};

		var options = {
			url: 'https://api.mainnet-beta.solana.com/',
			headers,
			method:'POST',
			body:JSON.stringify({"method":"getConfirmedTransaction","jsonrpc":"2.0","params":[transaction_id,"jsonParsed"],"id":"2859d9da-3c88-4620-a3f1-"+random.generate(12)})
		};
		let responseText = await request(options);
		let responseJson = JSON.parse(responseText);
		return responseJson.result.transaction.message.instructions.find(({program})=>program === 'system').parsed.info.source;
	}catch(error){
		return null;
	}
};