/**
 * Network.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    network:{
    	type:'string',
    	required:true
    },
    val:{
    	type:'string',
    	required:true
    },
    coin:{
    	type:'string',
    	required:true
    },
    floor:{
    	type:'string',
    	isIn:['binance','huobi'],
    	required:true
    }

  },

};

