/**
 * ConfigUse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

 	attributes: {

 		config_id:{
 			type:'string',
 			required:true
 		},
 		config:{
 			model:'config',
 			required:true
 		},
 		order_id:{
 			type:'string',
 			required:true
 		}

 	},

 };

