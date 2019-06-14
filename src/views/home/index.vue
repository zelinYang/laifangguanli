<template>
	<div style="">
		<div style="text-align: right; margin: 10px 0; width:1200px;">
			<el-button @click="ReLoad()" icon="el-icon-refresh" circle></el-button>
		</div>


		<div style="position: relative; text-align: center; width:1100px; margin: 0 auto;">
			  <template v-for="item in info.counters">
			  	<div style="width: 180px; margin: 5px; display: inline-block;"><el-card shadow="hover" class="c"><p>{{item.value}}</p><p>{{item.name}}</p></el-card></div>
			  </template>
		</div>

		<div style="text-align: center;">
			<template v-for="item in info.bars">
			  <chart ref="chart" :options="bar(item)" :auto-resize="false" style="width:1200px; margin: 10px auto;"></chart>
			  <div class="title">{{item.name}}</div>
			</template>
		</div>


	</div>
</template>






<script>
	export default {

		data() {
		  return {
		    loading: false,
		    info:{counters:[]},
			counter: [
				{name: "年访客总人数", value: 868},
				{name: "公司员工", value: 520},
				{name: "昨天新增会员", value: 0},
				{name: "本月新增会员", value: 5},
				{name: "最近7天新增", value: 1},
				{name: "最近30天新增", value: 16},
				{name: "今天订单数", value: 0},
				{name: "最近30天订单数", value: 10}
			]
		  }
		},
		mounted: function(){
			this.ReLoad();
		},
		methods: {


			ReLoad: function(){
				this.loading = true;
				this.axios.post("/shop/admin_api/get_base_data").then((res) => {

				    this.info = res.data.data;
				    this.loading = false;
				    this.$message({message: '刷新成功', type: 'success'});
				});
			},
	      bar: function(item){
	        return {
	          title: { text:'', },
	          tooltip: {},
	          xAxis: { type: 'category', axisLabel: { interval:0, rotate:45 } },
	          yAxis: {},
	          series: [
	            {
	              type: 'bar',
	              data:item.data,
	              itemStyle:{normal:{color:'#409EFF'}},
	            }
	          ]
	      	};
	      },
	      pie: function(item){
	        return {
	            title: { text:'', },
	            tooltip: {formatter: "{b}<br>数量：{c}<br>占比：{d}%"},
	          series : [
	              {
	                  type: 'pie',
	                  radius: ['35%', '70%'],
	                  data:item.data,
	              }
	          ]
	      	}
	      }


		},

	}
</script>





<style scoped>
	.c {background-color: #409EFF; color: #bddeff;font-size: 14px; text-align: center;}
	.c p:first-child {font-size: 36px; color: #fff;}
</style>
