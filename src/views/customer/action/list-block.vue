<template>
  <div>
    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
      <!-- 按钮 -->
      <el-col :span="20">
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
    <el-table :data="rows.rows" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="订单编号" width="100"></el-table-column>
      <el-table-column prop="title" label="订单"></el-table-column>
      <el-table-column prop="username" label="姓名" width="300"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="item=scope.row; dialog_detail_showing2=true; " style="margin-right: 10px;">详情</el-button>
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



    <el-dialog title="详情" :visible.sync="dialog_detail_showing2" width="1200px" append-to-body>
      <Detail :id="item.id"></Detail>
    </el-dialog>
  </div>
</template>





<script>
    import Detail from '@/views/order/detail.vue';

    export default {
      props: {
          customer_id:{},
      },
      data() {
        return {
          loading: false,
          dialog_detail_showing2: false,
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
        this.ReLoad();
      },
      methods: {
        ReLoad(){
          this.loading = true;
          this.list_input.customer_id = this.customer_id;
          this.axios.post(this.$store.state.sys.api.action_list, this.list_input).then((res) => {
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
      components: { Detail },
      watch: {
          customer_id:{
            //immediate:true,
            handler:function(){
              this.ReLoad();
            }
          }
      },
    }
</script>