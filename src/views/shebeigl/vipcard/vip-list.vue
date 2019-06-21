<template>
  <div>


    <el-tabs type="border-card">
      <el-tab-pane label="会员卡设置">

        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
          <el-col :span="20">
            <el-button-group style="margin-right: 10px;">
              <el-button type="primary" @click="dialog_new_showing = true">+ 新增会级</el-button>
            </el-button-group>

            <el-button-group style="margin-right: 10px;">
              <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
            </el-button-group>
          </el-col>
        </el-row>


        <!-- 表格 -->
        <el-table :data="$store.state.sys_info.vips" v-loading="loading">
          <el-table-column prop="title" label="会级"></el-table-column>
          <el-table-column prop="customer_count" label="人数" width="300"></el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" @click="item=scope.row; dialog_detail_showing=true; " style="margin-right: 10px;">详情</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>



    {{$store.state.sys_info}}
  </div>
</template>





<script>
    export default {
      props: { },
      data() {
        return { 
          loading:false,
          dialog_new_showing:false,
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: {  }
    }
</script>