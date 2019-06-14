<template>
  <div>
    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
        <!-- 按钮 -->
        <el-button-group style="margin-right: 10px;">
          <el-button type="primary" @click="window_new = true">+ 新增进展</el-button>
          <el-button type="primary" @click="ReLoad()">刷新</el-button>
        </el-button-group>
    </el-row>

    <!-- 表格 -->
    <el-table :data="order_info.progress">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>
            <img v-for="item in props.row.pics" :src="item.pic_url" style="width: 100px; height: 100px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="进展"></el-table-column>
      <el-table-column prop="create_time" label="时间" width="300"></el-table-column>
    </el-table>



    <el-dialog title="新增" :visible.sync="window_new" width="600px" append-to-body>
      <NewForm :order_id="order_info.id"></NewForm>
    </el-dialog>


  </div>
</template>





<script>
    import NewForm from './form-new.vue';

    export default {
      props: {
          order_info:{},
          window_new:false,
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
          this.loading = true;
          this.axios.post("/shop/admin_api/get_order", {order_id: this.order_info.id}).then((res) => {
            this.order_info = res.data.data;
            this.loading = false;
          });
        },
      },
      computed: { },
      components: { NewForm },
      watch: {      },
    }
</script>