/**
 * MailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	'count':async function(req,res){
		let {to} = req.body;
		let count = await Mail.count({where:{to:{contains:to}}});
		return res.send({count});
	}
};

