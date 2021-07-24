const ccxt = require ('ccxt');

let waitTime = function(time){
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};
let balance = async function ({binance_apikey,binance_secretkey}) {
	let apiKey = binance_apikey;
	let secret = binance_secretkey;
	let binance_data = new ccxt.binance({apiKey,secret});
	let balance = await binance_data.fetchBalance();
	return balance.info.balances;
};
let history = async function({binance_apikey,binance_secretkey}){
	let apiKey = binance_apikey;
	let secret = binance_secretkey;
	let binance_data = new ccxt.binance({apiKey,secret});
	let balance = await binance_data.fetchDeposits(undefined,Date.now()-1800000);
	return balance.map(({info})=>info);
};
let sell = async function({coin,amount},{binance_apikey,binance_secretkey}){
	try{
		let apiKey = binance_apikey;
		let secret = binance_secretkey;
		let binance_data = new ccxt.binance({apiKey,secret});
		let {cost,fee} = await binance_data.createMarketSellOrder(coin+'/USDT', amount);
		return parseFloat(cost) - parseFloat(fee.cost);
	}catch(error){
		await waitTime(10000);
		return await sell({coin,amount},{binance_apikey,binance_secretkey})
	}
};
let buy = async function({coin,amount},{binance_apikey,binance_secretkey}){
	try{
		let apiKey = binance_apikey;
		let secret = binance_secretkey;
		let binance_data = new ccxt.binance({apiKey,secret});
		let buy_data = await binance_data.createMarketBuyOrder(coin.toUpperCase()+'/USDT', amount);
		return buy_data.amount - buy_data.fee.cost;
	}catch(error){
		console.log(error);
		await waitTime(10000);
		return await buy({coin,amount},{binance_apikey,binance_secretkey});
	}
};
let price = async function({coin},{binance_apikey,binance_secretkey}){
	let apiKey = binance_apikey;
	let secret = binance_secretkey;
	coin = coin.toUpperCase();
	let binance_data = new ccxt.binance({apiKey,secret});
	let data = await binance_data.fetchTicker(coin+'/USDT');
	return data.info.lastPrice
};
module.exports = {balance,history,sell,buy,price}