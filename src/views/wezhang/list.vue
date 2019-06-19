<template>
  <div>
    <div style="margin-bottom: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>违章管理</el-breadcrumb-item>
          <el-breadcrumb-item>违章列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

<!--    <div style="text-align: right; margin: 20px 0;">-->
<!--      <el-button icon="el-icon-setting" @click="dialog_vipcard_showing=true">会级设置</el-button>-->
<!--    </div>-->

    <el-tabs type="border-card">
      <el-tab-pane label="人员违章">
          <CustomerListBlock></CustomerListBlock>
      </el-tab-pane>
        <el-tab-pane label="车辆违章">
            <Black></Black>
        </el-tab-pane>
    </el-tabs>


<!--    <el-dialog title="会级设置" :visible.sync="dialog_vipcard_showing" width="800px">-->
<!--        <VipSet></VipSet>-->
<!--    </el-dialog>-->



  </div>
</template>





<script>
    import CustomerListBlock from './list-block.vue';
    import Black from './blackNameList.vue';

    export default {
      data() {
        return {
          dialog_vipcard_showing:false,
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { CustomerListBlock,Black }
    }
</script>
