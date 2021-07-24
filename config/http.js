

module.exports.http = {


  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/
    nuxt: (req, res) => {
      // Build in development
      return sails.config.nuxt.render(req, res);
    },
    
    order: [
     
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'nuxt',
      'www',
      'favicon',
    ],

  },

};
