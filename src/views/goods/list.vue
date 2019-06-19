<template>
	<div>
		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>车辆管理</el-breadcrumb-item>
				<el-breadcrumb-item>所有过闸车辆</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<el-tabs type="border-card">
			<el-tab-pane label="内部车辆">
				<GoodsList customer_id=""></GoodsList>
			</el-tab-pane>
			<el-tab-pane label="来访车辆">
				<Wailai></Wailai>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>

	import GoodsList from '@/views/goods/list-block.vue'
	import Wailai from '@/views/goods/wailaichel.vue'

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
		components: { GoodsList,Wailai }
	}
</script>
