const cheerio = require('cheerio');
const fs = require('fs');
let base64 = require('js-base64');
const request = require('request-promise');
const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser;
const {dev,server:{host,port}} = require('../nuxt.config.js');
let hostname = dev ? (host+':'+port) : host;
let getCode_Binance = function(message_html){
	let $ = cheerio.load(message_html);
	let message_text = $('html').text();
	let find_address =  message_text.match(new RegExp('(?<='+'to this address:'+'+).*?(?='+'Before'+')',"gs")) || [];
	let address = find_address.length > 0 ? find_address[0].trim(): null;
	let find_code = message_text.match(new RegExp('(?<='+'Verification code:'+'+).*?(?='+'The'+')',"gs")) || [];
	let code = find_code.length > 0 ? find_code[0].trim().replace(/\\n/g, "") : null;
	address = address.split(' ')[0];
	return {code,address,floor:'binance'};
};
let getCode_Huobi = function(message_html){
	let find_code = message_html.match(new RegExp('(?<='+'style="font-size: 24px; line-height: 24px; color: #0066ED;">'+'+).*?(?='+'<'+')',"gs")) || [];
	let code = find_code.length > 0 ? find_code[0].trim() : null;
	let find_address = message_html.match(new RegExp('(?<='+'<span style="font-weight: 600">'+'+).*?(?='+'<'+')',"gs")) || [];
	let address = find_address.length > 0 ? find_address[0].trim().replace(/\\n/g, "") : null;
	address = address.split(' ')[0];
	return {code,address,floor:'huobi'};
};
let save_code = async (list)=>{
	let options = {
		url:host+'/api/crawl/code',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		body:JSON.stringify(list),
		rejectUnauthorized:false
	};
	return await request(options);
};
let save_mail = async ({from,to,content})=>{
	let options = {
		url:host+'/api/mail',
		method:'POST',
		headers:{
			admin:'sdf87iu3yuasdfidfkjb28isfisdfbihjsdfbissa88sadfjsadkjsfjk'
		},
		body:JSON.stringify({from,to,content}),
		rejectUnauthorized:false
	};
	return await request(options);
};

const server = new SMTPServer({
	onData(stream, session, callback) {
		parser(stream, {},async (err, parsed) => {
			try{
				let to = parsed.to.value[0].address.toLowerCase();
				let from = parsed.from.value[0].address;
				let html = parsed.html;
				await save_mail({from,to,content:html});
				let list_data = {code:null,address:null,floor:null};
				if(from.includes('binance.com')){
					list_data = getCode_Binance(html); 
				}else if(from.includes('huobipro.com')){
					list_data = getCode_Huobi(html);
				};
				if(list_data.code) await save_code({...list_data,to});
				

			}catch(error){

			}
			return callback();
		})

	},
	disabledCommands: ['AUTH']
});
server.on("error", err => {
  console.log("Error %s", err.message);
});
server.listen(25, "66.42.55.177")


