<template>
	<el-row :gutter="20">
		<el-col :span="10" :offset="6">
			<el-form @submit.native.prevent ref="form"  :rules="ruleForm" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
				<el-form-item label="Bát quốc:" align="left">
					<el-input placeholder="Password" v-model="formData.password" size="medium" prefix-icon=""type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
				</el-form-item>
				
				
				<el-form-item align="center">
					<el-button type="primary" @click="login" :loading="loading" size="small">Vào</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
	function setCookie(cname, cvalue, exdays = 100000) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};
	
	export default {
		data(){
			return {
				formData:{
					password:''
				},
				loading:false
			}
		},
		methods:{
			login:async function(){
				this.loading = true;
				try{
					let {password} = this.formData;
					if((password || '').length  < 1) throw 'Bạn chưa nhập mật khẩu';
					let {data} = await this.$axios.post('/api/user/login',{password});

					if(data.error) throw data.error;
					setCookie('auth_nuxt',data.cookie);
					return this.$router.push('/setup')
				}catch(error){
					this.$message({type:'error',message:error});
				};
				this.loading = false;
				return;
			}
		}
	}
</script>
<style scoped>

</style>