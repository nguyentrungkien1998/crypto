const request = require('request-promise');
const {dev,server:{host,port}} = require('../nuxt.config.js');
let hostname = dev ? (host+':'+port) : host;

let list_order_old = async ()=>{
	let options = {
		url:hostname+'/api/order',
		method:'GET',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		qs:{
			transaction:[],
			where:{
				createdAt:{'<':Date.now()-1800000}
			}
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let responseJson = JSON.parse(responseText);
	let list_order_id = await responseJson.map(e=>e.id);
	return list_order_id;
};
let list_confisuse_old = async ()=>{
	let options = {
		url:hostname+'/api/configuse',
		method:'GET',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		qs:{
			where:{
				createdAt:{'<':Date.now()-1800000}
			}
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let responseJson = JSON.parse(responseText);
	let list_order_id = await responseJson.map(e=>e.order_id);
	return list_order_id;
};
let remove_order = async function(order_id){
	let options = {
		url:hostname+'/api/crawl/remove-configuse',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({order_id})
	};
	return await request(options);
};
let waitTime = function(time){
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};


let make1 = async ()=>{
	try{
		let list_order = await list_order_old();

		for(let order_id of list_order){
			await remove_order(order_id);
		};
	}catch(error){

	}
	
	await waitTime(5000);
	return await make1();
	
};
let make2 = async ()=>{
	try{
		let list_order = await list_confisuse_old();
		
		for(let order_id of list_order){
			await remove_order(order_id);
		};
	}catch(error){

	}
	
	await waitTime(5000);
	return await make2();
	
};
make1();
make2();