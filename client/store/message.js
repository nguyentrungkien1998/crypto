import axios from 'axios';
export const strict = false;
export const state = ()=> ({
	list_friend:[]
});
export const mutations = {
	set_list_friend(state,list){
		return state.list_friend = list;
	}
};
export const getters = {
	
};
export const actions =  {

};
