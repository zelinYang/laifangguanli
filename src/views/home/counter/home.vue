<template>
	<div>
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>报表管理</el-breadcrumb-item>
				<el-breadcrumb-item>所有报表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</div>
</template>


<script>
	export default {

		data() {
		  return {
		    loading: false,
		    info:{}
		  }
		},
		mounted: function(){
			ReLoad();
		},
		methods: {


			ReLoad: function(){
				this.loading = true;
				this.axios.post("").then((res) => {
				    this.info = res.data.data.title;
				    this.loading = false;
				});
			},


		}

	}
</script>
