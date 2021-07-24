/**
 * Mail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    from:{
        type:'string',
        required:true
    },
    to:{
        type:'string',
        required:true
    },
    content:{
        type:'string'
    },
    read:{
        type:'boolean',
        defaultsTo:false
    }

  },
  beforeCreate:function(val,callback){
    val.from = val.from.toLowerCase();
    val.to = val.to.toLowerCase();
    return callback();
  }
};

