<template>
	<div style="width: 99%">
		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>人员管理</el-breadcrumb-item>
				<el-breadcrumb-item>所有出入人员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<el-tabs type="border-card">
			<el-tab-pane label="公司人员/常驻">
				<OrderList customer_id=""></OrderList>
			</el-tab-pane>
			<el-tab-pane label="短期人员">
				<Xieli></Xieli>
			</el-tab-pane>
			<el-tab-pane label="临时人员">
				<Rusi></Rusi>
			</el-tab-pane>
		</el-tabs>


		<el-dialog title="设置" :visible.sync="dialog_setup_showing" width="800px">
		    <Setup></Setup>
		</el-dialog>

	</div>
</template>


<script>

	import OrderList from './list-block.vue'
	import Xieli from './tableList/xieliTable.vue'
	import Rusi from './tableList/rusi.vue'
	import Ruchang from './tableList/ruchang.vue'
	import Shigong from './tableList/shigong.vue'
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
		components: { OrderList,Setup,Xieli,Rusi,Ruchang,Shigong }
	}
</script>
