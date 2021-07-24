const request = require('request-promise');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');
var moment = require('moment');

function sign_sha(method, baseurl, path, data,secret) {
	var pars = [];
	for (let item in data) {
		pars.push(item + "=" + encodeURIComponent(data[item]));
	}
	var p = pars.sort().join("&");
	var meta = [method, baseurl, path, p].join('\n');
	var hash = hmacSHA256(meta, secret);
	var osig = Base64.stringify(hash);
	var Signature = encodeURIComponent(osig);
	p += `&Signature=${Signature}`;
	return p;
}

let make_request = async ({host,path,method,params = {}},{apiKey,secret},body = {})=>{
	let data_old = {
		AccessKeyId:apiKey,
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
	let full = sign_sha(method,host,path,data_old,secret);
	
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
let get_account_id = async ({apiKey,secret})=>{
	let host = 'api.huobi.pro';
	let path = '/v1/account/accounts';
	let method = 'GET';
	let {data} = await make_request({host,path,method},{apiKey,secret});
	if(data.length === 0) throw 'Not found Account_Id';
	return data.find(({type})=>type === 'spot').id; // point , investment
};
let get_order = async ({order_id},{apiKey,secret})=>{
	let host = 'api.huobi.pro';
	let path = '/v1/order/orders/'+order_id;
	let method = 'GET';
	let params = {
		'order-id':order_id
	};
	let {data} = await make_request({host,path,method,params},{apiKey,secret});

	if(!data) throw 'Not found Order ID';
	return parseFloat(data['field-amount'])-parseFloat(data['field-fees']);
};
module.exports = async ({coin,amount},{apiKey,secret})=>{

	let host = 'api.huobi.pro';
	let path = '/v1/order/orders/place';
	let method = 'POST';

	let account_id = await get_account_id({apiKey,secret});

	let body = {
		'account-id':account_id,
		symbol:coin.toLowerCase()+'usdt',
		type:'buy-market',
		amount
	};
	
	let {data} = await make_request({host,path,method},{apiKey,secret},body)
	if(!data) throw "Can n't make Sell action ";
	return await get_order({order_id:data},{apiKey,secret});
	
};

