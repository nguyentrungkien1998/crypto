import axios from 'axios';
export const strict = false;
export const state = ()=> ({
	name:'Tuỳ chọn',
	list_config:[],
	from_address:''

});
export const mutations = {
	set_FromAddress(state,from_address){
		state.from_address = from_address;
	}
};
export const getters = {
	
};
export const actions =  {
	
};
