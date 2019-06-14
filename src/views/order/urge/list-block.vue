<template>
  <div>
    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
      <!-- 按钮 -->
    </el-row>

    <!-- 表格 -->
    <el-table :data="order_info.urge">
      <el-table-column prop="title" label="催单留言"></el-table-column>
      <el-table-column prop="make_time" label="时间" width="300"></el-table-column>
    </el-table>

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
      components: { },
      watch: { },
    }
</script>