<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="等级名称">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="卡面">
        <div :style="'position: relative; backround-color:#000; border-radius: 10px; width: 300px; height: 160px; overflow: hidden; background-image: url('+info.bkimg+'); '">
          <p style="position: absolute;top: 0; left: 0; margin: 20px;color: #fff; line-height: 1em;">No.888888</p>
          <p style="position: absolute;bottom: 0; left: 0; margin: 20px;color: #fff; line-height: 1em;">张三</p>
          <p style="position: absolute;bottom: 0; right: 0; margin: 20px;color: #fff; line-height: 1em;">{{info.title}}</p>
        </div>
        <el-upload
          class="upload-demo"
          action="/index/admin_api/upload"
          :on-success="UploadDone" :show-file-list="false" >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="权益说明">
        <el-input type="textarea" v-model="info.remark"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="info.remark"></el-input>
      </el-form-item>
      <el-form-item label="可用">
        <el-switch v-model="info.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label=""> 
        <el-button-group>
          <el-button type="primary" @click="Save()" :loading="loading">保存</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    {{info}}
  </div>
</template>


<script>
  export default {
    props: { sys_info:{} },
    data() {
      return {
        loading: false,
        info: {title:'金卡', remark:'', status:1, bkimg:require('@/assets/demo-card.jpg')},
      }
    },

    methods: { 
      Save() {

      },
      UploadDone(res, file) {
        this.form.bkimg = file.response.data.url;
        console.log(file.response.data.url);
      },
    },
    computed: { },
    watch: { },
  }
</script>