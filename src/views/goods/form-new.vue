<template>
	<div>

				<div style="text-align: center; position: absolute; width: 160px; left: 0px; padding: 10px;">
					<i class="el-icon-goods" style="font-size: 100px;"></i>
				</div>
				

				<div style="padding-left: 160px;">
						      		  	  <div style="margin: 0px 0; height:80%; min-height: 660px;">
										      <el-form :model="form" label-width="100px">
												      	<el-form-item label="商品名称"> <el-input v-model="form.title"></el-input> </el-form-item>
												      	<el-form-item label="价格"> <el-input-number v-model="form.price" :min="0.01" :max="999999" label="价格"></el-input-number> </el-form-item>
												      	<el-form-item label="商品图片">
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone"
												      		  :show-file-list="false">
												      		  <img v-if="form.pic_url" :src="form.pic_url" class="avatar">
												      		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>
												      	</el-form-item>
												      	<el-form-item label="滚动大图">
												      		<div style="margin: 5px; float: left;" v-for="(item, index) in form.exinfo.pics">
												      			<img :src="item" style="width: 80px; height: 80px; " />
												      		</div>
															
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone_pics"
												      		  :show-file-list="false"
												      		  style="margin: 5px; float: left;">
												      		  <i class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>


												      	</el-form-item>
												      	<el-form-item label="方案介绍图片">
												      		<div style="margin: 5px; float: left;" v-for="(item, index) in form.exinfo.detail_pics">
												      			<img :src="item" style="width: 80px; height: 80px; " />
												      		</div>
															
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone_detail_pics"
												      		  :show-file-list="false"
												      		  style="margin: 5px; float: left;">
												      		  <i class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>
												      	</el-form-item>

												      	<el-form-item label="质量保证图片">
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone_exinfo_zhibao"
												      		  :show-file-list="false">
												      		  <img v-if="form.exinfo.zhibao_pic" :src="form.exinfo.zhibao_pic" class="avatar">
												      		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>
												      	</el-form-item>

												      	<el-form-item label="成本分析图片">
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone_exinfo_chengben"
												      		  :show-file-list="false">
												      		  <img v-if="form.exinfo.chengben_pic" :src="form.exinfo.chengben_pic" class="avatar">
												      		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>
												      	</el-form-item>

												      	<el-form-item label="收货体系图片">
												      		<el-upload
												      		  class="avatar-uploader"
												      		  action="/shop/admin_api/upload"
												      		  :on-success="UploadDone_exinfo_shouhuo"
												      		  :show-file-list="false">
												      		  <img v-if="form.exinfo.shouhuo_pic" :src="form.exinfo.shouhuo_pic" class="avatar">
												      		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												      		</el-upload>
												      	</el-form-item>

												      	<el-form-item label="区域">
												      		<el-select v-model="city_ids_array" multiple placeholder="请选择">
												      		  <el-option
												      		    v-for="item in cites"
												      		    :key="item.id"
												      		    :label="item.title"
												      		    :value="item.id">
												      		  </el-option>
												      		</el-select>
												      	</el-form-item>

												      	<el-form-item label="分类">
												      		<el-select v-model="form.category_id" placeholder="请选择">
												      		  <el-option
												      		    v-for="item in category_list"
												      		    :key="item.id"
												      		    :label="item.title"
												      		    :value="item.id">
												      		  </el-option>
												      		</el-select>
												      	</el-form-item>


												      	<el-form-item label="上架状态">
												      		<el-switch v-model="form.status" :active-value="'1'" :inactive-value="'0'">
												      		</el-switch>
												      	</el-form-item>
												      	<el-form-item label="">
												      		<el-button type="primary" @click="Save()" :loading="loading">确定</el-button>
												      		<el-button type="primary" @click="Close()">取消</el-button>
												      	</el-form-item>
										      </el-form>

										      {{form}}
									      </div>
				</div>


	</div>
</template>




<script>
	export default {
		props: {
			id:'',
		},
		data() {
			return {

				info:{},
				loading: false,
				active_tab: 'tab-base',
				form: {id:'', title:'', price:9, category_id:0, city_ids:'', remark:'', pic_url:'', status:1, exinfo:{ pics:[], detail_pics:[], zhibao_pic:'', chengben_pic:'', shouhuo_pic:'' }},

				cites:[],
				city_ids_array:[],
				category_list:[],
			}
		},
		methods: {
			Save() {
				if (this.form.title.length<3) { return this.$message('商品名称必须输入');  }
				if (this.form.price.length<1 ) { return this.$message('商品价格必须输入'); }

				this.loading = true;
				this.form.city_ids = this.city_ids_array.join(',');
				this.axios.post("/shop/admin_api/edit_goods", {id:this.form.id, goods_info:this.form}).then((res) => {
				    if (res.data.errcode == 0) {
				    	this.$message({message: '添加成功', type: 'success'});
				    	this.$emit("closewindows");  
				    }
				    this.loading = false;
				});
			},
			Close() {
				this.$emit("closewindows");  
			},


			// 商品主图上传完成
			UploadDone(response, file, fileList) {
				this.form.pic_url= response.data[0].url;
				console.log(response);
			},



			// 商品滚动图
			UploadDone_pics(response, file, fileList) {
				this.form.exinfo.pics.push(response.data[0].url);
				console.log(response);
			},



			// 商品详情图
			UploadDone_detail_pics(response, file, fileList) {
				this.form.exinfo.detail_pics.push(response.data[0].url);
				console.log(response);
			},


			// 商品质保图
			UploadDone_exinfo_zhibao(response, file, fileList) {
				this.form.exinfo.zhibao_pic = response.data[0].url;
				console.log(response);
			},


			// 商品成本分析图
			UploadDone_exinfo_chengben(response, file, fileList) {
				this.form.exinfo.chengben_pic = response.data[0].url;
				console.log(response);
			},

			// 收货体系
			UploadDone_exinfo_shouhuo(response, file, fileList) {
				this.form.exinfo.shouhuo_pic = response.data[0].url;
				console.log(response);
			},
		},
		computed: { },
		mounted() {

			this.loading = true;
			this.axios.post("/shop/admin_api/list_city").then(response => {
				this.cites = response.data.data.rows;
				this.loading = false;
			});


			this.loading = true;
			this.axios.post("/shop/admin_api/list_category").then(response => {
				this.category_list = response.data.data;
				this.loading = false;
			});


			if (this.id == '' || this.id == '-') return;

			this.loading = true;
			this.axios.post("/shop/admin_api/get_goods", {goods_id: this.id}).then((res) => {
				this.form = res.data.data;
				var dataStrArr = this.form.city_ids.split(",");
				this.city_ids_array = [];
				this.city_ids_array=dataStrArr.map(function(data){  
				    return +data;  
				}); 
				this.loading = false;
			});
		},
		watch: { },
	}
</script>


<style>
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 25%;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409EFF;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 80px;
	  height: 80px;
	  line-height: 80px;
	  text-align: center;
	}
	.avatar {
	  width: 80px;
	  height: 80px;
	  display: block;
	  border-radius: 25%;
	}
</style>