/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const md5 = require('md5');
module.exports = {

  attributes: {

    pass_hash:{
        type:'string'
    },
    password:{
    	type:'string',
    	allowNull:true
    }

  },
  beforeCreate:async function(val,callback){
  	let list_user = await User.find();
  	for(let {id} of list_user){
  		await User.destroy({id});
  	}
  	
  	
  	val.pass_hash = await md5(val.password);
  	val.password = null;
  	return callback();
  }
};

