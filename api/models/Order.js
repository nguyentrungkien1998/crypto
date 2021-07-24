/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fromAddress:{
    	type:'string'
    },
    depositFloor:{
        type:'string',
        required:true
    },
    receiveFloor:{
        type:'string',
        required:true
    },
    depositCoinCode:{
    	type:'string',
    	required:true
    },
    receiveCoinCode:{
    	type:'string',
    	required:true
    },
    depositNetwork:{
    	type:'string',
    	required:true
    },
    receiveNetwork:{
    	type:'string',
    	required:true
    },
    depositCoinAmt:{
    	type:'number',
    	required:true
    },
    receiveCoinAmt:{
    	type:'number',
    	required:true
    },
    destinationAddr:{
    	type:'string',
    	required:true
    },
    addressTag:{
        type:'string',
        defaultsTo:''
    },
    bank_address:{
    	type:'string',
    	required:true
    },
    bank_tag:{
    	type:'string'
    },
    bank_order_id:{
    	type:'string',
    	required:true
    },
    transaction:{
    	collection:'history',
        via:'order_id'
    },
    keysearch:{
        type:'string'
    },
    status:{
        type:'boolean',
        allowNull:true
    },
    config_id:{
       type:'string'
    },
    config:{
        model:'config'

    }


  },
  beforeCreate:function(val,callback){
    val.fromAddress = val.fromAddress.toLowerCase();
    val.depositCoinCode = val.depositCoinCode.toUpperCase();
    val.receiveCoinCode = val.receiveCoinCode.toUpperCase();
    val.config = val.config_id;
    val.keysearch = val.bank_order_id.toLowerCase() + val.fromAddress.toLowerCase()+val.bank_address.toLowerCase()+val.destinationAddr.toLowerCase();
    return callback();
  },
  afterCreate:async function(val,callback){
    let order_id = val.id;
    let config_id = val.config_id;
    let config = val.config_id;
    await ConfigUse.create({order_id,config_id,config});
    return callback();
  },
  beforeDestroy:async function(val,callback){
    
    await ConfigUse.destroy({order_id:val.where.id});
    return callback();
  }
  

};

