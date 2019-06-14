<template>
	<div>
		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<el-tabs type="border-card">
			<el-tab-pane label="所有商品">
				<GoodsList customer_id=""></GoodsList>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>
	
	import GoodsList from '@/views/goods/list-block.vue'

	export default {
		data() {
			return {
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
		components: { GoodsList }
	}
</script>