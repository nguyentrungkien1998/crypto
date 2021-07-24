<template>

	<el-row :gutter="0">
		<el-col :span="!isMobile ? 10 : 24" :offset="!isMobile ? 7 : 0">
			<div :class="!isMobile ? 'form-pro' : 'form-pro-mobile'">
				
				<el-form @submit.native.prevent ref="formData" :model="formData" :rules="ruleForm"  status-icon label-width="auto" :label-position="!isMobile ? 'left' :'top'" :inline="false" :disabled="false" :inline-message="!isMobile" show-message validate-on-rule-change :size="!isMobile ? 'small' : 'large'">
					<el-form-item align="center">
						<el-row :gutter="20">
							<el-col :span="!isMobile ? 22 : 24" align="center" :offset="0">
								<h1>LEADING CROSS-CHAIN </h1>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item :style="isMobile ? 'margin-top: -20px' :''" align="center">
						<el-row :gutter="20">
							<el-col :span="!isMobile ? 22 : 24" align="center" :offset="0">
								<el-button type="danger" icon="" :loading="false" :plain="false" :round="true" :circle="false" :autofocus="false" size="medium" :disabled="false">Total Volume Trading : <b>{{total.toLocaleString()}} $</b></el-button>
							</el-col>
						</el-row>

					</el-form-item>


					<br v-if="!isMobile"/>
					<el-form-item prop="fromAddress" :align="!isMobile ? 'left' : 'top'">
						<template slot="label">
							
							<span v-if="!isMobile">FROM:</span>
						</template>
						<el-row :gutter="0">
							<el-col :span="!isMobile ? 23 : 24" align="left" :offset="0">
								<el-input placeholder="Enter your from address (Option)" v-model="formData.fromAddress" :size="!isMobile ? 'medium' : 'large'" prefix-icon="el-icon-position" show-word-limit clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item prop="depositCoinAmt" label="" :align="!isMobile ? 'left' : 'top'">
						<el-row :gutter="10">
							<el-col :span="9" :offset="0">
								<el-tooltip effect="dark" content="Min = 80$ & Max = 10.000$" placement="bottom-start">
									<el-input placeholder="Amount" v-model="formData.depositCoinAmt" @input="real_receive" :size="!isMobile ? 'small' : 'large'" prefix-icon="el-icon-sort" show-word-limi type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
								</el-tooltip>

							</el-col>
							<el-col :span="!isMobile ? 7 : 8" align="right" :offset="0">
								<el-select v-model="formData.depositNetwork" @change="set_deposite" placeholder="Select" filterable :allow-create="false" :multiple="false" :collapse-tags="false" :clearable="false" :disabled="false">
									<el-option v-for="(data,index) in list_network" :key="index" :label="data" :value="data" :disabled="false"></el-option>
								</el-select>
							</el-col>
							<el-col :span="7" align="right" :offset="0">
								<el-select v-model="formData.depositCoinCode" @change="set_receive" placeholder="Select" filterable :allow-create="false" :multiple="false" :collapse-tags="false" :clearable="false" :disabled="false">
									<el-option v-for="(data,index) in list_asset_deposit" :key="index" :label="data" :value="data" :disabled="false"></el-option>
								</el-select>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item  v-if="isMobile" align="center">
						<el-image src="https://hexch.io/assets/img/swap2.svg" style="  background: #343a40; border-radius: 6px; padding: 5px;width: 20px;height: 27px " fit="cover" lazy></el-image>
					</el-form-item>

					<el-form-item v-if="!isMobile" align="center">

						<el-image style="width: 40px" src="data:image/png;base64,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" fit="cover"></el-image>
					</el-form-item>


					<el-form-item :style="isMobile ? 'margin-top: -20px' :''" prop="destinationAddr"  align="left">
						<template slot="label">
							
							<span v-if="!isMobile">TO:</span>
						</template>

						<el-row :gutter="10">
							<el-col :span="9" :offset="0">
								<el-tooltip effect="dark" content="estimated" placement="bottom-start">
									<el-input placeholder="" :value="formData.receiveCoinAmt || 0" :size="!isMobile ? 'small' : 'large'" show-word-limi type="text" :autosize="false" :disabled="false" autocomplete="off">
										<template slot="prefix">
											<i v-if="false" class="el-icon-loading"></i>
											<span v-if="formData.receiveCoinAmt" style="margin-left: 5px">≈</span>


										</template>
									</el-input>

								</el-tooltip>

							</el-col>
							<el-col :span="!isMobile ? 7 : 8" :offset="0">
								<el-select @change="change_network" v-model="formData.receiveNetwork" placeholder="Select" filterable :allow-create="false" :multiple="false" :collapse-tags="false" :clearable="false" :disabled="false">
									<el-option v-for="(data,index) in list_network" :key="index" :label="data" :value="data" :disabled="false"></el-option>
								</el-select>
							</el-col>
							<el-col :span="7" :offset="0">
								<el-select v-model="formData.receiveCoinCode" @change="real_receive" placeholder="Select" filterable :allow-create="false" :multiple="false" :collapse-tags="false" :clearable="false" :disabled="false">
									<el-option v-for="(data,index) in list_asset_receive" :key="index" :label="data" :value="data" :disabled="false"></el-option>
								</el-select>
							</el-col>
						</el-row>


					</el-form-item>

					<el-form-item :style="isMobile ? 'margin-top: -20px' :''" label=" " align="top">

						<el-row :gutter="0">
							<el-col :span="!isMobile ? 23 : 24" align="top" :offset="0">
								<el-input placeholder="Enter your receiving address" v-model="formData.destinationAddr" :size="!isMobile ? 'medium' : 'large'" prefix-icon="el-icon-position" show-word-limit clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
							</el-col>
						</el-row>
						

					</el-form-item>
					<el-form-item v-if="addressTag_Show" :style="isMobile ? 'margin-top: -20px' :''" label=" " align="top">
						<el-row :gutter="0">
							<el-col :span="!isMobile ? 23 : 24" align="top" :offset="0">
								<el-input placeholder="Enter your Address Tag (Required)" v-model="formData.addressTag" :size="!isMobile ? 'medium' : 'large'" prefix-icon="el-icon-price-tag
								" show-word-limit clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
					<br v-ì="!isMobile"/>

					<el-form-item  :style="isMobile ? 'margin-top: -20px' :''" align="center">
						<el-button style="background-color: #2975ba" type="primary" @click="Open_confirm" icon="" :loading="loading_exchange" :plain="false" :round="!isMobile" :circle="false" :autofocus="false" size="medium" :disabled="false">EXCHANGE NOW</el-button>
						<br>
						<br v-if="!isMobile"/>
						<el-tag  :style="isMobile ? 'margin-top: 15px' :''" type="primary" :closable="false" effect="plain" :size="!isMobile ? 'medium' : 'large'" :disable-transitions="false"> <i class="el-icon-warning"></i> Slippage tolerance = 1.5%</el-tag>


					</el-form-item>
					

				</el-form>



			</div>
			<el-dialog :visible.sync="info_show" :before-close="close_order" :center="true" :fullscreen="false" top="2vh" :width="!isMobile ? '44%' : '90%'">
				<template slot="title">
					<h3>Confirm Deposit</h3>
				</template>
				<el-row style="margin-top: -40px"  :gutter="20">
					
					<el-col :span="8" :offset="0">

						<p class="font-text">Type: </p>
					</el-col>
					
					<el-col :span="16" align="left" :offset="0">
						<p class="font-text">
							<el-tooltip effect="dark" content="Deposit Coin Code" placement="bottom-start">
								<el-tag type="info" :closable="false" style="margin-top: 8px" effect="plain" size="mini" :disable-transitions="false">{{order.depositCoinCode}}</el-tag>

							</el-tooltip>
							<el-tooltip effect="dark" content="Deposit Network" placement="bottom-start">
								<el-tag type="info" :closable="false" style="margin-top: 8px" effect="dark" size="mini" :disable-transitions="false">{{order.depositNetwork}}</el-tag> 
							</el-tooltip>
							<el-button type="text" icon="el-icon-caret-right" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false"></el-button>

							<el-tooltip effect="dark" content="Receive Coin Code" placement="bottom-start">
								<el-tag type="info" :closable="false" style="margin-top: 8px" effect="plain" size="mini" :disable-transitions="false">{{order.receiveCoinCode}}</el-tag>

							</el-tooltip>
							<el-tooltip effect="dark" content="Receive Network" placement="bottom-start">
								<el-tag type="info" :closable="false" style="margin-top: 8px" effect="dark" size="mini" :disable-transitions="false">{{order.receiveNetwork}}</el-tag> 
							</el-tooltip>
						</p>
					</el-col>
					

				</el-row>
				<el-row :gutter="20">
				    <el-col :span="8" :offset="0">
						<p class="font-text">Send</p>
					</el-col>
					<el-col :span="16" :offset="0">
						<p class="font-text">
							<h3>{{order.depositCoinAmt}} {{order.depositCoinCode}}</h3>
						</p>

					</el-col>
				</el-row>

				
				<el-row :gutter="20">
					<el-col :span="8" :offset="0">
						<p class="font-text">To Address:</p>
					</el-col>
					<el-col :span="16" :offset="0"><p class="font-text">{{order.bank_address}}
						
						<el-tooltip effect="dark" :content="tooltip_content" placement="bottom-start">
							<el-link type="primary" icon="el-icon-document-copy" :loading="false" v-clipboard:copy="order.bank_address" v-clipboard:success="onCopy" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Copy</el-link>
						</el-tooltip>
					</p>
				</el-col>


			</el-row>
			<el-row v-if="(bank.tag || '').length > 0" :gutter="20">
				<el-col :span="8" :offset="0">
					<p class="font-text">Tag:</p>
				</el-col>
				<el-col :span="16" :offset="0"><p class="font-text">{{bank.tag}}</p></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="16" :offset="7" align="left">
					
					<vue-qrcode v-if="order.bank_address" :value="order.bank_address " />
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="8" align="left" :offset="0">
					<p class="font-text">Order ID:</p>
				</el-col>
				<el-col :span="16" :offset="0">
					<p class="font-text">{{order.bank_order_id}}</p>
				</el-col>
			</el-row>
			<el-row v-if="(order.transaction.length === 0)"  :gutter="20">
				<el-col :span="8" align="left" :offset="0">
					<p class="font-text">Time:</p>
				</el-col>
				<el-col v-if="order.transaction.length === 0" :span="!isMobile ? 4 : 16" :offset="0">
					<p class="font-text">{{convert_time}}</p>

				</el-col>
				
				
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8" :offset="0">
					<p class="font-text">Status:</p>
				</el-col>
				<el-col :span="16" :offset="0">
					<el-tag class="blink_me" style="margin-top: 10px;font-size: 14px;font-weight: bold" type="warning" :closable="false" effect="dark" v-if="(order.status === null) && (order.transaction.length === 0)" size="large" :disable-transitions="false">Waiting for deposit ...</el-tag>

					<el-tag  v-if="(order.status === null) && (order.transaction.length > 0)"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="primary" :closable="false" effect="dark" size="large" :disable-transitions="false">Deposit successfully</el-tag>
					
					<el-tag class="blink_me" v-if="(order.status === null) && (order.transaction.length > 0)"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="warning" :closable="false" effect="dark" size="large" :disable-transitions="false">Waiting for withdraw ...</el-tag>
					
					<el-tag v-if="order.status === false"  style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="danger" :closable="false" effect="dark" size="large" :disable-transitions="false">Failed</el-tag>



					<el-tag v-if="(order.status === true) && (order.transaction.length > 0)"   style="margin-top: 10px;font-size: 14px;font-weight: bold;margin-right: 10px" type="success" :closable="false" effect="dark" size="large" :disable-transitions="false">Withdraw successfully</el-tag>


					
				</el-col>
			</el-row>
			
			<br>
			<el-row :gutter="20">
				<el-col :span="24" :offset="0">
					<el-alert type="info" closable :center="false" effect="light">
						<template slot="title">
							Alert: <br>
							1. Please initiate a single transfer, we will only monitor the first transfer.  <br>
							2. If you want to cancel order, Please click X in popup to cancel order <br>
							3. The network fees and execution price depend on the market condition, you may get a different rate when the transaction is complete <br>
							4. Estimated arrival: 5-30 minutes, please be patient  <br>
						</template>
					</el-alert>

				</el-col>
			</el-row>
			
		</el-dialog>


	</el-col>
