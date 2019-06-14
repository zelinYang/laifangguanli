<template>
  <div>
    <div v-if="order_info.star_status == 1">
      <el-rate
      v-model="order_info.star"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>

    <div>
      <p>{{order_info.star_remark}}</p>
      <p>{{order_info.star_time}}</p>
    </div>
  </div>
  <div v-else>尚未评价</div>
</div>
</template>





<script>
    export default {
      props: {
          order_info:{},
      },
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
      components: {  },
      watch: {      },
    }
</script>