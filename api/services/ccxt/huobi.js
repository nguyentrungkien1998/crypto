const ccxt = require ('ccxt');
const SellHuobi = require('./sell_huobi');
const BuyHuobi = require('./buy_huobi');
let waitTime = function(time){
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};

let balance = async function ({huobi_apikey,huobi_secretkey}) {
	let apiKey = huobi_apikey;
	let secret = huobi_secretkey;
	let houbi_data = new ccxt.huobipro({apiKey,secret});
	let balance = await houbi_data.fetchBalance();
	return balance.info.balances;
};
let history = async function({huobi_apikey,huobi_secretkey}){
	let apiKey = huobi_apikey;
	let secret = huobi_secretkey;
	let houbi_data = new ccxt.huobipro({apiKey,secret});
	let balance_USDT = await houbi_data.fetchDeposits('USDT',Date.now()-1800000,500);
	let balance_UNI = await houbi_data.fetchDeposits('UNI',Date.now()-1800000,500);
	let balance_LINK = await houbi_data.fetchDeposits('LINK',Date.now()-1800000,500);

	let result = [...balance_USDT,...balance_UNI,...balance_LINK];
	result = result.map(({info})=>info);
	result = result.sort(function (a, b) {
		return  parseInt(a['created-at']) - parseInt(b['created-at']);
	});

	return result;
};
let sell = async function({coin,amount},{huobi_apikey,huobi_secretkey}){
	try{
		let apiKey = huobi_apikey;
		let secret = huobi_secretkey;
		return await SellHuobi({coin,amount},{apiKey,secret});
	}catch(error){
		console.log(error);
		await waitTime(10000);
		return await sell({coin,amount},{huobi_apikey,huobi_secretkey});
	}
};
let buy = async function({coin,amount},{huobi_apikey,huobi_secretkey}){
	try{
		
		let apiKey = huobi_apikey;
		let secret = huobi_secretkey;
		return await BuyHuobi({coin,amount},{apiKey,secret});
	}catch(error){
		await waitTime(10000);
		return await buy({coin,amount},{huobi_apikey,huobi_secretkey});
	}
};
module.exports = {balance,history,sell,buy}