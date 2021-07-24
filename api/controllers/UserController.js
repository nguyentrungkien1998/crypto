/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const {encode,decode} = require('../services/Security');
const md5 = require('md5');
module.exports = {
	'login':async function(req,res){
		let {password} = req.body;
		let pass_hash = await md5(password);
		let find_acc = await User.find({pass_hash});
		if(find_acc.length > 0){
			let cookie = await encode({pass_hash});
			return res.send({cookie});
		}else{
			return res.send({error:'Mật khẩu không chính xác'})
		}
	},

};

