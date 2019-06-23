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
        <el-input placeholder="请输入要查找的车牌号" class="input-with-select" prefix-icon="el-icon-search"
                  @change="searchName" v-model="sousuo" style="max-width: 280px; float: right;"
                  :clearable="true"></el-input>
      </el-col>
    </el-row>


    <!-- 筛选条件 -->
    <div class="filter_box">
      <div>

      </div>
    </div>

    <!-- 表格 -->
    <el-table :data="rows.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="num" label="编号" width="100"></el-table-column>
      <el-table-column prop="cName" label="车牌号" width=""></el-table-column>
      <el-table-column prop="cpName" label="车主姓名" width="100"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
      <el-table-column prop="time" label="记录时间" width="200"></el-table-column>

      <!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
      <!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
      <el-table-column prop="state" label="属性" width="100">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.state == '公司车'">公司车</el-tag>
          <el-tag type="success" v-if="scope.row.state == '通勤车'">通勤车</el-tag>
          <el-tag type="warning" v-if="scope.row.state == '办证车'">办证车</el-tag>
          <el-tag type=" " v-if="scope.row.state == '自备车'">自备车</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteR(scope.row)">删除记录
          </el-button>
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
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="rows.length">
    </el-pagination>


  </div>
</template>


<script>
  import Detail from '@/views/customer/detail.vue';
  import AddForm from '@/views/customer/add-form.vue';

  export default {
    props: {},
    data() {
      return {
        sousuo: '',
        loading: false,
        dialog_detail_showing: false,
        dialog_add_showing: false,
        rows: [],
        riws: [],
        customer: {},
        user_pic: 'this.src=' + require('@/assets/user.png'),


        // list_input: {
        //     from_key: '',
        //     search: '',
        //     page: 1,
        //     page_size: 10,
        //     filter: {vip_vipcard_id: '', vip_store_id: '', mobile: '', wx_sex: '',},
        // },

        currentPage: 1,
        pagesize: 10,

        rowNum: 0,


      };
    },

    mounted() {
      this.ReLoad();
    },
    methods: {
      ReLoad() {
        this.loading = true;
        this.axios.post('/cart/neibu').then((res) => {
          this.rows = res.data;
          // this.riws = res.data;
          console.log(res.data);
          this.loading = false;
        });
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      searchName() {
        let oResult = this.rows.filter(item => {
          if(item.cName === val){
            return item
          }
        });
        if(val === ''){
          this.ReLoad();
        }else {
          this.rows = oResult;
        }
      },
      showDetail(val) {
        this.customer = JSON.parse(JSON.stringify(val));
        this.rowNum = parseInt(this.customer.num) -1;
        this.dialog_detail_showing = true;
        console.log(this.customer);
      },
      deleteR(val){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let number = val.num;
          let start = this.row.length - number;
          this.row.splice(start,1);
          this.rows = this.row
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      passA(){
        this.rows.splice(this.rowNum,1,this.customer)
        console.log(this.rows[this.rowNum]);
        this.dialog_detail_showing = false;
      },
      desPass(){
        this.rows[this.rowNum].state = '不通过审批';
        this.dialog_detail_showing = false;
      },
      proChenge(val){
        let pArr = [
          {
            value: '临时',
            label: '临时'
          },
          {
            value: '短期',
            label: '短期'
          },
          {
            value: '常驻',
            label: '常驻'
          },
        ];
        let pErr = [
          {
            value: '临时',
            label: '临时'
          },
          {
            value: '短期',
            label: '短期'
          },
        ]
        if(val === '协力'){
          this.form.timess = pArr;
        }else {
          this.form.timess = pErr;
        }
      },
      saveAdd(){
        console.log(this.form.vTime)
        this.form.num = this.rows.length + 1
        this.rows.unshift(JSON.parse(JSON.stringify(this.form)));
        this.dialog_add_showing =false;
      }
    },
    computed: {},
    components: {Detail, AddForm}
  }
</script>
