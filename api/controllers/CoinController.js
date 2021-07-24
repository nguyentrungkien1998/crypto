/**
 * CoinController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 let {price} = require('../services/ccxt/binance');
 const address_binance = require('../services/address/binance');
 const address_huobi = require('../services/address/huobi');

 const QRCode = require('qrcode');
 const random = require('randomstring');
  const my_config = async function(){
 	let list_config = await Config.find().populate('use');
 	list_config = list_config.filter(e=>e.use.length === 0);
 	if(list_config.length === 0) throw null;
 	return list_config[0];

 };
 module.exports = {
 	'price':async function(req,res){
 		try{
 			let {coin} = req.body;
 			let find_config = await Config.find();
 			if(find_config.length === 0) throw 'Không tìm thấy cấu hình';
 			let data = await price({coin},find_config[0]);
 			return res.send(data);
 		}catch(error){
 			console.log(error);
 			return res.send({error});
 		}
 		
 	},
 	'discount':async function(req,res){
 		
 		let find_config = await Config.find();
 		let discount = (find_config.length > 0 ) ? parseFloat(find_config[0].discount) : 0;
 		return res.send({discount:parseFloat(discount)})
 	},
 	'binance/address':async function(req,res){
 		try{
 			let {coin,network,floor} = req.body;

 			let config = await my_config();


 			
 			let {address,tag} = await address_binance({coin,network},config);
 			let orderid = random.generate(10).toUpperCase();

 			return res.send({address,tag,orderid,config_id:config.id});
 		}catch(error){
 			console.log(error);
 			return res.send({error});
 		}
 	},
 	'huobi/address':async function(req,res){
 		try{
 			let {coin,network} = req.body;

 			let config = await my_config();

 			let {address,tag} = await address_huobi({coin,network},config);
 			let orderid = random.generate(10).toUpperCase();
 			return res.send({address,tag,orderid,config_id:config.id});
 		}catch(error){
 			console.log(error);
 			return res.send({error});
 		}
 	},

 };

