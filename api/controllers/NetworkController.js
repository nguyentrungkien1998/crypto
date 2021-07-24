/**
 * NetworkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	'all-config':async function(req,res){
		let list_config = await Config.find();
		if(list_config.length === 0){
			return res.send(null)
		}else{
			return res.send(list_config[0]);
		}
	}
};

