/**
 * CrawlController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const ccxt_binance = require('../services/ccxt/binance');
 const ccxt_huobi = require('../services/ccxt/huobi');

 const bank_binance = require('../services/bank/binance');
 const bank_huobi = require('../services/bank/huobi');

 const address_binance = require('../services/address/binance');
 const address_huobi = require('../services/address/huobi');

 const QRCode = require('qrcode');
 const random = require('randomstring');


 module.exports = {

 	
 	'binance/history':async function(req,res){
 		try{
 			let {config_id} = req.body;
 			if(!config_id) throw [];
 			let find_config = await Config.find({id:config_id});
 			if(find_config.length === 0) throw [];
 			let history = await ccxt_binance.history(find_config[0]);
 			return res.send(history);

 		}catch(error){
 			return res.send({error});
 		}
 	},
 	'binance/balance':async function(req,res){
 		try{
 			let {config_id} = req.body;
 			if(!config_id) throw [];
 			let find_config = await Config.find({id:config_id});
 			if(find_config.length === 0) throw [];
 			let balance = await ccxt_binance.balance(find_config[0]);
 			return res.send(balance);
 		}catch(error){
 			return res.send({error});
 		}
 	},
 	
 	'huobi/history':async function(req,res){
 		try{
 			let {config_id} = req.body;
 			if(!config_id) throw [];
 			let find_config = await Config.find({id:config_id});
 			if(find_config.length === 0) throw [];
 			
 			let history = await ccxt_huobi.history(find_config[0]);
 			return res.send(history);
 		}catch(error){
 			return res.send({error});
 		}
 	},
 	'huobi/balance':async function(req,res){
 		try{
 			let {config_id} = req.body;
 			if(!config_id) throw [];
 			let find_config = await Config.find({id:config_id});
 			if(find_config.length === 0) throw [];
 			let balance = await ccxt_huobi.balance(find_config[0]);
 			return res.send(balance);
 		}catch(error){
 			return res.send({error});
 		}
 	},

 	'configuse':async function(req,res){
 		let data = await ConfigUse.find();
 		return res.send(data);
 	},
 	'remove-configuse':async function(req,res){
 		let {order_id} = req.body;
 		await ConfigUse.destroy({order_id});
 		return res.ok();
 	},
 	

 	'code':async function(req,res){
 		let {address,code,floor,to} = req.body;
 		await Code.findOrCreate({address,code,floor,to},{address,code,floor,to});
 		return res.ok();
 	}

 };

