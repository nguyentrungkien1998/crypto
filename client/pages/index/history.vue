<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24" :offset="0">
				<el-input placeholder="Order ID ..." v-model="search" size="medium" prefix-icon="el-icon-aim" type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
				<br>
				<br>
				<el-button type="primary" @click="Search" icon="el-icon-search" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Search</el-button>
			</el-col>
		</el-row>
		<el-divider direction="horizontal"></el-divider>
		<el-row :gutter="20">
			<el-col :span="24" :offset="0">
				<el-table :data="list_order" :border="true" :highlight-current-row="true" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
					<el-table-column label="Time" align="center" :sortable="false" :fixed="false" width="150">
						<template slot-scope="scope">
							{{getTime(scope.row.createdAt)}}
						</template>
					</el-table-column>
					<el-table-column label="From" prop="depositNetwork" align="center" :sortable="false" :fixed="false" width="80">
					</el-table-column>
					<el-table-column label="To" prop="receiveNetwork" align="center" :sortable="false" :fixed="false" width="80">
					</el-table-column>
					<el-table-column label="Amount" prop="depositCoinAmt" align="center" :sortable="false" :fixed="false" width="90">
					</el-table-column>
					<el-table-column label="From Address" prop="fromAddress" align="left" :sortable="false" :fixed="false" width="330">
					</el-table-column>
					<el-table-column label="Receive Address" prop="destinationAddr" align="left" :sortable="false" :fixed="false" width="330">
					</el-table-column>
					<el-table-column label="Order ID" prop="bank_order_id" align="center" :sortable="false" :fixed="false" width="145">
					</el-table-column>
					<el-table-column label="Status" align="center" :sortable="false" :fixed="false" width="180">
						<template slot-scope="scope">
							<div>
								<el-tag class="blink_me" style="margin-top: 10px;font-size: 14px;font-weight: bold" type="warning" :closable="false" effect="dark" v-if="(scope.row.status === null) && (scope.row.transaction.length === 0)" size="mini" :disable-transitions="false">Waiting for deposit ...</el-tag> 
							</div>
							<div>
								<el-tag  v-if="(scope.row.status === null) && (scope.row.transaction.length > 0)"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="primary" :closable="false" effect="dark" size="mini" :disable-transitions="false">Deposit successfully</el-tag>
							</div>
							<div>
								<el-tag class="blink_me" v-if="(scope.row.status === null) && (scope.row.transaction.length > 0)"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="warning" :closable="false" effect="dark" size="mini" :disable-transitions="false">Waiting for withdraw ...</el-tag>
							</div>
							<div>

								<el-tag v-if="scope.row.status === false"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="danger" :closable="false" effect="dark" size="large" :disable-transitions="false">Failed</el-tag>
							</div>

							<div>
								<el-tag v-if="(scope.row.status === true) && (scope.row.transaction.length > 0)"   style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="success" :closable="false" effect="dark" size="mini" :disable-transitions="false">Withdraw successfully</el-tag>
							</div>
						</template>
					</el-table-column>


					

					

				</el-table>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				search:'',
				list_order:[]
			}
		},
		methods:{
			Search:async function(){
				let {data} = await this.$axios.get('/api/order?where={"keysearch":{"contains":"'+this.search.toLowerCase()+'"}}')
				return this.list_order = data;
			},
			getTime:function(unixtime){
				let time = new Date(unixtime);
				let hour = time.getHours();
				let minute = time.getMinutes();
				let day = time.getDate();
				let month = time.getMonth()+1;
				let year = time.getFullYear();
				return hour+':'+minute+' '+day+'/'+month+'/'+year
			}
		}
	}
</script>
<style scoped>

</style>