<template>
	<div>

		<el-steps :active="parseInt(info.progress_status)+1" finish-status="success"  align-center style="margin-bottom: 20px">
		  <el-step title="待处理" ></el-step>
		  <el-step title="施工中" ></el-step>
		  <el-step title="已完工" ></el-step>
		  <el-step title="验收" ></el-step>
		</el-steps>

					<div style="text-align: center; position: absolute; width: 160px; left: 0px; padding: 10px;">
						<i class="el-icon-edit-outline" style="font-size: 100px;"></i>
						<p><el-button type="" @click="Reload()">刷新</el-button></p>
					</div>
				
		      		<el-tabs v-model="tab_active_name" style="padding-left: 160px;" tab-position="top">
		      		  <el-tab-pane label="基本信息" name="tab-base" v-loading="loading">

		      		  	  <div style="margin: 0px 0; width: 660px; height:80%; min-height: 660px;">
						      <el-form :model="info" label-width="100px" style="width: 460px;">
								      	<el-form-item label="订单编号"> {{info.id}} </el-form-item>
								      	<el-form-item label="名称"> {{info.title}} </el-form-item>
								      	<el-form-item label="下单时间"> {{info.create_time}} </el-form-item>
								      	<el-form-item label="支付状态"> {{info.pay_status_title}} </el-form-item>
								      	<el-form-item label="支付时间"> {{info.pay_time}} </el-form-item>
								      	<el-form-item label="金额">
								      		<el-input-number v-model="info.money" :min="0.01" :max="999999" label="金额" :disabled="info.pay_status != 0"></el-input-number>
								      		<p>在订单被支付之前，可以修改金额。</p>
								      	</el-form-item>
								      	<el-form-item label="进展">
								      		<el-select v-model="info.progress_status" placeholder="请选择">
								      		  <el-option
								      		    v-for="item in options"
								      		    :key="item.value"
								      		    :label="item.label"
								      		    :value="item.value">
								      		  </el-option>
								      		</el-select>
								      	</el-form-item>
								      	<el-form-item label="">
								      		<el-button-group>
								      		  <el-button type="primary" @click="Save()">确定提交改动</el-button>
								      		</el-button-group>
								      	</el-form-item>
						      </el-form>
					      </div>
					  </el-tab-pane>


					  <el-tab-pane label="客户信息" name="tab-userinfo" v-loading="loading">
						      <el-form :model="info" label-width="100px" style="width: 460px;">

								      	<el-form-item label="客户"> {{info.contacts.username}} </el-form-item>
								      	<el-form-item label="联系电话"> {{info.contacts.mobile}} </el-form-item>
								      	<el-form-item label="省市"> {{info.contacts.province}} {{info.contacts.city}} </el-form-item>
								      	<el-form-item label="地址"> {{info.contacts.address}} </el-form-item>

						      </el-form>
					  </el-tab-pane>

					<!--
					  <el-tab-pane label="订单商品内容" name="tab-goodslist" style="min-height: 500px;">
					  		<GoodsList :order_info="info" v-if="tab_active_name=='tab-goodslist'"></GoodsList>
					  </el-tab-pane> -->


					  <el-tab-pane label="进展" name="tab-progress" style="min-height: 500px;">
					  		<Progress :order_info="info" v-if="tab_active_name=='tab-progress'"></Progress>
					  </el-tab-pane>

						<!--
					  <el-tab-pane label="催单记录" name="tab-urge" style="min-height: 500px;">
					  		<Urge :order_info="info" v-if="tab_active_name=='tab-urge'"></Urge>
					  </el-tab-pane> -->


					  <el-tab-pane label="投诉记录" name="tab-complaint" style="min-height: 500px;">
					  		<Complaint :order_info="info" v-if="tab_active_name=='tab-complaint'"></Complaint>
					  </el-tab-pane>


					  <el-tab-pane label="评客户评价" name="tab-comment" style="min-height: 500px;">
					  		<Comment :order_info="info" v-if="tab_active_name=='tab-comment'"></Comment>
					  </el-tab-pane>



					</el-tabs>

					

					{{info}}
	</div>
</template>




<script>
	import GoodsList from './goodslist/list-block.vue'
	import Progress from './progress/list-block.vue'
	import Urge from './urge/list-block.vue'
	import Complaint from './complaint/list-block.vue'
	import Comment from './comment/list-block.vue'

	export default {
		props: {
			id:'',
			
		},
		  data() {
		    return {
		      loading:false,
		      tab_active_name:'tab-base',
		      info:{},

		      options: [{ value: '0', label: '待处理' }, 
		      			{ value: '1', label: '施工中' }, 
		      			{ value: '2', label: '已完工' }, 
		      			{ value: '3', label: '验收' },
		      			],
		    };
		  },

		  mounted(){

		  },
		  methods: {
		  		Reload(){
		  			this.loading = true;
		  			this.axios.post("/shop/admin_api/get_order", {order_id: this.id}).then((res) => {
		  				this.info = res.data.data;
		  				this.loading = false;
		  			});
		  		},
				Save(){
					this.loading = true;
					this.axios.post("/shop/admin_api/edit_order", this.info ).then((res) => {
						this.Reload();
						this.$message({message: '修改成功！', type: 'success'});
						this.loading = false;
					});
				}
		  },
		  computed: {},
		  components: { GoodsList,Progress,Urge,Complaint,Comment },
		  watch: {
		  		id:{
		  			immediate:true,
		  			handler:function(){
		  				this.tab_active_name='tab-base';
		  				this.Reload();
		  			}
		  		}
		  },
	}
</script>