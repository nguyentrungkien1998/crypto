<template>
	<div>
		<el-row :gutter="20">
		    <el-col :span="16" :offset="0">
					
					<el-tag  type="primary" :closable="false" effect="plain" size="large" :disable-transitions="false"> <i class="el-icon-message"></i> {{list.count}} email</el-tag>
					<el-button v-if="multipleSelection.length > 0" @click="remove_mail" type="danger" icon="el-icon-delete-solid" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Remove <span v-if="multipleSelection.length > 0">{{multipleSelection.length}} items</span></el-button>
			</el-col>
			<el-col :span="6" :offset="0">
				<el-input placeholder="Type your Email" v-model="list.to" size="medium" prefix-icon="" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>

			</el-col>
			<el-col :span="2" :offset="0">
				<el-button type="primary" icon="el-icon-search" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false"></el-button>
			</el-col>
		</el-row>
		<el-divider direction="horizontal"></el-divider>

		<el-row :gutter="20">
			<el-col :span="24" :offset="0">
				<el-table :data="list.data" @selection-change="handleSelectionChange" v-loading="loadStatus" :border="false" :highlight-current-row="true" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">

					<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column label="From" prop="from" align="left" :sortable="false" :fixed="false" width="400"/>
				<el-table-column label="To" prop="to" align="left" :sortable="false" :fixed="false" width="300"/>
				<el-table-column label="Time" align="center" width="400">
					<template slot-scope="scope">
						<el-tag  type="danger" :closable="false" effect="dark" size="medium" :disable-transitions="false">{{ConvertTime(scope.row.createdAt)}} ago</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="" align="center" width="200">
					<template slot-scope="scope">
						<el-button @click="open_mail(scope.row)" type="success" v-if="!scope.row.read" icon="el-icon-message" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Open Message</el-button>
						<el-button @click="open_mail(scope.row)" type="success"  v-if="scope.row.read" icon="el-icon-view" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Read Message</el-button>

					</template>
				</el-table-column>


			</el-table>

		</el-col>

	</el-row>
	<br><br>
	
	<el-pagination @current-change="ChangePagination" :total="list.count" :current-page.sync="list.pager" :pager-count="11" :hide-on-single-page="false" background layout="prev, pager, next"></el-pagination>
	<el-dialog :title="mail.from" :visible.sync="mail_show" :center="false" :fullscreen="false" top="0vh" width="50%">
		<div v-html="mail.content"></div>
	</el-dialog>
</div>
</template>
<script>
	export default {
		data(){
			return {
				list:{
					to:'',
					limit:6,
					pager:1,
					data:[],
					count:0
				},
				multipleSelection:[],
				mail_show:false,
				loadStatus:true,
				mail:{
					content:'',
					id:null,
					to:'',
					from:''
				}
			}
		},
		computed:{
			
		},
		created:async function(){
			this.list.to = this.$route.query.email;
			
		},
		mounted:async function(){
			this.Reload()
		},
		methods:{
			waitTime:function(time){
				return new Promise(resolve=>{
					setTimeout(function(){
						return resolve(time)
					},time)
				})
			},
			Reload:async function(){
				 await Promise.all([this.GetListMail(),this.CountMail()]);
				 this.loadStatus = false;
				 await this.waitTime(1000);
				 return await this.Reload();
			},
			GetListMail:async function(){
				let {data} = await this.$axios.get('/api/mail',{
					params:{
						sort:'createdAt DESC',
						limit:this.list.limit,
						skip:(this.list.pager-1)*this.list.limit,
						where:{to:{contains:this.list.to.toLowerCase()}}
					}
				});
				return this.list.data = data;
			},
			CountMail:async function(){
				let {data} = await this.$axios.post('/api/mail/count',{to:this.list.to});
				return this.list.count = data.count;
			},
			ConvertTime:function(unixtime){

				let time = Date.now() - unixtime;
				let second = Math.floor(time/1000);
				let minute = Math.floor(second/60);
				let hour = Math.floor(minute/60);
				let day = Math.floor(hour/24);
				return day ? day +' days' : (hour ? hour+' hours' : (minute ? minute+' minutes' : second+' seconds'))
			
			},
			ChangePagination:async function(){
				this.loadStatus = true;
			},
			RemoveMail:async function(id){
				let {data} = await this.$axios.patch('/api/mail/'+id);
				this.list.data = this.list.data.filter(e=>e.id !== id);
				
				return;
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			OpenStatus:async function(id){
				let {data} = await this.$axios.patch('/api/mail/'+id,{read:true});
				this.list.data = this.list.data.map(e=>{
					if(e.id === id) e.read = true;
					return e;
				});
				return;

			},
			open_mail:async function(mail){
				this.mail = mail;
				this.mail_show = true;
				if(!mail.read) await this.OpenStatus(mail.id);
			},
			remove_mail:async function(){
				let _ = this;
				this.$confirm('Bạn chắn chắn muốn thực hiện hành động này ?', 'Xác nhận', {
				          confirmButtonText: 'OK',
				          cancelButtonText: 'Cancel',
				          type: 'warning',
				          center: false
				}).then(async ()=>{
					let length = _.multipleSelection.length;
					for(let {id} of _.multipleSelection){
						await this.RemoveMail(id);

					}
					this.$message({type:'error',message:'Đã xoá '+length+' email'});
				}).catch(async ()=>{
					
				})
			}
		},
		async asyncData({$axios}){
			return await $axios.$get('/api/config');
		}
	}
</script>
<style scoped>

</style>