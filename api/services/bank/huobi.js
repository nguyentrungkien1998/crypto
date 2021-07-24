const request = require('request-promise');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');
var moment = require('moment');

function sign_sha(method, baseurl, path, data,huobi_secretkey) {
	var pars = [];
	for (let item in data) {
		pars.push(item + "=" + encodeURIComponent(data[item]));
	}
	var p = pars.sort().join("&");
	var meta = [method, baseurl, path, p].join('\n');
	var hash = hmacSHA256(meta, huobi_secretkey);
	var osig = Base64.stringify(hash);
	var Signature = encodeURIComponent(osig);
	p += `&Signature=${Signature}`;
	return p;
}
const waitTime = function(time){
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};

let make_request = async ({host,path,method,params = {}},{huobi_apikey,huobi_secretkey},body = {})=>{
	let data_old = {
		AccessKeyId:huobi_apikey,
		SignatureMethod:'HmacSHA256',
		SignatureVersion:'2',
		Timestamp:moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
		...params
	};

	
	let data = {};
	for(let key of Object.keys(data_old).sort()){
		data[key] = data_old[key]
	}
	let raw = new URLSearchParams(data).toString();
	
	let full = sign_sha(method,host,path,data_old,huobi_secretkey);
	
	let options = {
		url:'https://'+host+path+'?'+full,
		method,
		headers:{
			"Content-Type": "application/json",
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
		},
		rejectUnauthorized:false
	};
	if(method === 'POST') options.body = JSON.stringify({...data_old,...body});


	let responseText = await request(options);
	return JSON.parse(responseText);
};
let getFee = async ({currency,chain},{huobi_apikey,huobi_secretkey})=>{
	let host = 'api.huobi.pro';
	let path = '/v2/reference/currencies';
	let method = 'GET';
	let {data} = await make_request({host,path,method,params:{currency}},{huobi_apikey,huobi_secretkey});

	let find_currency = data.find(({currency})=>currency.toLowerCase() === currency);
	if(!find_currency) return 0;
	let find_chain_price = find_currency.chains.find(e=>e.chain.toLowerCase() === chain.toLowerCase());
	if(!find_chain_price) return 0;
	return find_chain_price.transactFeeWithdraw;
	
};
let withdraw = async ({currency,fee,chain,amount,address},{huobi_apikey,huobi_secretkey})=>{
	
	let host = 'api.huobi.pro';
	let path = '/v1/dw/withdraw/api/create';
	let method = 'POST';


	
	let make_withdraw = await make_request({host,path,method},{huobi_apikey,huobi_secretkey},{currency,fee,chain,amount,address});
	console.log(make_withdraw);

	if(make_withdraw['status'] === 'error') {

		await waitTime(10000);
		return await withdraw({currency,fee,chain,amount,address},{huobi_apikey,huobi_secretkey})
	}else{
		return amount;
	}
	
};
let make = async ({coin,address,amount,network},{huobi_apikey,huobi_secretkey})=>{
	let currency = coin.toLowerCase();
	let chain = network;
	let fee = await getFee({currency,chain},{huobi_apikey,huobi_secretkey});

	
	let amount_new = parseFloat(amount) - parseFloat(fee);
	amount_new = (Math.floor(amount_new*1000000))/1000000;
	return await withdraw({currency,fee,chain,amount:amount_new,address},{huobi_apikey,huobi_secretkey})
	
};

module.exports = async ({coin,network,amount,address},{huobi_apikey,huobi_secretkey})=>{
	console.log({coin,network,amount,address});
 

	coin = coin.toLowerCase();
	
	let find_network = await Network.find({coin:coin.toUpperCase(),network:network.toUpperCase(),floor:'huobi'});
	if(find_network.length === 0) throw 'Sorry.Please try again';
	network = find_network[0].val;
	
	
	let amount_left = await make({coin,address,amount,network},{huobi_apikey,huobi_secretkey});
	return amount_left;
};


