<template>
	<div>
		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>系统</el-breadcrumb-item>
				<el-breadcrumb-item>设置</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<el-tabs type="border-card">
			<el-tab-pane label="基本设置">

				<el-form label-width="100px" style="width: 600px;">
					<el-form-item label="系统名称">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label=""> 
						<el-button-group>
						  <el-button type="primary" @click="Save()" :loading="loading">保存</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				form:{title:''}
			};
		},

		mounted() {
			this.ReLoad();
		},
		methods: {
			ReLoad(){
			},
			Save(){

			}
		},
		computed: { },
		components: { }
	}
</script>
