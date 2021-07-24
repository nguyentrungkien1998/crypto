<template>
	<el-row class="header-background" :gutter="20">
	    <el-col :span="12" align="left" :offset="0">
			<el-link class="term" href="" icon="" target="_blank" type="primary" :underline="false" :disabled="false">Terms of Use</el-link>
			<p>2020 - 2021 Bridgefordefi.com. All rights reserved.</p>
		</el-col>
		<el-col :span="12" align="right" :offset="0">
			
			<el-button @click="open_telegram" class="margin-button" type="text" icon="el-icon-position" :loading="false" :plain="false" :round="false" :circle="true" :autofocus="false" size="medium" :disabled="false">
				Telegram
			</el-button>
			<el-link href="" icon="" target="_blank" type="primary" :underline="false" :disabled="false"></el-link>

		</el-col>
	</el-row>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			open_telegram:function(){

      
                return window.open('https://t.me/bridgefordefi_news', '_blank');
			}
			
		}
	}
</script>
<style scoped>
	.header-background{
	background-color: #2975ba;
	color:white;
	padding:15px;
}
.term{
	color:white;
}
.margin-button{
	margin-top: 18px;
	color:white;
}
</style>