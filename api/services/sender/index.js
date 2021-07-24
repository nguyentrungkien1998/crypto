const bsc = require('./bsc');
const eth = require('./eth');
const heco = require('./heco');
const terra = require('./terra');
const waves = require('./waves');
const eos = require('./eos');
const ftm = require('./ftm');
const solana = require('./solana');
const tron = require('./tron');

module.exports = async transaction_id=>{
	let list_address = await Promise.all([bsc(transaction_id),eth(transaction_id),heco(transaction_id),terra(transaction_id),waves(transaction_id),eos(transaction_id),ftm(transaction_id),solana(transaction_id),tron(transaction_id)]);
	let find_address = list_address.find(e=>e);
	return find_address
};

