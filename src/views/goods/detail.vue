<template>
	<div>


					<div style="text-align: center; position: absolute; width: 160px; left: 0px; padding: 10px;">
						<i class="el-icon-goods" style="font-size: 100px;"></i>
					</div>
				
		      		<el-tabs v-model="tab_active_name" style="padding-left: 160px;" tab-position="rights">
		      		  <el-tab-pane label="基本信息" name="tab-base" v-loading="loading">

		      		  	  <div style="margin: 0px 0; width: 660px; height:80%; min-height: 660px;">
						      <el-form :model="info" label-width="100px" style="width: 460px;">
								      	<el-form-item label="订单编号"> {{info.id}} </el-form-item>
								      	<el-form-item label="名称"> {{info.title}} </el-form-item>
								      	<el-form-item label="金额"> {{info.title}} </el-form-item>
								      	<el-form-item label="下单时间"> {{info.title}} </el-form-item>
								      	<el-form-item label="支付状态"> {{info.title}} </el-form-item>
								      	<el-form-item label="支付时间"> {{info.title}} </el-form-item>
								      	<el-form-item label="支付方式"> {{info.title}} </el-form-item>
						      </el-form>
					      </div>
					  </el-tab-pane>




					</el-tabs>


					{{info}}
	</div>
</template>




<script>

	export default {
		props: {
			id:'',
			
		},
		  data() {
		    return {
		      loading:false,
		      tab_active_name:'tab-base',
		      info:{},
		    };
		  },

		  mounted(){

		  },
		  methods: {
		  },
		  computed: {},
		  components: {  },
		  watch: {
		  		id:{
		  			immediate:true,
		  			handler:function(){
		  				this.tab_active_name='tab-base';
		  				this.loading = true;
		  				this.axios.post(this.$store.state.sys.api.coustomer_info, {customer_id: this.id}).then((res) => {
		  					this.info = res.data.data;
		  					this.loading = false;
		  				});
		  			}
		  		}
		  },
	}
</script>