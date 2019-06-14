<template>
	<div>
		<el-form label-width="100px">
			<el-form-item label="进展描述">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="进展图片">
				<el-upload
				  class="upload-demo"
				  action="/shop/admin_api/upload"
				  list-type="picture"
				  :on-success="UploadDone"
				  :on-remove="UploaRemove"
				  :show-file-list="true" >
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
			<el-form-item label=""> 
				<el-button-group>
				  <el-button type="primary" @click="Save()" :loading="loading">保存</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>
		{{form.pics}}
	</div>
</template>



<script>
	export default {
	      props: {
	          order_id:'',
	      },
		data() {
			return {
				loading: false,
				form: {order_id:'', title:'', remark:'', pics:[] },
			}
		},
		methods: { 
			Save() {
				this.loading = true;
				this.form.order_id = this.order_id;
				this.axios.post("/shop/admin_api/new_progress", this.form).then((res) => {
					
					this.loading = false;
				});
			},
			UploadDone(response, file, fileList) {
				//this.imageUrl = URL.createObjectURL(file.raw);
				//this.form.pics.push(file.response.data.url);
				this.form.pics = [];
				fileList.forEach((item, index, arr) => {
				    this.form.pics.push({pic_url: item.response.data[0].url});
				});
				console.log(fileList);
			},
			UploaRemove(file, fileList) {
				//this.imageUrl = URL.createObjectURL(file.raw);
				//this.form.pics.push(file.response.data.url);
				this.form.pics = [];
				fileList.forEach((item, index, arr) => {
				    this.form.pics.push({pic_url: item.response.data[0].url});
				});
				console.log(fileList);
			},
		}
	}
</script>