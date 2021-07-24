let port = 443;
let host = 'https://bridgefordefi.com';

module.exports = {
  dev:false,
  server: {port,host},
  permission:[],
  ssr:false,
  code_update:'23t4fdfag56htrsfdjkfdg4334fslaasd93tedddfthgf4y533333tqfsdae',
  crypt:{
    key:'ibsd83ibu20isdbe043a89sdhf7wfh79feksdfhdu2erh9221ffb389fn920cdsn',
    index:43
  },
  axios:{
    baseURL:host+':'+port,
    https:false,
  },
  limit_log:50,
  head: {
    title: 'BRIDGE FOR DEFI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'LEADING CROSS-CHAIN' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  loading: { color: '#3B8070' },
  srcDir: 'client/',
  css: [
  'element-ui/lib/theme-chalk/index.css'
  ],
  modules: ['@nuxtjs/axios'],
  buildModules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    { src: '~plugins/element-ui.js', ssr: false },
    { src: '~plugins/clipboard', ssr: false },
    



  ]
};