</el-row>
</template>
<script>
	import { isMobile } from 'mobile-device-detect';

	function setCookie(cname, cvalue, exdays = 100000) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};
	function deleteCookie(name) { setCookie(name, ''); }
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
		return "";
	};
	function randomNumber(min, max){
		const r = Math.random()*(max-min) + min
		return Math.floor(r)
	};
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	import VueQrcode from 'vue-qrcode'
	export default {
		components: {
			VueQrcode,
		},
		data(){
			
			return {
				isMobile:isMobile,
				info_show:false,
				confirm_loading:false,
				loading_exchange:false,
				list_coin:[
				{name:'HUSD(HECO)',value:'HUSD(HECO)'},
				{name:'USDT(BSC)',value:'USDT(BSC)'},
				{name:'USDT(EOS)',value:'USDT(EOS)'},
				{name:'USDT(ERC20)',value:'USDT(ERC20)'},
				{name:'USDT(ONNI)',value:'USDT(ONNI)'},
				{name:'USDT(TRON)',value:'USDT(TRON)'}

				],
				
				tooltip_content:'Copy to clipboard',
				ruleForm:{
					fromAddress:[{required:false,message:'Bạn chưa nhập địa chỉ gửi',trigger:'blur'}],
					depositCoinAmt:[{required:false,message:'Bạn chưa nhập số tiền',trigger:'change'}],
					destinationAddr:[{required:false,message:'Bạn chưa nhập địa chỉ người nhận',trigger:'blur'}],
					

				},
				formData:{
					fromAddress:'',
					depositCoinCode:'USDT',
					receiveCoinCode:'USDT',
					depositNetwork:'BSC',
					receiveNetwork:'HECO',
					depositCoinAmt:undefined,
					receiveCoinAmt:undefined,
					destinationAddr:'',
					addressTag:'',
					depositFloor:null,
					receiveFloor:null			
				},
				loading:false,
				total:parseInt(Date.now().toString().slice(5,12)),
				addressTag_Show:false,
				list:[
				// WAVES , LUNA ,FTM , SOL , EOS
				{network:'HECO',coin:['USDT','UNI','LINK'],floor:['huobi']},
				{network:'BSC',coin:['USDT','UNI','LINK'],floor:['binance']},
				{network:'ETH',coin:['USDT','UNI','LINK'],floor:['binance','huobi']},
				{network:'TRX',coin:['USDT'],floor:['binance','huobi']},
				{network:'WAVES',coin:['WAVES'],floor:['binance']},
				{network:'LUNA',coin:['LUNA'],floor:['binance']},
				{network:'FTM',coin:['FTM'],floor:['binance']},
				{network:'SOL',coin:['SOL'],floor:['binance']},
				{network:'EOS',coin:['EOS'],floor:['binance']},
				],
				discount:0,
				bank:{
					address:'',
					tag:'',
					orderid:'',
					config_id:null
				},
				time:0,
				history:[],
				list_order:[],
				amount_old:-1
			}
		},
		computed:{
			...mapState('layout',['from_address']),
			
			order(){
				let _ = this;
				let order_val = this.list_order[0] || {transaction:[]};
				//order_val.transaction = order_val.transaction.filter(({amount})=>amount >= _.formData.receiveCoinAmt);
				return order_val;
			},
			list_network(){
				return this.list.map(({network})=>network);
			},
			list_asset_receive(){
				let _ = this;
				return this.list.find(({network})=>network === _.formData.receiveNetwork).coin;
			},
			list_asset_deposit(){
				let _ = this;
				return this.list.find(({network})=>network === _.formData.depositNetwork).coin;
			},
			use_floor(){
				let _ = this;
				let floor_deposit = this.list.find(({network})=>network === _.formData.depositNetwork).floor;
				let floor_receive =  this.list.find(({network})=>network === _.formData.receiveNetwork).floor;
				return floor_deposit.filter(value => floor_receive.includes(value));
			},
			
			convert_time(){
				let second = Math.floor(this.time/1000);
				let minute = Math.floor(second/60);
				return minute+' m '+(second - (minute*60))+' s'

			}


		},
		created:async function(){

			this.formData.fromAddress = this.from_address;
			await Promise.all([this.GetDiscount(),this.GetOrder()]);
		},
		mounted:function(){
			let _ = this;
			setInterval(function(){
				_.total = parseInt(Date.now().toString().slice(5,12));
			},randomNumber(5,15)*1000)
		},
		methods:{
			list_floor(depositNetwork,depositCoinCode){
				let _ = this;
				let list = this.list.filter(({network,coin})=>(network === depositNetwork) && coin.includes(depositCoinCode)).map(e=>e.floor);
				return [].concat.apply([], list);
				
			},

			WaitTime:function(time){
				return new Promise(resolve=>{

					setTimeout(function(){
						return resolve(time)
					},time)
				})
			},
			GetOrder:async function(id = null){
				id = id ? id : getCookie('orderid');
				
				if(id.trim().length > 0){
					try{
						let {data} = await this.$axios.get('/api/order/'+id);

						this.list_order = data;
						this.info_show = true;
						this.time = (data.createdAt + 1800000) - Date.now();

						this.Update_Time();
						this.bank.orderid = data.bank_order_id;
						await this.UpdateOrder();
					}catch(error){

					}
					
				};
				return;

				
			},
			GetDiscount:async function(){
				let {data} = await this.$axios.post('/api/coin/discount');
				this.discount = data.discount;
			},
			Update_Time:async function(){

				await this.WaitTime(1000);
				
				if(this.time > 0) {
					this.time-=1000;
					return await this.Update_Time();
				}else{
					let _ = this;
					if(_.info_show && !this.order.status){
						this.$alert('This order is Canceled.Waiting time was over 30 minutes. </br>Please try again !', 'Timeout Waiting', {
							confirmButtonText: 'OK',
							type: 'error',
							roundButton:false,
							center: true,
							dangerouslyUseHTMLString: true
						}).then(async ()=>{
							await _.remove_order(this.order.id);
							deleteCookie('orderid');
							
							_.list_order = [];
							_.formData = {
								fromAddress:'',
								depositCoinCode:'USDT',
								receiveCoinCode:'USDT',
								depositNetwork:'BSC',
								receiveNetwork:'HECO',
								depositCoinAmt:undefined,
								receiveCoinAmt:undefined,
								destinationAddr:'',
								depositFloor:null,
								receiveFloor:null			
							};
							_.bank = {
								address:'',
								tag:'',
								orderid:'',
								config_id:null
							};
							_.info_show = false;

						}).catch(async ()=>{

						})
					}
					
					return;
				}
				

			},
			real_receive:async function(){
				this.formData.depositCoinAmt = (this.formData.depositCoinAmt || '').toString().replace(/,/g, ".")
				if((this.formData.depositCoinAmt || '').includes('.')){
					this.formData.depositCoinAmt = this.formData.depositCoinAmt.split('.')[0] + '.'+ this.formData.depositCoinAmt.split('.')[1].slice(0,4).replace(/\./g,'');
				}
				
				
				let coin = parseFloat((this.formData.depositCoinAmt || '').toString().replace(/,/g,'.'));
				if(coin !== this.amount_old) {
					this.amount_old = coin;
					
					let random = (100000 - (this.discount*1000) - 300 + (Math.floor(Math.random() * 100)))/100000;

					if((this.formData.depositCoinCode === 'USDT') && (this.formData.receiveCoinCode === 'USDT')){
						return this.formData.receiveCoinAmt = coin*random
					}else if((this.formData.depositCoinCode !== 'USDT') && (this.formData.receiveCoinCode === 'USDT')){
						let price_deposit_coin = await this.GetPrice(this.formData.depositCoinCode);
						return this.formData.receiveCoinAmt = coin*price_deposit_coin*random
					}else if((this.formData.depositCoinCode === 'USDT') && (this.formData.receiveCoinCode !== 'USDT')){
						let price_receive_coin = await this.GetPrice(this.formData.receiveCoinCode);
						return this.formData.receiveCoinAmt = coin*(1/price_receive_coin)*random
					}else if((this.formData.depositCoinCode !== 'USDT') && (this.formData.receiveCoinCode !== 'USDT')){
						let price_deposit_coin = await this.GetPrice(this.formData.depositCoinCode);
						let price_receive_coin = await this.GetPrice(this.formData.receiveCoinCode);
						return  this.formData.receiveCoinAmt = coin*(price_deposit_coin/price_receive_coin)*random
					}
				}
				
			},
			
			set_receive_network:async function(){
				this.formData.receiveCoinCode = this.formData.depositCoinCode;
				let _ = this;
				this.formData.receiveNetwork = this.list.find(({coin})=>coin.includes(_.formData.receiveCoinCode)).network;
			},
			set_receive:async function(){

				return await Promise.all([this.real_receive(),this.set_receive_network()])
			},
			set_deposite:function(){
				let _ = this;
				let list_coin = this.list.find(({network})=>network === _.formData.depositNetwork).coin;
				if(!list_coin.includes(this.formData.depositCoinCode)) this.formData.depositCoinCode = list_coin[0];
				this.set_receive();
			},
			
			Get_Address_Binance:async function(floor){
				
				let {data} = await this.$axios.post('/api/coin/binance/address',{coin:this.formData.depositCoinCode,network:this.formData.depositNetwork,floor});
				return this.bank = data;
			},
			Get_Address_huobi:async function(floor){
				let {data} = await this.$axios.post('/api/coin/huobi/address',{coin:this.formData.depositCoinCode,network:this.formData.depositNetwork,floor});
				return this.bank = data;
			},
			CreateOrder:async function(){
				let info_order = this.formData;
				let bank_address = this.bank.address;
				let bank_tag = this.bank.tag;
				let bank_order_id = this.bank.orderid;
				let config_id = this.bank.config_id;
				let {data} = await this.$axios.post('/api/order',{...info_order,bank_address,bank_tag,bank_order_id,config_id});
				return data;
			},
			GetPrice:async function(coin){
				let {data} = await this.$axios.post('/api/coin/price',{coin});
				return data;
			},
			UpdateOrder:async function(){
				let {data} = await this.$axios.get('/api/order?bank_order_id='+this.bank.orderid);
				if(this.info_show) this.list_order = data;
				let check_status = data.find(({status})=>status);
				if(check_status){
					this.$alert('Withdraw Successfully !', 'Success', {
						confirmButtonText: 'OK',
						type: 'success',
						roundButton:true,
						center: false,
						dangerouslyUseHTMLString: false
					}).then(async ()=>{
						deleteCookie('orderid');
					}).catch(async ()=>{

					});
					this.time = 0;
					return;
				}
				await this.WaitTime(3000);
				if(this.info_show) return await this.UpdateOrder();
				if(!this.info_show) return;
				
			},
			Open_confirm:async function(){
				try{
					this.loading_exchange = true;
					if(this.formData.fromAddress.trim().length < 2) throw 'Please enter From Address';
					if(!this.formData.depositCoinAmt) throw 'Please enter Amount of coin';
					if(this.formData.destinationAddr.trim().length < 2) throw  'Please enter Destination Address';
					if(this.addressTag_Show) if(this.formData.addressTag.trim().length < 2) throw 'Please enter Address Tag';

					if(this.use_floor.length === 0){
						
						if(this.list_floor(this.formData.depositNetwork,this.formData.depositCoinCode).includes("binance")){
							this.formData.depositFloor = 'binance';
							
							await this.Get_Address_Binance('binance');

						}else if(this.list_floor(this.formData.depositNetwork,this.formData.depositCoinCode).includes('huobi')){
							this.formData.depositFloor = 'huobi';

							await this.Get_Address_huobi('huobi');
						}else{
							throw false
						}



						if(this.list_floor(this.formData.receiveNetwork,this.formData.receiveCoinCode).includes("binance")){
							
							this.formData.receiveFloor = 'binance';
							
							

						}else if(this.list_floor(this.formData.receiveNetwork,this.formData.receiveCoinCode).includes('huobi')){
							this.formData.receiveFloor = 'huobi';
							
						}else{
							throw false
						}

					}else{

						if(this.use_floor.includes('binance')){
							await this.Get_Address_Binance('binance');
							this.formData.depositFloor = 'binance';
							this.formData.receiveFloor = 'binance';


						}else if(this.use_floor.includes('huobi')){
							await this.Get_Address_huobi('huobi');
							this.formData.depositFloor = 'huobi';
							this.formData.receiveFloor = 'huobi';
						}else{
							throw false;
						}


					};
					this.time = 1800000;
					this.Update_Time();
					let order_data = await this.CreateOrder();
					setCookie('orderid',order_data.id);
					await this.GetOrder(order_data.id);

					
					
					this.loading_exchange = false;
					
					this.UpdateOrder();
					
				}catch(error){
					
					this.loading_exchange = false;
					this.$message({type:'error',message:error})
				}
				
				return;
				
			},
			onCopy:function(){

				this.$message({type:'primary',message:'Copied !'})
			},
			remove_order:async function(id){
				return await this.$axios.delete('/api/order/'+id);
			},
			change_network:async function(){
				this.addressTag_Show = this.formData.receiveNetwork === 'EOS';
				if(!this.list_asset_receive.includes(this.formData.receiveCoinCode)) this.formData.receiveCoinCode = this.list_asset_receive[0];
				this.real_receive();

			},
			close_order:function(){
				let _ = this;
				if(this.order.status){
					this.info_show = false;
					this.list_order = [];
					this.formData = {
						fromAddress:'',
						depositCoinCode:'USDT',
						receiveCoinCode:'USDT',
						depositNetwork:'BSC',
						receiveNetwork:'HECO',
						depositCoinAmt:undefined,
						receiveCoinAmt:undefined,
						destinationAddr:'',
						depositFloor:null,
						receiveFloor:null			
					};
					this.bank = {
						address:'',
						tag:'',
						orderid:''
					};
					deleteCookie('orderid');
				}else{
					this.$confirm('Are you sure to cancel this order: '+_.bank.orderid+' ?')
					.then(async x => {
						
						for(let {id} of _.list_order){
							await _.remove_order(id);
							
							deleteCookie('orderid')
							_.time = 0;

						}

						_.list_order = [];
						_.formData = {
							fromAddress:'',
							depositCoinCode:'USDT',
							receiveCoinCode:'USDT',
							depositNetwork:'BSC',
							receiveNetwork:'HECO',
							depositCoinAmt:undefined,
							receiveCoinAmt:undefined,
							destinationAddr:'',
							depositFloor:null,
							receiveFloor:null			
						};
						_.bank = {
							address:'',
							tag:'',
							orderid:''
						};
						_.info_show = false;
					})
					.catch(_ => {});
				}
			}

		}
	}
</script>
<style>
h1{
	color:#2975ba;
}
.icon-down{
	font-size: 30px;
	color:#e6a33b;
}
.form-pro{
	border: 1px solid #e6e6e6;
	border-radius: 30px;
	background-color: white;
	margin-top: 20px;
	padding: 20px 40px;
	box-shadow: 0px -1px 20px #e0e0e0;
}
.form-pro-mobile{
	border: 1px solid #e6e6e6;
	border-radius: 30px;
	background-color: white;
	margin-top: 20px;
	padding: 10px 20px;
	box-shadow: 0px -1px 20px #e0e0e0;
}
.font-text{
	font-size:16px;
	font-weight: bold;
}
.el-alert .el-alert__description{
	font-size:14px;
}
.blink_me {
	animation: blinker 1s linear infinite;
}

@keyframes blinker {
	50% {
		opacity: 0;
	}
}
</style>