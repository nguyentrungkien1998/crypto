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
let make_request = async ({host,path,method,params},{huobi_apikey,huobi_secretkey},body = {})=>{
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
	
	let full = sign_sha(method,host,path,data,huobi_secretkey);
	
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
module.exports = async ({coin,network},{huobi_apikey,huobi_secretkey})=>{

	
	
	let network_obj = await Network.find({coin,network,floor:'huobi'});
	if(network_obj.length === 0) throw 'Không tìm thấy network phù hợp';

	coin = network_obj[0].coin;
	network = network_obj[0].val;

	let host = 'api.huobi.pro';
	let path = '/v2/account/deposit/address';
	let method = 'GET';



	let currency = coin.toLowerCase();
	let chain = network.toLowerCase();

	let params = {currency}

	let {data} = await make_request({host,path,method,params},{huobi_apikey,huobi_secretkey});
	let find_address = data.find(e=>(e.currency === currency) && (e.chain === chain));
	return find_address ? {address:find_address.address,tag:find_address.addressTag} : {address:null,tag:''}
}