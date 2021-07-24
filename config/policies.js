

module.exports.policies = {

	'*':true,
	'user':{
		destroy:false,
		update:false,
		create:'isLoggedIn',
		add:false,
		find:false
	},
	'crawl/*':'isLoggedIn',
	'config/*':'isLoggedIn',
	'network/*':'isLoggedIn',
	'mail/*':'isLoggedIn',
	'history/*':'isLoggedIn',
	'configuse':{
		destroy:false,
		update:false,
		create:false,
		add:false,
		find:true
	},
	'discount':{
		destroy:false,
		update:false,
		create:true,
		add:false,
		find:true
	}
};
