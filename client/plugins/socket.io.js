import Vue from 'vue'
import config from '../../nuxt.config.js'
import sailsIO from 'sails.io.js';
import socketIO from 'socket.io-client';
const io = sailsIO(socketIO)
io.sails.url = config.server.host+':'+config.server.port
Vue.prototype.$socket = io.socket;
module.exports = Vue;