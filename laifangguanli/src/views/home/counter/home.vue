<template>
	<div>
		
		<p style="text-align: center;margin: 10em 0; font-size: 14px;text-align: center;">暂无可分析数据</p>
		
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
				this.axios.post("/shop/admin_api/get_base_data").then((res) => {
				    this.info = res.data.data.title;
				    this.loading = false;
				});
			},
		    

		}

	}
</script>