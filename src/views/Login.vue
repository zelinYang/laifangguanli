<template>
	<div style="position: absolute; top: 0;left: 0; width: 100%; height: 100%;">
		<div
				style="padding: 8em; box-sizing: border-box; text-align: center; background-color: #409EFF;"
		>
			<h1 style="font-weight: 200; color: #fff;">登录</h1>
		</div>

		<div style="background-color: #fff; box-sizing: border-box; padding: 3em; text-align: center; ">
			<div
					style="margin-top: -100px;  max-width: 500px; width: 100%; text-align: left; display: inline-block;  background-color: #fff; padding: 50px 30px; box-sizing: border-box; box-shadow: 0px 10px 60px #ccc;"
			>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账号">
						<el-input v-model="form.acc" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="记住账号">
						<el-switch v-model="form.remember"></el-switch>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
						<el-button>忘记密码</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<p style="font-size: 12px; color: #eee; margin: 2em; text-align: center;">Copyright 2019</p>
	</div>
</template>


<script>
	export default {
		props: {
			sys: {}
		},
		data() {
			return {
				loading: false,
				form: {
					sys: "4",
					acc: "",
					pwd: "",
					remember: true
				}
			};
		},
		mounted: function() {
			//ShowLoading();
		},
		methods: {
			ShowLoading: function() {
				const loading = this.$loading({
					lock: true,
					text: "Loading",
					spinner: "el-icon-loading",
					background: "rgba(0, 0, 0, 0.7)"
				});
			},

			onSubmit() {
				this.$store.state.logined = true;
				//debugger;
				// this.loading = true;
				// this.sys.title = res2.data.data.title;
				//       this.$store.state.sys_info = res2.data.data;
				//       this.$store.state.logined = true;
				//       this.loading = false;
				// this.axios
				//   .post("/index/user/trylogin", this.form)
				//   .then(res => {
				//     this.axios.post("/customer/admin_api/get_system_info").then(res2 => {
				//
				//       return;
				//     });
				//     // if( res.data.errcode == 0 ) {
				//
				//     //     return;
				//     // }
				//
				//     // this.$message('输入的账号密码不正确');
				//     // this.loading = false;
				//   })
				//   .catch(error => {
				//     this.$message("网络错误");
				//     this.loading = false;
				//   });

			}
		}
	};
</script>
