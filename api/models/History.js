/**
 * History.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    insertTime:{
        type:'number',
        required:true
    },
    amount:{
        type:'number',
        defaultsTo:0
    },
    address:{
        type:'string',
        required:true
    },
    addressTag:{
        type:'string'
    },
    txId:{
        type:'string',
    },
    asset:{
        type:'string',
        required:true
    },
    status:{
        type:'number',
        required:true
    },
    from:{
        type:'string'
    },
    order_id:{
        model:'order'
    }

  }

};

