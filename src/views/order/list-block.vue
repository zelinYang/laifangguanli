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
        <el-input placeholder="" class="input-with-select" prefix-icon="el-icon-search" auto-complete="true" v-model="sousuo" @change="searchName(sousuo)" style="max-width: 280px; float: right;" :clearable="true"></el-input>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="rows.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="num" label="编号" width="100"></el-table-column>
      <el-table-column prop="emName" label="姓名" width=""></el-table-column>
      <el-table-column prop="emSex" label="性别" width="100"></el-table-column>
<!--      <el-table-column prop="depart" label="所在部门" width="180"></el-table-column>-->
      <el-table-column prop="mobile" label="手机" width="200"></el-table-column>
      <el-table-column prop="idCard" label="身份证" width="250"></el-table-column>
      <el-table-column prop="dorCardNum" label="工卡号" width="180"></el-table-column>
      <el-table-column prop="intoTime" label="记录时间" width="180"></el-table-column>
      <el-table-column prop="pType" label="属性" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.pType == '公司员工'">公司员工</el-tag>
          <el-tag type=" " v-if="scope.row.pType == '协力常驻'">协力常驻</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteRow(scope.row)"
                     style="margin-right: 10px;">删除记录
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



    <el-dialog title="详情" :visible.sync="dialog_detail_showing" width="1200px" append-to-body>
      <Detail :id="item.id"></Detail>
    </el-dialog>



    <el-dialog title="添加记录" :visible.sync="dialog_new_showing" width="1200px" append-to-body>
      <FormNew></FormNew>
    </el-dialog>
  </div>
</template>





<script>
    import Detail from './detail.vue';
    import FormNew from './form-new.vue';

    export default {
      props: {
          // customer_id:{},
      },
      data() {
        return {
          loading: false,
          dialog_detail_showing: false,
          dialog_new_showing: false,
          rows:[],
          row:[],
          item:{},
          currentPage: 1,
          pagesize: 10,
          sousuo: '',


          // list_input:{
          //   search:'',
          //   page:1,
          //   page_size:10,
          //   filter: {},
          //   customer_id:'',
          // }
        };
      },

      mounted() {
        this.ReLoad();
      },
      methods: {
        ReLoad(){
          this.loading = true;
          // this.list_input.customer_id = this.customer_id;
          this.axios.post('/peple/employee/getTable').then((res) => {
              this.rows = res.data;
              this.row = this.rows
              this.loading = false;
          });
        },
        deleteRow(val){
          console.log(val);
          let number = val.num;
          let start = this.row.length - number
          this.row.splice(start,1)
          this.rows = this.row
        },
        handleSizeChange(val) {
          this.pagesize = val;
          this.ReLoad();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.ReLoad();
        },

        searchName(val){
          let oResult = this.rows.filter(item => {
            if(item.emName === val){
              return item
            }
          });

          if(val === ''){
            this.ReLoad();
          }else {
            this.rows = oResult;
          }
        }
      },
      computed: { },
      components: { Detail,FormNew },
      // watch: {
      //     customer_id:{
      //       //immediate:true,
      //       handler:function(){
      //         this.ReLoad();
      //       }
      //     }
      // },
    }
</script>
