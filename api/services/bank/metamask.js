const Web3 = require('web3')
const Tx = require("ethereumjs-tx");
const request = require('request-promise')
const TronWeb = require('tronweb');

let waitTime = ms=>new Promise(resolve => setTimeout(resolve, ms));




let get_abi_ETH = async function({address_token,apikey}){
	let options = {
		url:"https://api.etherscan.io/api?module=contract&action=getabi&address="+ address_token + "&apikey="+apikey,
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	return JSON.parse(result);
};
let get_abi_BSC = async function({address_token,apikey}){
	let options = {
		url:"https://api.bscscan.com/api?module=contract&action=getabi&address="+ address_token + "&apikey="+apikey,
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	return JSON.parse(result);
};
let get_abi_HECO = async function({address_token,apikey}){
	let options = {
		url:"https://api.hecoinfo.com/api?module=contract&action=getabi&address="+ address_token + "&apikey="+apikey,
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	return JSON.parse(result);
};

let get_BNB_fee_ETH = async function(address,{apikey}){
	let options = {
		url:'https://api.etherscan.com/api',
		method:'GET',
		qs:{
			module:'account',
			action:'balance',
			address,
			apikey,
			tag:'latest'
		}
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	result = result || 0;
	return parseFloat(result)/1e18;
};

let get_BNB_fee_BSC = async function(address,{apikey}){
	let options = {
		url:'https://api.bscscan.com/api',
		method:'GET',
		qs:{
			module:'account',
			action:'balance',
			address,
			apikey,
			tag:'latest'
		}
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	result = result || 0;
	return parseFloat(result)/1e18;
};

let get_BNB_fee_HECO = async function(address,{apikey}){
	let options = {
		url:'https://api.hecoinfo.com/api',
		method:'GET',
		qs:{
			module:'account',
			action:'balance',
			address,
			apikey,
			tag:'latest'
		}
	};
	let responseText = await request(options);
	let {result} = JSON.parse(responseText);
	result = result || 0;
	return parseFloat(result)/1e18;
};
let get_BNB = async function(address,{chain,apikey}){
	if(chain === 'ETH'){
		return await get_BNB_fee_ETH(address,{apikey});
	}else if(chain === 'BSC'){
		return await get_BNB_fee_BSC(address,{apikey});
	}else if(chain === 'HECO'){
		return await get_BNB_fee_HECO(address,{apikey});
	}
};




let check_txhash_HECO = async function(txhash,{apikey}){
	try{
		let options = {
			url:'https://api.hecoinfo.com/api',
			method:'GET',
			qs:{
				module:'transaction',
				action:'gettxreceiptstatus',
				txhash,
				apikey
			}
		};
		let responseText = await request(options);
		let {status} = JSON.parse(responseText);
		status = status || '';
		if(status.length === 0) throw null;
		return parseInt(status) === 1;
	}catch(error){
		return await check_txhash_HECO(txhash,{apikey});
	}
};
let check_txhash_BSC = async function(txhash,{apikey}){
	try{
		let options = {
			url:'https://api.bscscan.com/api',
			method:'GET',
			qs:{
				module:'transaction',
				action:'gettxreceiptstatus',
				txhash,
				apikey
			}
		};
		let responseText = await request(options);
		let {status} = JSON.parse(responseText);
		status = status || '';
		if(status.length === 0) throw null;
		return parseInt(status) === 1;
	}catch(error){
		await waitTime(5000);
		return await check_txhash_BSC(txhash,{apikey});
	}
};

let check_txhash_ETH = async function(txhash,{apikey}){
	try{
		let options = {
			url:'https://api.etherscan.io/api',
			method:'GET',
			qs:{
				module:'transaction',
				action:'gettxreceiptstatus',
				txhash,
				apikey
			}
		};
		let responseText = await request(options);
		let {status} = JSON.parse(responseText);
		status = status || '';
		if(status.length === 0) throw null;
		return parseInt(status) === 1;
	}catch(error){
		await waitTime(5000);
		return await check_txhash_ETH(txhash,{apikey});
	}
};
let check_txhash_METAMASK = async function(txhash,{apikey,chain}){
	if(chain === 'HECO'){
		return await check_txhash_HECO(txhash,{apikey});
	}else if(chain === 'ETH'){
		return await check_txhash_ETH(txhash,{apikey});
	}else if(chain === 'BSC'){
		return await check_txhash_BSC(txhash,{apikey});
	}
};
let check_txhash_TRON = async function(tronWeb){
	try{
		let {receipt:{result}} = await tronWeb.trx.getTransactionInfo(txt_hash.toString());
		result = (typeof result === 'object') ? JSON.stringify(result) : result.toString();
		if(result === '{}'){
			await waitTime(5000);
			return await check_txhash_TRON(tronWeb);
		}else{
			return result.toUpperCase() === 'SUCCESS';
		}
	}catch(error){
		return false;
	}


};
let list_network = [{
	network_url:'https://mainnet.infura.io/v3/233436ddfd5c497e8d818263ca96d72e',
	chainId:1,
	chain:'ETH',
	gasPriceGwei:120,
	gasLimit:1000000,
	list_address_token:[{
		coin:'USDT',
		address:'0xdac17f958d2ee523a2206206994597c13d831ec7'
	},{
		coin:'UNI',
		address:'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
	},{
		coin:'LINK',
		address:'0x514910771af9ca656af840dff83e8264ecf986ca'
	}],
	apikey:'EJ9HV2K4JJ2HQIXJNAFZBI3UF8PY9UTCB1'
},{
	network_url:'https://bsc-dataseed.binance.org',
	chainId:56,
	chain:'BSC',
	gasPriceGwei:5,
	gasLimit:1000000,
	list_address_token:[{
		coin:'USDT',
		address:'0x55d398326f99059ff775485246999027b3197955'
	},{
		coin:'UNI',
		address:'0xbf5140a22578168fd562dccf235e5d43a02ce9b1'
	},{
		coin:'LINK',
		address:'0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd'
	}],
	apikey:'YYX7BZRQUH5HEJ2382953XJX9GN8MNQ6PV'
},{
	network_url:'https://http-mainnet-node.huobichain.com',
	chainId:128,
	chain:'HECO',
	gasPriceGwei:2,
	gasLimit:500000,
	list_address_token:[{
		coin:'USDT',
		address:'0xa71edc38d189767582c38a3145b5873052c3e47a'
	},{
		coin:'UNI',
		address:'0x22c54ce8321a4015740ee1109d9cbc25815c46e6'
	},{
		coin:'LINK',
		address:'0x9e004545c59d359f6b7bfb06a26390b087717b42'
	}],
	apikey:'DQ51IUXIDCQRYW7JXRC1V5QV2U5HAWDZV4',
}];
let get_abi_data = async function({chain,address_token,apikey}){
	if(chain === 'ETH'){
		return await get_abi_ETH({address_token,apikey});
	}else if(chain === 'BSC'){
		return await get_abi_BSC({address_token,apikey});
	}else if(chain === 'HECO'){
		return await get_abi_HECO({address_token,apikey});
	}
};



let TRON = async function({address , amount},{tron_address,tron_privatekey}){

	let HttpProvider = TronWeb.providers.HttpProvider;
	let fullNode = new HttpProvider("https://api.trongrid.io");
	let solidityNode = new HttpProvider("https://api.trongrid.io");
	let eventServer = new HttpProvider("https://api.trongrid.io");

	var CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";


	let tronWeb = new TronWeb(fullNode, solidityNode, eventServer, tron_privatekey);

	let TRX = await tronWeb.trx.getAccount(address);
	if(TRX < 5) throw 'Sorry.Fees are not enough';
	
	let {abi} = await tronWeb.trx.getContract(CONTRACT);


	let contract = tronWeb.contract(abi.entrys, CONTRACT);

	let balance = await contract.methods.balanceOf(tron_address).call();
	balance = parseFloat(balance)/1e6;


	if (balance >= amount){
		let txhash = await contract.methods.transfer(address, parseFloat(amount)*1e6).send();
		return txhash;

	}else{
		await waitTime(5000);
		return await TRON({address , amount},{tron_address,tron_privatekey});

	}
};
let METAMASK = async function({network, coin , address, amount},{metamask_address,metamask_privatekey}){
	
	let find_network_data = list_network.find(({chain})=>chain.toUpperCase() === network.toUpperCase());
	if(!find_network_data) throw 'Not support network';

	let BNB = await get_BNB(address,find_network_data);

	if(BNB < 0.02) throw 'Sorry.Fees are not enough';

	let {network_url,chainId,chain,gasPriceGwei,gasLimit,list_address_token,apikey} = find_network_data;
	let address_token = list_address_token.find(e=>e.coin.toUpperCase() === coin.toUpperCase());
	if(!address_token) throw 'Not support coin';
	address_token = address_token.address;
	let abi = await get_abi_data({chain,address_token,apikey});

	let web3 = new Web3(network_url);
	let contract = new web3.eth.Contract(abi, address_token);

	let mmp_hext = Buffer.from(metamask_privatekey, 'hex');


	let balance = await contract.methods.balanceOf(metamask_address).call();
	balance = parseFloat(balance)/1e18



	if (balance >= amount){

		let count = await web3.eth.getTransactionCount(metamask_address)

		let transferAmount = web3.utils.numberToHex(amount*1e18);   
		let rawTransaction = {
			"from": metamask_address,
			"nonce": "0x" + count.toString(16),
			"gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
			"gasLimit": web3.utils.toHex(gasLimit),
			"to": address_token,
			"value": "0x0",
			"data": contract.methods.transfer(address, transferAmount).encodeABI(),
			"chainId": chainId
		};
		let tx = new Tx(rawTransaction);
        tx.sign(mmp_hext);
        let serializedTx = tx.serialize();
        let receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        let txthash = receipt.transactionHash
        return txthash;


	}else{
		await waitTime(5000);
		return await METAMASK({network, coin , address, amount},{metamask_address,metamask_privatekey})
	}
	
};

module.exports = async function({network, coin , address, amount},{metamask_address,metamask_privatekey,tron_address,tron_privatekey}){
	

	console.log({...{network, coin , address, amount},...{metamask_address,metamask_privatekey,tron_address,tron_privatekey}});
	if(network === 'TRX'){
		console.log('TRXXXXXXXXXXXXXX');
		try{
			return await TRON({address,amount},{tron_address,tron_privatekey})
		}catch(error){
			console.log(error);
			return false;
		}
	}else{
		console.log('PROOOOOOOOOOOO');
		try{
			return await METAMASK({network, coin , address, amount},{metamask_address,metamask_privatekey});

		}catch(error){
			console.log(error);
			return false;
		}
	}

};
