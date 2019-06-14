<template>
  <div>
          <el-form label-width="100px" style="width: 460px;">
                <el-form-item label="OpenID">{{info.openid}}</el-form-item>
                <el-form-item label="微信昵称">{{info.nickname}}</el-form-item>
                <el-form-item label="性别">{{info.sex}}</el-form-item>
                <el-form-item label="国家">{{info.country}}</el-form-item>
                <el-form-item label="省">{{info.province}}</el-form-item>
                <el-form-item label="城市">{{info.city}}</el-form-item>
                <el-form-item>
                  
                </el-form-item>
          </el-form>
          <el-alert title="用户的微信资料将在用户再次使用服务的时候自动更新" type="info"></el-alert>
          {{info}}
  </div>
</template>





<script>
    export default {
      props: {
          info:{},
      },
      data() {
        return {
          loading: false,
        };
      },

      mounted() { },
      methods: { 
          re_load_wx(){
            this.loading = true;
            this.axios.post("/shop/admin_api/reload_wx_userinfo", {openid:this.info.openid}).then((res) => {
                this.loading = false;

            });
          }
      },
      computed: { },
      components: { },
      watch: { },
    }
</script>