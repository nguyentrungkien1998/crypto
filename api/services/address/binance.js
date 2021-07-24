const request = require('request-promise');
module.exports = async ({network,coin},{binance_cookie,binance_csrftoken})=>{

	
	let network_obj = await Network.find({coin,network,floor:'binance'});
	if(network_obj.length === 0) throw 'Không tìm thấy network phù hợp';

	coin = network_obj[0].coin;
	network = network_obj[0].val;


	var headers = {
		'authority': 'www.binance.com',
		'csrftoken': binance_csrftoken,
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36 OPR/74.0.3911.218',
		'content-type': 'application/json',
		'lang': 'en',
		'clienttype': 'web',
		'accept': '*/*',
		'origin': 'https://www.binance.com',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://www.binance.com/en/my/wallet/account/main/deposit/crypto/USDT',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
		cookie:binance_cookie
	};

	var options = {
		url: 'https://www.binance.com/gateway-api/v1/private/capital/deposit/getAddress',
		headers,
		method:'POST',
		body:JSON.stringify({"locale":"en",network:network.toUpperCase(),coin:coin.toUpperCase(),"isAgreement":true,"sameAddress":false})
	};

	let responseText = await request(options);
	let {data:{address,tag}} = JSON.parse(responseText);
	return {address,tag};
};