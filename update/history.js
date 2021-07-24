const request = require('request-promise');
const {dev,server:{host,port}} = require('../nuxt.config.js');
let hostname = dev ? (host+':'+port) : host;

const waitTime = time=>{
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time);
		},time)
	})
};
let update_balance_binance = async (config_id)=>{
	let options = {
		url:hostname+'/api/crawl/binance/history',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({config_id})
	};
	let responseText = await request(options);
	let responseJson =  JSON.parse(responseText);
	console.log(responseJson);
	return responseJson;
};
let update_balance_huobi = async (config_id)=>{
	console.log(config_id);
	let options = {
		url:hostname+'/api/crawl/huobi/history',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({config_id})
	};
	let responseText = await request(options);
	
	let responseJson = JSON.parse(responseText);
	
	let result = responseJson.map(e=>({ 
		insertTime: e['created-at'],
		amount: e.amount,
		address: e.address.toLowerCase(),
		addressTag: e['address-tag'],
		txId:e['tx-hash'],
		asset:e.currency.toUpperCase(),
		status:(e.state === 'safe') || (e.state === 'confirmed') ? 1 : 0,
		
	}));
	
	return result;


};
let get_configuse = async function(){
	let options = {
		url:hostname+'/api/crawl/configuse',
		method:'GET',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let responseJson = JSON.parse(responseText);
	let list_config = responseJson.map(e=>e.config_id);
	return list_config;
};
let save_history = async function(data){

	let options = {
		url:hostname+'/api/history/save',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({data})
	};
	return await request(options);
	
};

let make_binance = async ()=>{
	try{
		let list_config_id = await get_configuse();
		for(let config_id of list_config_id){
			let data = await update_balance_binance(config_id);
			await save_history(data);
		}
		
	}catch(error){
		console.log('binance')
		console.log(error);
	}
	await waitTime(5000);
	return await make_binance();
};
let make_huobi = async ()=>{
	try{
		let list_config_id = await get_configuse();
		for(let config_id of list_config_id){
			let data = await update_balance_huobi(config_id);
			await save_history(data);
		}
	}catch(error){
		console.log('huobi');
	}
	await waitTime(5000);
	return await make_huobi();
};
make_binance();
make_huobi();
