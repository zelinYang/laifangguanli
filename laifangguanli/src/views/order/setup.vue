<template>
	<div>
		{{form}}
		<el-form label-width="100px">
			<el-form-item label="订单步骤设置">
				<el-input v-model="form.exinfo.order.step_1_title" style="width: 100px; margin-right: 10px;"></el-input>
				<el-input v-model="form.exinfo.order.step_2_title" style="width: 100px; margin-right: 10px;"></el-input>
				<el-input v-model="form.exinfo.order.step_3_title" style="width: 100px; margin-right: 10px;"></el-input>
				<el-input v-model="form.exinfo.order.step_4_title" style="width: 100px; margin-right: 10px;"></el-input>
			</el-form-item>
			<el-form-item label=""> 
				<el-button-group>
				  <el-button type="primary" @click="Save()" :loading="loading">保存</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

	</div>
</template>


<script>
	export default {
		data() {
			return {
				loading:false,
				
			};
		},

		mounted() {
			this.ReLoad();
		},
		methods: {
			ReLoad(){
			},
			Save(){
				this.loading = true;
				this.axios.post("/shop/admin_api/set_system_info", {info: this.form}).then((res) => {
					if(res.data.errcode==0) this.$message({message: '修改成功', type: 'success'});
				    this.loading = false;
				});
			}
		},
		computed: {
			form:function(){
				var tmp = {exinfo:{order:{step_1_title:'下单', step_2_title:'已发货', step_3_title:'已收货', step_4_title:'完结'}}}
				//return tmp;
				if (this.$store.state.sys_info.hasOwnProperty('order')) {
					if (this.$store.state.sys_info.order.hasOwnProperty('step_1_title')) tmp.order.step_1_title = this.$store.state.sys_info.order.step_1_title;
					if (this.$store.state.sys_info.order.hasOwnProperty('step_2_title')) tmp.order.step_2_title = this.$store.state.sys_info.order.step_2_title;
					if (this.$store.state.sys_info.order.hasOwnProperty('step_3_title')) tmp.order.step_3_title = this.$store.state.sys_info.order.step_3_title;
					if (this.$store.state.sys_info.order.hasOwnProperty('step_4_title')) tmp.order.step_4_title = this.$store.state.sys_info.order.step_4_title;
				}
				return tmp;
				//this.$store.state.sys_info;
			}
		},
		components: { }
	}
</script>