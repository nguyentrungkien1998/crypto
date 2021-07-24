<template>
	<div>
		<el-row v-if="!isMobile" class="header-background" style="padding: 10px 20px" :gutter="0">
			<el-col :span="1" align="left" :offset="0">
				<el-link href="https://bridgefordefi.com" icon="" target="_blank" type="primary" :underline="false" :disabled="false">
				<el-avatar  :size="50" shape="circle" src="data:image/png;base64,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"></el-avatar></el-link>
			</el-col>
			<el-col :span="3" :offset="0">
				
				<el-link href="https://bridgefordefi.com" icon="" style="margin-top: 4px;color:white" target="_blank" type="primary" :underline="false" :disabled="false"> <h3> BRIDGE FOR DEFI</h3> </el-link>
			</el-col>
			<el-col :span="2" align="left" :offset="0">
				<el-button class="margin-button" @click="click_to_guide" type="text" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">How to use ?</el-button>

			</el-col>
			<el-col :span="8" :offset="0">
				<el-button @click="visit('history')" class="margin-button" type="text" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Check Order</el-button>

			</el-col>
			
			<el-col v-if="!isMobile" :span="10" align="right" :offset="0">
				<el-tooltip effect="dark" :disabled="!address" :content="address" placement="bottom-start">
					<el-button @click="exe_address" class="margin-button" type="success" icon="el-icon-s-custom
					" :loading="false" :plain="false" :round="true" :circle="false" :autofocus="false" size="medium" :disabled="false">{{!address ? 'Connect wallet' : ((address.length > 20) ? address.slice(0,10)+'...'+address.slice(address.length-10) : address)}}</el-button>
				</el-tooltip>


			</el-col>
			<vue-metamask 
			v-if="wallet_login_show"
			@onComplete="onComplete"
			>
		</vue-metamask>
	</el-row>
	<el-row v-if="isMobile" class="header-background" style="padding: 10px 10px" :gutter="20">
	    <el-col :span="4" align="left" :offset="0">
				<el-avatar :size="50" shape="circle" src="data:image/png;base64,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"></el-avatar>
			</el-col>
			<el-col :span="10" :offset="0">
				<h3>BridgeForDefi</h3>
			</el-col>
	</el-row>
</div>
</template>
<script>
	import { isMobile } from 'mobile-device-detect';

	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	import VueMetamask from 'vue-metamask';
	function delete_cookie(name) {
		document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	function setCookie(cname, cvalue, exdays = 100000000) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}
	export default {
		components: {
			VueMetamask,
		},
		data(){
			return {
				isMobile:isMobile,
				username:'anonymous',
				notification_count:0,
				keyword:'',
				list_language:[
				{label:'Vietnamese',value:'vi'},
				{label:'English',value:'en'},
				{label:'China',value:'chi'}
				],
				language:{},
				value2:false,
				address:null,
				wallet_login_show:false

			}
		},
		created:async function(){
			let address = getCookie('address');
			this.address = address;
			this.set_FromAddress(address);
		},
		methods:{
			...mapMutations('layout',['set_FromAddress']),
			
			async logout(){
				delete_cookie('auth_nuxt');
				this.$router.push('/dang-nhap')
			},
			change_language(data){
				// sau này mình dịch sẽ có api translate ở đâu nên anh yên tâm nhé 
			},
			visit(path){
				this.$router.push('/'+path);
			},
			onComplete:function(data){
				this.address = data.metaMaskAddress;
				this.set_FromAddress(data.metaMaskAddress);
				setCookie('address',data.metaMaskAddress)
			},
			exe_address:function(){
				if(!this.address){
					this.wallet_login_show = true
				}else{
					this.logout();
				}
			},
			logout:async function(){
				this.$confirm('Do you want to log out ?', 'Logout', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning',
					center: false
				}).then(async ()=>{
					delete_cookie('address');
					this.address = null;
				}).catch(async ()=>{
					
				})
			},
			click_to_guide:function(){
				window.open("http://docs.bridgefordefi.com/");
			},
			

		}
	}
</script>
<style>
.el-header{
	padding: 0;
}
.username{
	margin-top:-40px;
	margin-left: 20px;
	margin-right: 30px;
}
.link{
	color:#606266;
}
.link:hover{
	color:#409EFF;
}
.header-background{
	background-color: #2975ba;
	color:white;
	padding-top: 20px 20px;
}
.margin-button{
	margin-top: 10px;
	color:white;
}
.el-tooltip__popper{
	font-size:15px;
}
.el-dropdown{
	font-size: 16px;
	cursor: pointer;
}
</style>