<template>
	<div>
		<el-form label-width="100px">
			<el-form-item label="等级名称">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="卡面">
				<div :style="'position: relative; backround-color:#000; border-radius: 10px; width: 300px; height: 160px; overflow: hidden; background-image: url('+form.bkimg+'); '">
					<p style="position: absolute;top: 0; left: 0; margin: 20px;color: #fff; line-height: 1em;">No.888888</p>
					<p style="position: absolute;bottom: 0; left: 0; margin: 20px;color: #fff; line-height: 1em;">张三</p>
					<p style="position: absolute;bottom: 0; right: 0; margin: 20px;color: #fff; line-height: 1em;">{{form.title}}</p>
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
				<el-input type="textarea" v-model="form.remark"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input type="textarea" v-model="form.remark"></el-input>
			</el-form-item>
			<el-form-item label=""> 
				<el-button-group>
				  <el-button type="primary" @click="Save()" :loading="loading">保存</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				loading: false,
				form: {title:'金卡', remark:'', bkimg:require('@/assets/demo-card.jpg')},
			}
		},
		methods: { 
			Save() {

			},
			UploadDone(res, file) {
				//this.imageUrl = URL.createObjectURL(file.raw);
				this.form.bkimg = file.response.data.url;
				console.log(file.response.data.url);
			},
		}
	}
</script>