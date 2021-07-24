/**
 * Config.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    discount:{
        type:'string'
    },
    email:{
        type:'string',
        required:true
    },
    binance_cookie:{
        type:'string',
        required:true
    },
    binance_csrftoken:{
        type:'string',
        required:true
    },
    binance_apikey:{
        type:'string',
        required:true
    },
    binance_secretkey:{
        type:'string',
        required:true
    },
    binance_google_auth:{
        type:'string',
        required:true
    },
   
    huobi_apikey:{
        type:'string',
        required:true
    },
    huobi_secretkey:{
        type:'string',
        required:true
    },

    metamask_address:{
        type:'string',
        required:true
    },
    metamask_privatekey:{
        type:'string',
        required:true
    },


    tron_address:{
        type:'string',
        required:true
    },
    tron_privatekey:{
        type:'string',
        required:true
    },
    use:{
        collection:'configuse',
        via:'config'
    }
    

  },
  beforeCreate:function(val,callback){
    val.email = val.email.toLowerCase();
    return callback();
  }

};

