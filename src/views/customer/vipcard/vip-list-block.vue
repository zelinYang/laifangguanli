<template>
  <div>
    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
      <!-- 按钮 -->
      <el-col :span="20">
        <el-button-group style="margin-right: 10px;">
          <el-button type="primary" @click="dialog_new_showing = true">+ 新增会级</el-button>
        </el-button-group>

        <el-button-group style="margin-right: 10px;">
          <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
        </el-button-group>
      </el-col>

      <!-- 搜索框 -->
      <el-col :span="4">
        <el-input placeholder="" class="input-with-select" prefix-icon="el-icon-search" auto-complete="true" @change="" style="max-width: 280px; float: right;" :clearable="true"></el-input>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="sys_info.exinfo.vips" v-loading="loading">
      <el-table-column prop="title" label="会级"></el-table-column>
      <el-table-column prop="customer_count" label="人数" width="300"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="item=scope.row; dialog_detail_showing=true; " style="margin-right: 10px;">详情</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <el-pagination
    style="margin:20px 0;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :page-sizes="[10, 20, 50, 100]"
    :current-page="list_input.page"
    :page-size="list_input.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="rows.count">
    </el-pagination>



    <el-dialog title="详情" :visible.sync="dialog_detail_showing" width="600px" append-to-body>
      <VipDetail :id="item.id"></VipDetail>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialog_new_showing" width="600px" append-to-body>
      <VipNewForm></VipNewForm>
    </el-dialog>

  </div>
</template>





<script>
    import VipDetail from './vip-detail.vue';
    import VipNewForm from './vip-new-form.vue';

    export default {
      props: {
          sys_info:{},
      },
      data() {
        return {
          loading: false,
          dialog_detail_showing: false,
          dialog_new_showing: false,
          rows:[],
          item:{},


          list_input:{
            search:'', 
            page:1, 
            pagesize:10, 
            filter: {},
            customer_id:'',
          }
        };
      },

      mounted() {
        //this.ReLoad();
      },
      methods: {
        ReLoad(){
          this.loading = true;
          this.list_input.customer_id = this.customer_id;
          this.axios.post('/customer/admin_api/list_vip', this.list_input).then((res) => {
              this.rows = res.data.data;
              this.loading = false;
          });
        },
        handleSizeChange: function(val) {
          this.list_input.page = 1;
          this.list_input.pagesize = val;
          this.ReLoad();
        },
        handleCurrentChange: function(val) {
          this.list_input.page = val;
          this.ReLoad();
        },
      },
      computed: { },
      components: { VipDetail,VipNewForm },
      watch: { },
    }
</script>