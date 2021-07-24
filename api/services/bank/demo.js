const huobi = require('./huobi');
(async ()=>{
	let coin = 'USDT';
	let network = 'trc20usdt';
	let amount = 15;
	let address = 'TQWAUYLiCTGdTHdaEDcMRHZJeySEHPM1yo';
	let huobi_apikey = '19dfb31c-df6cef4d-b2c4efb6-7yngd7gh5g';
	let huobi_secretkey = 'fcc0dd09-90b7faea-48a77aff-a4a2a';
	let addressTag = '';
	let data = await huobi({coin,network,amount,address,addressTag},{huobi_apikey,huobi_secretkey});
	console.log(data);
})();