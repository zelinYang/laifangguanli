<template>
  <div>
    <!-- 按钮与筛选 -->
    <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
      <!-- 按钮 -->
      <el-col :span="20">
        <el-button-group style="margin-right: 10px;">
          <el-button type="primary" @click="dialog_add=true">+ 添加</el-button>
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
    <el-table :data="rows.rows" v-loading="loading">
      <el-table-column prop="title" label="礼券名称"></el-table-column>
      <el-table-column prop="money" label="金额" width="200"></el-table-column>
      <el-table-column prop="money_starting" label="起用金额" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
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




        <!-- 新积分对话框 -->
        <el-dialog title="新增" :visible.sync="dialog_add" append-to-body width="380px">
          <el-form :model="info" label-width="80px">
            <el-form-item label="礼券名称"> <el-input v-model="info.title" auto-complete="off"></el-input> </el-form-item>
            <el-form-item label="金额"> <el-input-number v-model="info.money" :precision="0" :step="10" :max="999999999"></el-input-number> </el-form-item>
            <el-form-item label="起用金额"> <el-input-number v-model="info.money_starting" :precision="0" :step="10" :max="999999999"></el-input-number> </el-form-item>
            <el-form-item label="说明"> <el-input type="textarea" :rows="3" v-model="info.text"></el-input> </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog_add = false">取 消</el-button>
            <el-button type="primary" @click="Save()" :loading="loading">确 定</el-button>
          </div>
        </el-dialog>


  </div>
</template>





<script>
    export default {
      props: {
          customer_id:{},
      },
      data() {
        return {
          loading: false,
          dialog_add: false,
          rows:[],
          item:{},
          info: {title:'', money:5, money_starting:0, text:''},


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
          this.axios.post("/customer/admin_api/list_voucher", this.list_input).then((res) => {
              this.rows = res.data.data;
              this.loading = false;
          });
        },
        Save(){
          this.loading = true;
          this.axios.post("/customer/admin_api/add_voucher", {customer_id: this.customer_id, info: this.info}).then((res) => {
              this.loading = false;
              this.dialog_add=false;
              this.ReLoad();
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
      components: { },
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