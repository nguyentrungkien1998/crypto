<template>
	<div style="margin-top: 40px">
		<el-row :gutter="20">
		    <el-col :span="4" :offset="0">
					<el-input placeholder="Discount" v-model="discount" size="medium" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
			</el-col>
			<el-col :span="2" :offset="0">
				<el-button type="primary" @click="save" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Save</el-button>
			</el-col>
			<el-col :span="2" :offset="0">
				<el-button @click="open_password" type="warning" icon="el-icon-key" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Change Password</el-button>
			</el-col>
			<el-col :span="16" align="right" :offset="0">
				<el-button type="primary" @click="Open_Create" icon="el-icon-plus" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Create</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24" align="right" :offset="0">


				
				<el-divider direction="horizontal"></el-divider>
				<el-table :data="list_config" :border="false" :highlight-current-row="true" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
					<el-table-column type="index" align="left" :sortable="false" :fixed="false" width="200"/>

					<el-table-column label="Email" prop="email" align="left" :sortable="false" :fixed="false" width="300"/>
					<el-table-column label="Update Cookie" prop="" align="left" :sortable="false" :fixed="false" width="300">
						<template slot-scope="scope">
							<el-tag type="primary" :closable="false" effect="plain" size="medium" :disable-transitions="false">{{convertTime(scope.row.updatedAt)}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="Status" prop="" align="left" :sortable="false" :fixed="false" width="200">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.use.length === 0" type="success" :closable="false" effect="dark" size="medium" :disable-transitions="false">Ready</el-tag>
							<el-tag v-if="scope.row.use.length > 0" type="warning" :closable="false" effect="dark" size="medium" :disable-transitions="false">Busy</el-tag>

						</template>
					</el-table-column>
					<el-table-column align="right" :sortable="false" :fixed="false" width="400">
						<template slot-scope="scope">
							<el-button type="success" @click="open_mail(scope.row.email)" icon="el-icon-message" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">INBOX</el-button>
							<el-button @click="Edit_config(scope.row)" type="primary" icon="el-icon-set-up" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">EDIT</el-button>
							
							<el-popconfirm title="Bạn có chắc chắn?" @confirm="Remove_config(scope.row.id)" confirmButtonText='OK' cancelButtonText='Không,cảm ơn.' icon="el-icon-info" iconColor="red">
							 
							  <el-button style="margin-left: 10px" slot="reference" type="danger" icon="el-icon-delete-solid" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Remove</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>



				</el-table>
			</el-col>
		</el-row>
		<el-dialog :visible.sync="create_config_show" :center="false" :fullscreen="false" top="2vh" width="80%">
			<el-row :gutter="20">
				<el-col align="center" :span="24" :offset="0">
					<h1>Create Config</h1>
					<br>
					<el-form @submit.native.prevent ref="form" :rules="ruleForm"  :model="formData"  status-icon label-width="auto" label-position="left" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

						<el-form-item label="Email:" prop="email" align="left">
							<el-input placeholder="Email" v-model="formData.email" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						
						<el-form-item align="left">
							<h1>Binance</h1>
						</el-form-item>
						<el-form-item label="Cookie:" prop="binance_cookie" align="left">
							<el-input placeholder="Binance Cookie" v-model="formData.binance_cookie" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="CsrfToken:" prop="binance_csrftoken" align="left">
							<el-input placeholder="Binance Csrftoken" v-model="formData.binance_csrftoken" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="apiKey:" prop="binance_apikey" align="left">
							<el-input placeholder="Binance ApiKey" v-model="formData.binance_apikey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="secretKey:" prop="binance_secretkey" align="left">
							<el-input placeholder="Binance SecretKey" v-model="formData.binance_secretkey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="Google Auth Code:" prop="binance_google_auth" align="left">
							<el-input placeholder="Code" v-model="formData.binance_google_auth" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>

						</el-form-item>
						<el-divider direction="horizontal"></el-divider>

						<el-form-item align="left">
							<h1>Huobi</h1>
						</el-form-item>


						<el-form-item label="apiKey:" prop="huobi_apikey" align="left">
							<el-input placeholder="huobi ApiKey" v-model="formData.huobi_apikey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="secretKey:" prop="huobi_secretkey" align="left">
							<el-input placeholder="huobi SecretKey" v-model="formData.huobi_secretkey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>

						<el-divider direction="horizontal"></el-divider>


						<el-form-item align="left">
							<h1>Metamask</h1>
						</el-form-item>


						<el-form-item label="Metamask Address:" prop="metamask_address" align="left">
							<el-input placeholder="Metamask Address" v-model="formData.metamask_address" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="Metamask Privatekey:" prop="metamask_privatekey" align="left">
							<el-input placeholder="Metamask Privatekey" v-model="formData.metamask_privatekey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>


						<el-form-item align="left">
							<h1>Tron</h1>
						</el-form-item>


						<el-form-item label="Tron Address:" prop="tron_address" align="left">
							<el-input placeholder="Tron Address" v-model="formData.tron_address" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="Tron Privatekey:" prop="tron_privatekey" align="left">
							<el-input placeholder="Tron Privatekey" v-model="formData.tron_privatekey" size="medium" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>


						<el-form-item align="center">
							<el-button type="primary" @click="Save_Config" :loading="loading" size="medium">CREATE</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-dialog>
		<el-dialog title="Change Password" :visible.sync="change_password_show" :center="false" :fullscreen="false" top="15vh" width="30%">
		  <el-form @submit.native.prevent ref="form"  :rules="ruleForm" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
		  	<el-form-item label="Type new password:" align="left">
		  		<el-input v-model="PassForm.new_password" size="medium" type="text" show-password :autosize="false" :disabled="false" autocomplete="off"></el-input>
		  	</el-form-item>
		  	<el-form-item label="Re-Type new password:" align="left">
		  		<el-input v-model="PassForm.renew_password" size="medium" type="text" show-password :autosize="false" :disabled="false" autocomplete="off"></el-input>
		  	</el-form-item>
		  
		  
		      <el-form-item align="center">
		  	  <el-button type="primary" @click="change_password" :loading="loading" size="small">Submit</el-button>
		      </el-form-item>
		  </el-form>
		  
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				discount:0,
				formData:{},
				change_password_show:false,
				create_config_show:false,
				PassForm:{
					new_password:'',
					renew_password:''
				},
				resetData:{
					discount:1,
					email:'',
					binance_cookie:'',
					binance_csrftoken:'',
					binance_apikey:'',
					binance_secretkey:'',
					binance_google_auth:'',
					
					
					huobi_apikey:'',
					huobi_secretkey:'',
					metamask_privatekey:'',
					metamask_address:'',

					tron_privatekey:'',
					tron_address:''
					

				},
				ruleForm:{
					discount:[{type:'string',required:true,trigger:'blur'}],
					email:[{type:'string',required:true,trigger:'blur'}],
					binance_cookie:[{type:'string',required:true,trigger:'blur'}],
					binance_csrftoken:[{type:'string',required:true,trigger:'blur'}],
					binance_apikey:[{type:'string',required:true,trigger:'blur'}],
					binance_secretkey:[{type:'string',required:true,trigger:'blur'}],
					binance_google_auth:[{type:'string',required:true,trigger:'blur'}],
					
					huobi_apikey:[{type:'string',required:true,trigger:'blur'}],
					huobi_secretkey:[{type:'string',required:true,trigger:'blur'}],
					metamask_privatekey:[{type:'string',required:true,trigger:'blur'}],
					metamask_address:[{type:'string',required:true,trigger:'blur'}],
					tron_privatekey:[{type:'string',required:true,trigger:'blur'}],
					tron_address:[{type:'string',required:true,trigger:'blur'}]


				},
				list_config:[],
				loading:false
			}
		},
		computed:{
			list_id(){
				return this.list_config.map(({id})=>id);
			}
		},
		created:async function(){
			return await [this.All_Config(),this.GetDiscount()];
		},
		methods:{
			All_Config:async function(){
				let {data} = await this.$axios.get('/api/config');
				return this.list_config = data;
			},
			convertTime(unixtime){
				let time = new Date(unixtime);
				let hour = time.getHours();
				let minute = time.getMinutes();
				let day = time.getDate();
				let month = time.getMonth()+1;
				let year = time.getFullYear();

				return hour+':'+minute+' '+day+'/'+month+'/'+year;
			},
			Save_Config:async function(){
				
				let _ = this;
				_.$refs['form'].validate(async valid=>{
					if(valid){
						_.loading = true;
						try{
							if(_.formData.id){
								await this.$axios.patch('/api/config/'+_.formData.id,this.formData);
							}else{
								await this.$axios.post('/api/config',this.formData);
							}
						    _.create_config_show = false;
							_.$message({type:'success',message:'Đã lưu dữ liệu'});
							await _.All_Config();

						}catch(message){
							_.$message({type:'error',message});
						}
						_.loading = false;
					}else{
						return false;
					}
					return
				})

			},
			GetDiscount:async function(){
				let {data} = await this.$axios.get('/api/discount');
				this.discount = data.length > 0 ? data[0].percent : 0;
				return;
			},
			open_mail:function(email){
				

				let route = this.$router.resolve({path: '/mail?email='+email});
      
                return window.open(route.href, '_blank');
			},
			Edit_config:function(config){
				this.formData = config;
				this.create_config_show = true;
			},
			Remove_config:async function(id){
				let _ = this;
				this.$confirm('Bạn chắn chắn muốn thực hiện hành động này ?', 'Xác nhận', {
				          confirmButtonText: 'OK',
				          cancelButtonText: 'Cancel',
				          type: 'warning',
				          center: false
				}).then(async ()=>{
					let {data} = await _.$axios.delete('/api/config/'+id);
					return await _.All_Config();

					
				}).catch(async ()=>{
					
				})
			},
			Open_Create:async function (){
				this.formData = this.resetData;
				this.create_config_show = true;
			},
			save:async function(){
				let percent = this.discount.replace(/,/g, ".");
				percent = parseFloat(percent);
				await this.$axios.post('/api/discount',{percent});
				this.$alert('Updated discount', 'Alert', {
				          confirmButtonText: 'OK',
				          type: 'success',
				          roundButton:true,
				          center: false,
				          dangerouslyUseHTMLString: false
				}).then(async ()=>{
					
				}).catch(async ()=>{
					
				});
				return;
			},
			open_password:function(){
				this.change_password_show = true;
			},
			change_password:async function(){
				if((this.PassForm.new_password.length === 0) || (this.PassForm.renew_password.length === 0)) {
					this.$message({type:'error',message:'Please type new password and retype new password'})
				}
				if(this.PassForm.new_password.length !== this.PassForm.renew_password.length) {
					this.$message({type:'error',message:'The two passwords are different. Please re-enter.'})
				}
				await this.$axios.post('/api/user',{password:this.PassForm.new_password});
				this.$router.push('/sieucapvippro');
				return;
			}
		},
		async asyncData({$axios}){
			return await $axios.$get('/api/config');
		}
	}
</script>
<style scoped>

</style>