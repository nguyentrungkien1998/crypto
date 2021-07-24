 const sender = require('../services/sender'); 
 const huobi_withdraw = require('../services/bank/huobi');
 const binance_withdraw = require('../services/bank/binance');
 let {price} = require('../services/ccxt/binance');

 const binance_sell = require('../services/ccxt/binance').sell;
 const binance_buy = require('../services/ccxt/binance').buy;

 const huobi_sell = require('../services/ccxt/huobi').sell;
 const huobi_buy = require('../services/ccxt/huobi').buy;

 const address_binance = require('../services/address/binance');
 const address_huobi = require('../services/address/huobi');

 const metamask_withdraw = require('../services/bank/metamask');

 const waitTime = function(){
 	return new Promise(resolve=>{
 		setTimeout(function(){
 			return resolve(time);
 		},time)
 	})
 };

 const my_config = async function(){
 	let list_config = await Config.find().populate('use');
 	list_config = list_config.filter(e=>e.use.length === 0);
 	if(list_config.length === 0){
 		await waitTime(10000);
 		return await my_config();
 	} 
 	return list_config[0];

 };
 module.exports = {
 	'save':async function(req,res){
 		try{
 			let {data} = req.body;
 			if(data.error) return res.ok();
 			for(let obj of data.reverse()){
 				let {insertTime,amount,creator,address,txId,asset,status} = obj;
 				let find_history = await History.find({txId});
 				
 				if(find_history.length === 0){
 					if(txId === '4ACX6uNRnqpVr8qTwJDmHJW9ts4DxZMpJygiUekPaue1ANP4znYFgrFSPXHmQ1fU8Q47v3SGmyPe3boqSYtRDPVJ') console.log('HELLOOOOOOOOOO');
 					let from = await sender(txId);
 					if(txId === '4ACX6uNRnqpVr8qTwJDmHJW9ts4DxZMpJygiUekPaue1ANP4znYFgrFSPXHmQ1fU8Q47v3SGmyPe3boqSYtRDPVJ') console.log(from);
 					
 					if(from){
 						obj.from = from;
 						
 						let list_order = await Order.find({status:null,keysearch:{contains:from.toLowerCase()+address.toLowerCase()},depositCoinCode:asset.toUpperCase(),createdAt:{'<':insertTime,'>':insertTime-1800000}}).populate('config').sort('createdAt DESC');
 						
 						if(list_order.length > 0){
 							for(let order of list_order){
 								obj.order_id = order.id;
 								await History.create(obj);
 							};
 							let order = list_order[0];
 							addressTag = order.addressTag || '';
 							try{
 								if(!order.config) throw 'Can not find account associate with this order';
 								let find_ConfigUse = await ConfigUse.find({config_id:order.config_id,order_id:order.id});
 								if(find_ConfigUse.length === 0) throw 'Can not find Config Use for this order';
 								let config = order.config;

 								let {id,email,binance_cookie,binance_csrftoken,binance_google_auth,huobi_cookie,huobi_google_auth,metamask_address,metamask_privatekey,tron_address,tron_privatekey} = config;
 								let find_discount = await Discount.find();
 								let discount = find_discount.length > 0 ? find_discount[0].percent : 0;
 								let destinationAddr = order.destinationAddr;
 								let coin = null;

 								console.log(order);

 								console.log('HELLO 111111111 ');



 								let address_trx_BINANCE = await address_binance({network:'TRX',coin:'USDT'},config);
 								let address_trx_HUOBI = await address_huobi({network:'TRX',coin:'USDT'},config);


 								if((order.depositFloor === 'huobi') && (order.receiveFloor === 'binance')){

 									if( (order.depositCoinCode === 'USDT') && (order.receiveCoinCode === 'USDT')){
 										amount = amount - (discount*amount/100);
 										amount = (Math.floor(amount*1000000))/1000000;

 										let amount_left = await huobi_withdraw({coin:'USDT',address:address_trx_BINANCE.address,addressTag,amount,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:order.destinationAddr,addressTag,amount:amount_left,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});


 									}else if((order.depositCoinCode === 'USDT') && (order.receiveCoinCode !== 'USDT')){
 										amount = amount - (discount*amount/100);
 										amount = (Math.floor(amount*1000000))/1000000;




 										let amount_left = await huobi_withdraw({coin:'USDT',address:address_trx_BINANCE.address,addressTag,amount,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;


 										let price_receiveCoinCode = await price({coin:order.receiveCoinCode},config);
 										let amount_receiveCoinCode_buy = parseFloat(amount_left)/parseFloat(price_receiveCoinCode);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*100000000))/100000000;


 										amount_receiveCoinCode_buy = await binance_buy({coin:order.receiveCoinCode,amount:amount_receiveCoinCode_buy},config);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:order.destinationAddr,addressTag,amount:amount_receiveCoinCode_buy,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode === 'USDT')){

 										let amount_receiveCoinCode = await huobi_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										let amount_left = await huobi_withdraw({coin:'USDT',address:address_trx_BINANCE.address,addressTag,amount:amount_receiveCoinCode,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:order.destinationAddr,addressTag,amount:amount_left,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode !== 'USDT')){


 										let amount_receiveCoinCode = await huobi_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										let amount_left = await huobi_withdraw({coin:'USDT',address:address_trx_BINANCE.address,addressTag,amount:amount_receiveCoinCode,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;

 										let price_receiveCoinCode = await price({coin:order.receiveCoinCode},config);
 										let amount_receiveCoinCode_buy = parseFloat(amount_left)/parseFloat(price_receiveCoinCode);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*100000000))/100000000;

 										amount_receiveCoinCode_buy = await binance_buy({coin:order.receiveCoinCode,amount:amount_receiveCoinCode_buy},config);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:order.destinationAddr,addressTag,amount:amount_receiveCoinCode_buy,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}






 								}else if((order.depositFloor === 'binance') && (order.receiveFloor === 'huobi')){


 									if( (order.depositCoinCode === 'USDT') && (order.receiveCoinCode === 'USDT')){
 										console.log('333333333333333333333');
 										amount = amount - (discount*amount/100);

 										amount = (Math.floor(amount*1000000))/1000000;
 										let amount_left = await binance_withdraw({coin:'USDT',address:address_trx_HUOBI.address,addressTag,amount,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										console.log('444444444444444444444')

 										let amount_left_bank = await huobi_withdraw({coin:order.receiveCoinCode,address:metamask_address,addressTag,amount:amount_left,network:order.receiveNetwork},config);
 										amount_left_bank = (Math.floor(amount_left_bank*1000000))/1000000;
 										console.log('55555555555555555555')

 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_left_bank,network:order.receiveNetwork},config);
 										console.log('666666666666666666666')

 										await Order.update({id:order.id}).set({status:true});


 									}else if((order.depositCoinCode === 'USDT') && (order.receiveCoinCode !== 'USDT')){
 										console.log('777777777777777777777');
 										amount = amount - (discount*amount/100);

 										amount = (Math.floor(amount*1000000))/1000000;
 										let amount_left = await binance_withdraw({coin:'USDT',address:address_trx_HUOBI.address,addressTag,amount,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										console.log('888888888888888888888');
 										let amount_receiveCoinCode_buy = await huobi_buy({coin:order.receiveCoinCode,amount:amount_left},config);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*1000000))/1000000;
 										console.log('10aaaa10aaaa10aaaaaa10aaaa');

 										let amount_left_bank = await huobi_withdraw({coin:order.receiveCoinCode,address:metamask_address,addressTag,amount:amount_receiveCoinCode_buy,network:order.receiveNetwork},config);
 										amount_left_bank = (Math.floor(amount_left_bank*1000000))/1000000;
 										console.log('denbuoc 11-11-11-11-11-11');

 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_left_bank,network:order.receiveNetwork},config);
 										console.log('DONEEEEEEEEEE 12');
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode === 'USDT')){
 										console.log('13-13-13-13-13-13-13-13');
 										let amount_receiveCoinCode = await binance_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('14-14-14-14-14-14-14-14-14-');
 										let amount_left = await binance_withdraw({coin:'USDT',address:address_trx_HUOBI.address,addressTag,amount:amount_receiveCoinCode,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										console.log('15-15-15-15-15-15-15-15-151-5');
 										let amount_left_bank = await huobi_withdraw({coin:order.receiveCoinCode,address:metamask_address,addressTag,amount:amount_left,network:order.receiveNetwork},config);
 										amount_left_bank = (Math.floor(amount_left_bank*1000000))/1000000;
 										console.log('16-16-16-16-16-16-16-1616-');
 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_left_bank,network:order.receiveNetwork},config);
 										console.log('17-17-17-17-17-17-17-17');
 										await Order.update({id:order.id}).set({status:true});


 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode !== 'USDT')){

 										console.log('18-18-18-18-18-18');
 										let amount_receiveCoinCode = await binance_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('19-19-19-19-19');
 										let amount_left = await binance_withdraw({coin:'USDT',address:address_trx_HUOBI.address,addressTag,amount:amount_receiveCoinCode,network:'TRX'},config);
 										amount_left = (Math.floor(amount_left*1000000))/1000000;
 										console.log('21-21-21-21-21-21-21');
 										let amount_receiveCoinCode_buy = await huobi_buy({coin:order.receiveCoinCode,amount:amount_left},config);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*1000000))/1000000;
 										console.log('22-22-22-22-22-22-22');
 										let amount_left_bank = await huobi_withdraw({coin:order.receiveCoinCode,address:metamask_address,addressTag,amount:amount_receiveCoinCode_buy,network:order.receiveNetwork},config);
 										amount_left_bank = (Math.floor(amount_left_bank*1000000))/1000000;
 										console.log('23-23-23-23-23-23-23-23-23');
 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_left_bank,network:order.receiveNetwork},config);
 										console.log('24-24-24-24-24-24-24-24-24-24');
 										await Order.update({id:order.id}).set({status:true});


 									}


 								}else if((order.depositFloor === 'huobi') && (order.receiveFloor === 'huobi')){

 									if( (order.depositCoinCode === 'USDT') && (order.receiveCoinCode === 'USDT')){
 										console.log('25-25-25-25-25-25-25-25');
 										amount = amount - (discount*amount/100);

 										let amount_left_bank = (Math.floor(amount*1000000))/1000000;
 										if(order.receiveNetwork === 'TRX'){
 											amount_left_bank = await huobi_withdraw({coin:'USDT',address:tron_address,addressTag,amount:amount_left_bank,network:order.receiveNetwork},config);
 										}else{
 											amount_left_bank = await huobi_withdraw({coin:'USDT',address:metamask_address,addressTag,amount:amount_left_bank,network:order.receiveNetwork},config);
 										}
 										amount_left_bank = (Math.floor(amount_left_bank*1000000))/1000000;
 										console.log('26-26-26-26-26-26-26-');
 										await metamask_withdraw({coin:'USDT',address:destinationAddr,amount:amount_left_bank,network:order.receiveNetwork},config);
 										console.log('27-27-27-27-27-27-27');
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode === 'USDT') && (order.receiveCoinCode !== 'USDT')){
 										console.log('28-28-28-28-28-28-28');
 										amount = amount - (discount*amount/100);

 										amount = (Math.floor(amount*1000000))/1000000;
 										let amount_receiveCoinCode = await huobi_buy({coin:order.receiveCoinCode,amount},config);
 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('29-29-29-29-29-29-29');


 										if(order.receiveNetwork === 'TRX'){
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:tron_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}else{
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:metamask_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('30-30-30-30-30-30');
 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										console.log('31-31-31-31-31-31-31');
 										await Order.update({id:order.id}).set({status:true});



 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode === 'USDT')){
 										console.log('32-32-32-32-32-32-32-32');


 										amount = (Math.floor(amount*1000000))/1000000;
 										let amount_receiveCoinCode = await huobi_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('33-33-33-33-33-33-33');
 										if(order.receiveNetwork === 'TRX'){
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:tron_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}else{
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:metamask_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('34-34-34-34-34-34-34-34');
 										await metamask_withdraw({coin:'USDT',address:destinationAddr,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										console.log('35-35-35-35-35-35-35-35');
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode !== 'USDT')){
 										console.log('36-36-36-36-36-36-36');
 										let amount_deposit_USDT = await huobi_sell({coin:order.depositCoinCode,amount},config);
 										amount_deposit_USDT = amount_deposit_USDT - (discount*amount_deposit_USDT/100);

 										amount_deposit_USDT = (Math.floor(amount_deposit_USDT*1000000))/1000000;
 										console.log('37-37-37-37-37-37-37-37');
 										let amount_receiveCoinCode = await huobi_buy({coin:order.receiveCoinCode,amount:amount_deposit_USDT},config);
 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('38-38-38-38-38-38-38');
 										if(order.receiveNetwork === 'TRX'){
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:tron_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}else{
 											amount_receiveCoinCode = await huobi_withdraw({coin:'USDT',address:metamask_address,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										}

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										console.log('39-39-39-39-39-39')
 										await metamask_withdraw({coin:order.receiveCoinCode,address:destinationAddr,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										console.log('40-40-40-40-40');
 										await Order.update({id:order.id}).set({status:true});


 									}
 								}else if((order.depositFloor === 'binance') && (order.receiveFloor === 'binance')){
 									if( (order.depositCoinCode === 'USDT') && (order.receiveCoinCode === 'USDT')){
 										amount = amount - (discount*amount/100);

 										amount = (Math.floor(amount*1000000))/1000000;
 										await binance_withdraw({coin:'USDT',address:destinationAddr,addressTag,amount,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode === 'USDT') && (order.receiveCoinCode !== 'USDT')){
 										amount = amount - (discount*amount/100);

 										amount = (Math.floor(amount*1000000))/1000000;

 										let price_receiveCoinCode = await price({coin:order.receiveCoinCode},config);
 										let amount_receiveCoinCode_buy = parseFloat(amount)/parseFloat(price_receiveCoinCode);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*100000000))/100000000;

 										let amount_receiveCoinCode = await binance_buy({coin:order.receiveCoinCode,amount:amount_receiveCoinCode_buy},config);
 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:destinationAddr,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode === 'USDT')){

 										amount = (Math.floor(amount*1000000))/1000000;
 										let amount_receiveCoinCode = await binance_sell({coin:order.depositCoinCode,amount},config);
 										amount_receiveCoinCode = amount_receiveCoinCode - (discount*amount_receiveCoinCode/100);

 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										await binance_withdraw({coin:'USDT',address:destinationAddr,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});

 									}else if((order.depositCoinCode !== 'USDT') && (order.receiveCoinCode !== 'USDT')){

 										let amount_deposit_USDT = await binance_sell({coin:order.depositCoinCode,amount},config);
 										amount_deposit_USDT = amount_deposit_USDT - (discount*amount_deposit_USDT/100);

 										amount_deposit_USDT = (Math.floor(amount_deposit_USDT*1000000))/1000000;

 										let price_receiveCoinCode = await price({coin:order.receiveCoinCode},config);
 										let amount_receiveCoinCode_buy = parseFloat(amount_deposit_USDT)/parseFloat(price_receiveCoinCode);
 										amount_receiveCoinCode_buy = (Math.floor(amount_receiveCoinCode_buy*100000000))/100000000;

 										let amount_receiveCoinCode = await binance_buy({coin:order.receiveCoinCode,amount:amount_receiveCoinCode_buy},config);
 										amount_receiveCoinCode = (Math.floor(amount_receiveCoinCode*1000000))/1000000;
 										await binance_withdraw({coin:order.receiveCoinCode,address:destinationAddr,addressTag,amount:amount_receiveCoinCode,network:order.receiveNetwork},config);
 										await Order.update({id:order.id}).set({status:true});


 									}




 								}

 							}catch(error){
 								console.log(error);
 							}
 							
 							await ConfigUse.destroy({order_id:order.id});

 						}else{
 							console.log(error);
 							obj.order_id = null;
 							await History.create(obj);
 						}

 					}
 					

 				}
 			}
 			return res.ok();
 		}catch(error){
 			
 			return res.send({error:'Sorry. Please try again'});
 		}


 	}

 };

