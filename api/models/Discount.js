/**
 * Discount.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    percent:{
        type:'number',
        required:true
    }

  },
  beforeCreate:async function(val,callback){
    let list_discount = await Discount.find();
    for(let {id} of list_discount){
        await Discount.destroy({id});
    }
    return callback();
  }

};

