/**
 * UpdateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
 	
 };

