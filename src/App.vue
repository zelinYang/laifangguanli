<template>
	<div style="height: 100%;">



		<!-- 顶部 -->
		<div style="width: 100%; height: 58px; position: absolute; top: 0; left: 0; overflow: hidden; z-index: 9;" v-show="this.$store.state.logined">
			<el-menu
			  :default-active="$route.path"
			  mode="horizontal"
			  background-color="#f5f7fa"
			  text-color="#666"
			  active-text-color="#666"
			  :router="true"
			  >


			  <!-- LOGO -->
			  <el-menu-item index="" disabled class="logo" style="background-color: #2785e5; color: #fff; min-width: 200px; font-size: 18px; text-align: center; padding: 0;" v-show="!isCollapse">
			  		<div style="background-color: #2785e5; width: 100%; color: #fff;">
			  			{{sys_config.title}}
			  		</div>
			  </el-menu-item>


			  <!-- 收起展开菜单按钮 -->
			  <el-menu-item :index="$route.path" @click="isCollapse = !isCollapse;" style="width: 64px; max-width: 64px; padding: 0 10px; text-align: center;"><i class="el-icon-menu"></i></el-menu-item>



			  <!-- 我的 -->
			  <el-submenu index="" style="float: right;">
					<template slot="title">我的</template>
					<el-menu-item index="/system/myinfo">设置</el-menu-item>
					<el-menu-item index="/system/passwd">密码修改</el-menu-item>
					<el-menu-item index="" @click="Logout()">注销登录</el-menu-item>
			  </el-submenu>


			  <!-- 消息提醒 -->
			  <el-menu-item index="/home/messages" style="float: right;"><i class="el-icon-bell"></i></el-menu-item>

			</el-menu>
		</div>


		<div style="height: 100%; box-sizing: border-box; padding-top: 58px;" v-show="this.$store.state.logined">
			  <el-container style="height: 100%;">
				  	<!-- 左边菜单 -->
				    <el-aside width="auto" style="padding-top: 1em; ">
				      <el-menu background-color="#545c64"  class="el-menu-vertical-demo" :default-active="$route.path" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :router="true">
				      		<el-menu-item index="/">
					<i class="el-icon-house"></i>
					<span>首页</span>
				</el-menu-item>

				<!--涉河事务-->
				<el-submenu index="2"  class="menu-river">
					<template slot="title">来访人员管理</template>
					<el-menu-item index="/river/allclear">公司员工</el-menu-item>
					<el-menu-item index="/river/task">协力单位</el-menu-item>
					<el-menu-item index="/river/eventAn">政府人员</el-menu-item>
					<el-menu-item index="/river/assess">重要客户</el-menu-item>
					<el-menu-item index="/river/assess">重要客户</el-menu-item>
				</el-submenu>


				<el-menu-item index="/info">
					<i class="el-icon-timer"></i>
					<span>实时信息</span>
				</el-menu-item>

				<el-menu-item index="/organize">
					<i class="el-icon-printer"></i>
					<span>组织信息</span>
				</el-menu-item>

				<el-menu-item index="/monitor">
					<i class="el-icon-monitor"></i>
					<span>视频监控</span>
				</el-menu-item>

				<el-menu-item index="/file/guidang">
					<i class="el-icon-document"></i>
					<span>资料文件</span>
				</el-menu-item>

				<el-menu-item index="/work/banli">
					<i class="el-icon-setting"></i>
					<span>工作台</span>
				</el-menu-item>
				      </el-menu>
				    </el-aside>

					<!-- 右边核心内容区域 -->
				    <el-main>
				    	<router-view></router-view>
				    </el-main>
			  </el-container>
		</div>

		<!-- <LoginView :sys="sys_config" v-show="this.$store.state.logined==false"></LoginView> -->


	</div>
</template>



<script>
	import sys_config from '@/config/sys.config.js'
	import LoginView from '@/views/Login.vue'


  export default {
    data() {
      return {
      	isCollapse: false,
        LoadedData:true,
        Loading_saving:false,
        sys_config: sys_config,
      };
    },

    mounted(){
    	this.$store.state.sys = sys_config;
    },
    methods: {
    	Save(data){
    		this.Loading_saving = true;
    		this.axios.post('/admineditor/api/save_sys', {sys: data} ).then((res)=>{
    			this.Loading_saving = false;
    		}).catch((error) => {
                this.Loading_saving = false;
            });
    	},
    	Load(){
    		if (this.$route.query.name == '') return;

    		this.axios.post('/admineditor/api/get_sys', {name: this.$route.query.name}).then((res) => {
    		    //this.sys = res.data.data;
    		});
    	},
    	Logout(){
    		this.$store.state.logined=false;
    	},
    	ClickPage(item, mod){
    	    this.LoadedData = false;

    	    let _this=this;
    	    setTimeout(() => { _this.LoadedData = true; }, 300);
    	},
    },
    computed: {},
    components: { LoginView }
  }
</script>



<style>
	.el-menu { border-right:0 !important; }
	.el-menu-item.logo.is-disabled  { opacity: 1; cursor: default; }
	.el-aside { background-color: #1d1d1d; color: #333; }
	.el-main { background-color: #fff; color: #333; }
	.el-aside .el-menu-item.is-active { background-color: #fff !important; color: #333 !important; }
	.el-menu-vertical-demo:not(.el-menu--collapse) { width: 200px; }

	.fa {
	    vertical-align: middle;
	    margin-right: 5px;
	    width: 24px;
	    text-align: center;
	    font-size: 18px;
	}
</style>
