/**
 * Code.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    address:{
    	type:'string',
    	required:true
    },
    code:{
    	type:'string',
    	required:true
    },
    floor:{
        type:'string',
        isIn:['binance','huobi'],
        required:true
    },
    used:{
    	type:'boolean',
    	defaultsTo:false
    },
    to:{
        type:'string',
        required:true
    }

  },

};

