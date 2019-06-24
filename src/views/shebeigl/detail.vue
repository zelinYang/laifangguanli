<template>
	<div style="width: 100%;">
					<div style="text-align: center; position: absolute; width: 160px; left: 0px; padding: 10px;">
						<img :src="info.avatar_url ? info.avatar_url : require('@/assets/user.png')" style="width: 100px;height: 100px; border-radius:50%" onerror="this.src='/static/img/user.png';">

						<p><el-button type="" @click="ReLoad()">刷新</el-button></p>
					</div>

				<div style="padding-left: 160px; min-height: 600px;">
		      		<el-tabs v-model="tab_active_name" type="border-card">
		      		  <el-tab-pane label="基本信息" name="tab-base" v-loading="loading">
		      		  	  <div style="width: 660px; height:80%; min-height: 660px;">
						      <el-form :model="info" label-width="100px" style="width: 460px;">
								      	<el-form-item label="卡号">{{info.sn}}</el-form-item>
								      	<el-form-item label="姓名"> <el-input v-model="info.username"></el-input> </el-form-item>
								      	<el-form-item label="会员类型">
								      		<el-select v-model="info.vip_vipcard_id" placeholder="请选择活动区域">
								      		  <el-option v-for="option in org.vipcards" v-bind:value="option.id" v-bind:label="option.title" :disabled="(option.status==0)">{{option.title}}</el-option>
								      		</el-select>
								      	</el-form-item>
								      	<el-form-item label="手机号"> <el-input v-model="info.mobile"></el-input> </el-form-item>
								      	<el-form-item label="电子邮箱"> <el-input v-model="info.email"></el-input> </el-form-item>
								      	<el-form-item label="加入时间"> {{info.create_time}}</el-form-item>
								      	<el-form-item label="生日"> <el-date-picker v-model="info.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker> </el-form-item>
								      	<!--<el-form-item label="家庭地址"> <el-input v-model="info.address_home"></el-input> </el-form-item>-->
								      	<!--<el-form-item label="工作地址"> <el-input v-model="info.address_work"></el-input> </el-form-item>-->
								      	<el-form-item label="状态"> <el-switch v-model="info.status" :active-value="1" :inactive-value="0"></el-switch> </el-form-item>
								      	<!-- <el-form-item label="经办人"> <el-input v-model="info.username"></el-input> </el-form-item> -->
								      	<el-form-item label="备注"> <el-input type="textarea" :rows="3" v-model="info.remark"></el-input> </el-form-item>
								      	<el-form-item label="分销奖励">
								      		<el-input-number v-model="info.exinfo.award_order" :precision="0" :step="10" :max="999999999"></el-input-number>
								      		<p>该用户所带来的分销下单自动产生的奖励金额</p>
								      	</el-form-item>
								      	<el-form-item label="">
								      		<el-button-group>
								      		  <el-button type="primary" @click="Save()" :loading="loading">保存修改</el-button>
								      		</el-button-group>
								      	</el-form-item>
						      </el-form>
					      </div>

					      {{info}}
					</el-tab-pane>


					  <!-- 微信信息 -->
					  <el-tab-pane label="微信" name="tab-weixin" style="min-height: 500px;">
						  	<el-form label-width="100px" style="width: 460px;" v-if="info.exinfo.wx_info">
						  	      <el-form-item label="OpenID">{{info.exinfo.wx_info.openid}}</el-form-item>
						  	      <el-form-item label="微信昵称">{{info.exinfo.wx_info.nickname}}</el-form-item>
						  	      <el-form-item label="语言">{{info.exinfo.wx_info.language}}</el-form-item>
						  	      <el-form-item label="性别">{{info.exinfo.wx_info.sex}}</el-form-item>
						  	      <el-form-item label="国家">{{info.exinfo.wx_info.country}}</el-form-item>
						  	      <el-form-item label="省">{{info.exinfo.wx_info.province}}</el-form-item>
						  	      <el-form-item label="城市">{{info.exinfo.wx_info.city}}</el-form-item>
						  	      <el-form-item label="备注">{{info.exinfo.wx_info.remark}}</el-form-item>
						  	</el-form>
						  	<el-alert title="用户的微信资料将在用户再次使用服务的时候自动更新" type="info"></el-alert>
					  </el-tab-pane>


					  <!--订单记录 -->
					  <el-tab-pane label="订单" name="tab-xiaofei">
					  		<OrderList :customer_id="id" v-if="tab_active_name=='tab-xiaofei'"></OrderList>
					  </el-tab-pane>



					  <!-- 充值
					  <el-tab-pane label="充值" name="tab-chongzhi">
					  		<DepositList :customer_id="id" v-if="tab_active_name=='tab-chongzhi'"></DepositList>
					  </el-tab-pane> -->


					  <!-- 积分 -->
					  <el-tab-pane label="积分" name="tab-jifen">
					  		<PointList :customer_id="id" v-if="tab_active_name=='tab-jifen'"></PointList>
					  </el-tab-pane>



					  <el-tab-pane label="团队" name="tab-subuser">
					  		<SubuserList :customer_id="id" v-if="tab_active_name=='tab-subuser'"></SubuserList>
					  </el-tab-pane>



					  <el-tab-pane label="奖励" name="tab-award">

					  		<AwardList :customer_id="id" v-if="tab_active_name=='tab-award'"></AwardList>
					  </el-tab-pane>



					  <el-tab-pane label="礼券" name="tab-voucher">
					  		<VoucherList :customer_id="id"></VoucherList>
					  </el-tab-pane>



					  <!-- 动作记录
					  <el-tab-pane label="行为" name="tab-action">
					  		<ActionList :customer_id="id" v-if="tab_active_name=='tab-action'"></ActionList>
					  </el-tab-pane> -->



					</el-tabs>

				</div>


	</div>
</template>




<script>
	import OrderList from '@/views/order/list-block.vue'
	import PointList from './point/list-block.vue'
	import DepositList from './deposit/list-block.vue'
	import SubuserList from './subuser/list-block.vue'
	import AwardList from './award/list-block.vue'
	import ActionList from './action/list-block.vue'
	import VoucherList from './voucher/list-block.vue'

	export default {
		props: { id:'' },
		  data() {
		    return {
		      edit_mode: false,
		      loading:false,
		      tab_active_name:'tab-base',
		      info:{},
		      org:{},
		      edit_data:{},
		    };
		  },

		  mounted(){

		  },
		  methods: {
		  	Save(){
		  		this.loading = true;
		  		this.axios.post("/customer/admin_api/save_customer", {user_info: this.info} ).then((res)=>{
		  			this.loading = false;
		  			this.$message({message: '修改成功！', type: 'success'});
		  		});
		  	},
		  	ReLoad(){
		  		this.loading = true;
		  		this.axios.post(this.$store.state.sys.api.coustomer_info, {customer_id: this.id}).then((res) => {
		  			this.info = res.data.data;
		  			this.loading = false;
		  			this.$message({message: '刷新成功', type: 'success'});
		  		});
		  	},

		  	re_load_wx(){
		  	  this.loading = true;
		  	  this.axios.post("/shop/admin_api/reload_wx_userinfo", {openid:this.info.openid}).then((res) => {
		  	      this.loading = false;
		  	      this.ReLoad();
		  	  });
		  	}

		  },
		  computed: {},
		  components: { OrderList,PointList,DepositList,SubuserList,ActionList,AwardList,VoucherList },
		  watch: {
		  		id:{
		  			immediate:true,
		  			handler:function(){
		  				this.tab_active_name='tab-base';
		  				this.ReLoad();
		  			}
		  		}
		  },
	}
</script>
