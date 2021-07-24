const auth = require('../google_auth');
const request = require('request-promise');
const waitTime = time=>{
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time);
		},time);
	})
};
let send_code = async ({coin,amount,address,addressTag},cookie)=>{
	var headers = {
		'authority': 'www.binance.com',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 OPR/74.0.3911.160',
		'content-type': 'application/json',
		'lang': 'en',
		'clienttype': 'web',
		'accept': '*/*',
		'origin': 'https://www.binance.com',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
		cookie
	};

	var options = {
		url: 'https://www.binance.com/bapi/accounts/v1/protect/account/email/sendEmailVerifyCode',
		headers,
		method:'POST',
		body:JSON.stringify({
			"bizScene":"crypto_withdraw",
			"msgType":"TEXT",
			"resend":false,
			"params":{
				"asset":coin.toUpperCase(),
				amount,
				address,
				addressTag,
				"assetLabel":coin.toUpperCase() === 'EOS' ? "MEMO" : ""
			}
		})
	};
	let responseText = await request(options);
	let {success} = JSON.parse(responseText);
	return success;
};
let GetFee = async ({coin,network},{binance_csrftoken,binance_cookie})=>{
	var headers = {
		'authority': 'www.binance.com',

		csrftoken:binance_csrftoken,

		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.218',
		'content-type': 'application/json',
		'clienttype': 'web',
		'accept': '*/*',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://www.binance.com/en/my/wallet/account/main/withdrawal/crypto/USDT',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
		cookie:binance_cookie
	};

	var options = {
		url: 'https://www.binance.com/bapi/capital/v2/public/capital/config/getOne',
		headers,
		method:'GET',
		qs:{
			coin:coin.toUpperCase(),
			lang:'en'
		}
	};

	let responseText = await request(options);
	let {data} = JSON.parse(responseText);
	let find_fee = data.find(e=>e.network.toUpperCase() === network.toUpperCase());
	let fee = find_fee ? parseFloat(find_fee.withdrawFee) : 0;
	let x_min = find_fee ? 1/parseFloat(find_fee.withdrawInternalMin) : null;
	return {fee,x_min}
};
let bank = async function({coin,address,addressTag,amount,network},{emailVerifyCode,googleVerifyCode},cookie,csrftoken){
	
	var headers = {
		'authority': 'www.binance.com',
		csrftoken,
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 OPR/74.0.3911.160',
		'content-type': 'application/json',
		'lang': 'en',
		'clienttype': 'web',
		'accept': '*/*',
		'origin': 'https://www.binance.com',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
		cookie
	};

	var options = {
		url: 'https://www.binance.com/bapi/capital/v3/private/capital/withdraw/apply',
		headers,
		method:'POST',
		body:JSON.stringify({
			coin:coin.toUpperCase(),
			address,
			amount,
			addressTag,
			"name":"",
			"sameAddress":true,
			network:network.toUpperCase(),
			"transactionFeeStatus":false,
			emailVerifyCode,
			googleVerifyCode
		})
	};

	let responseText = await request(options);
	console.log(JSON.parse(responseText));
	let {code,success} = JSON.parse(responseText);
	return (code === '000000') || success;
};
let make = async ({coin,address,addressTag,amount,network},{email,binance_apikey,binance_secretkey,binance_cookie,binance_csrftoken,binance_google_auth})=>{

	console.log({coin,address,addressTag,amount,network})
	
	
	let find_network = await Network.find({coin:coin.toUpperCase(),network:network.toUpperCase(),floor:'binance'});
	if(find_network.length === 0) throw 'Sorry.Please try again';
	let network_real = find_network[0].val;

	let obj = {coin,address,addressTag,amount,network:network_real};
	let {fee,x_min} = await GetFee({coin,network:network_real},{binance_cookie,binance_csrftoken});
	if(x_min) obj.amount = (Math.floor(obj.amount*x_min))/x_min;
	await send_code(obj,binance_cookie);
	await waitTime(15000);
	let make_banking = async function(){
		try{
			let find_emailVerifyCode = await Code.find({to:email,address,used:false,floor:'binance'}).sort('createdAt DESC');
			if(find_emailVerifyCode.length === 0) {
				await waitTime(50000);
				return await make({coin,address,addressTag,amount,network});
	     	}
			let emailVerifyCode_obj = find_emailVerifyCode[0];
			let emailVerifyCode = emailVerifyCode_obj.code;
			let googleVerifyCode = auth(binance_google_auth);
			let code = {emailVerifyCode,googleVerifyCode};
			await Code.update({id:emailVerifyCode_obj.id}).set({used:true});
			let result = await bank(obj,code,binance_cookie,binance_csrftoken);
			if(!result) return await make_banking();
			
			return parseFloat(obj.amount) - fee;
		}catch(error){
			console.log(error);
			
		}
	};
	return await make_banking();

};

module.exports = make;