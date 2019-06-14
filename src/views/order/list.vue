<template>
	<div>
		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
				<el-breadcrumb-item>所有订单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

	    <div style="text-align: right; margin: 20px 0;">
	      <el-button icon="el-icon-setting" @click="dialog_setup_showing=true">设置</el-button>
	    </div>


		<el-tabs type="border-card">
			<el-tab-pane label="所有订单">
				<OrderList customer_id=""></OrderList>
			</el-tab-pane>
		</el-tabs>


		<el-dialog title="设置" :visible.sync="dialog_setup_showing" width="800px">
		    <Setup></Setup>
		</el-dialog>

	</div>
</template>


<script>
	
	import OrderList from './list-block.vue'
	import Setup from './setup.vue';

	export default {
		data() {
			return {
				dialog_setup_showing:false,
			};
		},

		mounted() {
			this.ReLoad();
		},
		methods: {
			ReLoad(){
			},
		},
		computed: { },
		components: { OrderList,Setup }
	}
</script>