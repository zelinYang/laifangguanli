<template>
    <div>
        <!-- 按钮与筛选 -->
        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
            <!-- 按钮 -->
            <el-col :span="20">
                <el-button-group style="margin-right: 10px;">
                    <el-button type="primary" class="el-icon-plus" @click="dialog_add_showing = true">设备信息添加</el-button>
                </el-button-group>

                <el-button-group style="margin-right: 10px;">
                    <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
                </el-button-group>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="4">
                <el-input placeholder="请输入要查找设备" class="input-with-select" prefix-icon="el-icon-search"
                          @change="searchName(sousuo)" v-model="sousuo" style="max-width: 280px; float: right;"
                          :clearable="true"></el-input>
            </el-col>
        </el-row>


        <!-- 筛选条件 -->
        <div class="filter_box">
            <div>

            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="rows.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="序号" width="50"></el-table-column>
            <el-table-column prop="vName" label="设备名称" width="180"></el-table-column>
            <el-table-column prop="type" label="规格型号" width="180"></el-table-column>
            <el-table-column prop="agu" label="技术参数" width=""></el-table-column>
            <el-table-column prop="meber" label="数量" width="100"></el-table-column>
            <el-table-column prop="depart" label="单位" width="100"></el-table-column>
            <el-table-column prop="mobile" label="报修电话" width="180"></el-table-column>
<!--            <el-table-column prop="idCard" label="身份证" width="200"></el-table-column>-->
<!--            <el-table-column prop="rongNu" label="违章次数" width="100"></el-table-column>-->
<!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
<!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
            <el-table-column prop="grade" label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.grade == '正常'">正常</el-tag>
                    <el-tag type="danger" v-if="scope.row.grade == '异常'">异常</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showDetail(scope.row)"
                               style="margin-right: 10px;">详情
                    </el-button>
                    <el-button size="mini" @click="deleteR(scope.row)"
                               style="margin-right: 10px;">删除
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


        <el-dialog title="详情" :visible.sync="dialog_detail_showing" :fullscreen="false" width="50%">
            <el-tabs type="border-card">
                <el-tab-pane label="设备资料">
                    <el-form ref="form" :model="customer" label-width="80px">
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="姓名">
                                <el-input v-model="customer.vName"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;">
                            <el-form-item label="规格型号">
                                <el-input v-model="customer.type"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex">
                            <el-form-item label="报修电话">
                                <el-input v-model="customer.mobile"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;">
                            <el-form-item label="技术参数">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="customer.agu">
                                </el-input>
                        </el-form-item>
<!--                            <el-form-item label="类别">-->
<!--                                <el-input v-model="customer.times"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="填表日期">-->
<!--                                <el-input v-model="customer.creatTime"></el-input>-->
<!--                            </el-form-item>-->
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="状态">
                                <el-select v-model="customer.grade" placeholder="请选择">
                                    <el-option label="异常" value="异常"></el-option>
                                    <el-option label="正常" value="正常"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="display: flex;">
                            <el-form-item label="数量">
                                <el-input v-model="customer.meber"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="customer.depart"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button type="default" @click="dialog_detail_showing=false">取消</el-button>
                <el-button type="primary" @click="passA">保存</el-button>
            </span>
        </el-dialog>


        <el-dialog title="设备信息添加" :visible.sync="dialog_add_showing" width="700px">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="display:flex;justify-content: space-between;">
                    <el-form-item label="设备名称">
                        <el-input v-model="form.vName" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="来访目的">-->
<!--                        <el-input v-model="form.target" placeholder="请输入来访目的"></el-input>-->
<!--                    </el-form-item>-->
                </div>
                <div style="display: flex;">
                    <el-form-item label="规格型号">
                        <el-input v-model="form.type" placeholder="请输入型号"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex;">
                    <el-form-item label="技术参数">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form.event">
                        </el-input>
                    </el-form-item>
                </div>
                <div style="display:flex; justify-content: space-between;">
                    <el-form-item label="报修电话">
                        <el-input v-model="form.mobile" placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input type="number" min="0" v-model="form.meber" placeholder="请输入数量"></el-input>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-input v-model="form.depart" placeholder="请输入单位"></el-input>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_add_showing = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import Detail from '@/views/customer/detail.vue';
    import AddForm from '@/views/customer/add-form.vue';

    export default {
        props: {},
        data() {
            return {
                sousuo: '',
                loading: false,
                dialog_detail_showing: false,
                dialog_add_showing: false,
                rows: [],
                riws: [],
                customer: {},
                user_pic: 'this.src=' + require('@/assets/user.png'),


                // list_input: {
                //     from_key: '',
                //     search: '',
                //     page: 1,
                //     page_size: 10,
                //     filter: {vip_vipcard_id: '', vip_store_id: '', mobile: '', wx_sex: '',},
                // },

                currentPage: 1,
                pagesize: 10,

                rowNum: 0,

                form: {
                    rongNu: 1,
                    isToBlake:'',
                    state: '未审核',
                    vName: '',
                    vSex: '',
                    agu: '',
                    type: '',
                    company: '',
                    mobile: '',
                    idCard: '',
                    pepleN: '',
                    meber: 0,
                    vTime: '',
                    target: '',
                    property: '',
                    grade: '正常',
                    pickerOptions:{
                        shortcuts: [{
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '明天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() + 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        }, {
                            text: '一周后',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }]
                    },
                    propertys: [
                        {
                            value: '公司员工',
                            label: '公司员工'
                        },
                        {
                            value: '外来访客',
                            label: '外来访客'
                        },
                    ],
                    timess: [
                        {
                            value: '一般',
                            label: '一般'
                        },
                        {
                            value: '轻微',
                            label: '轻微'
                        },
                        {
                            value: '较严重',
                            label: '较严重'
                        },
                        {
                            value: '严重',
                            label: '严重'
                        },
                    ],

                }
            };
        },

        mounted() {
            this.ReLoad();
        },
        methods: {
            ReLoad() {
                this.loading = true;
                this.axios.post('/shebgl/tables').then((res) => {
                    this.rows = res.data;
                    // this.riws = res.data;
                    console.log(res.data);
                    this.loading = false;
                });
            },
            deleteR(val){
                console.log(val.num);
                this.rows.splice(val.num - 1,1);
            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            searchName(val) {
                let oResult = this.rows.filter(item => {
                    if(item.vName === val){
                        return item
                    }
                });

                if(val === ''){
                    this.ReLoad();
                }else {
                    this.rows = oResult;
                }

                console.log(this.rows);

                // this.$message({message: '此功能尚在开发中', type: 'warning'});
            },
            showDetail(val) {
                this.customer = val;
                this.rowNum = this.customer.num - 1;
                this.dialog_detail_showing = true;
                console.log(this.customer);
            },
            passA(){
                this.rows.splice(this.rowNum,1,this.customer);
                console.log(this.rows[this.rowNum]);
                this.dialog_detail_showing = false;
            },
            desPass(){
                this.rows[this.rowNum].state = '不通过审批';
                this.dialog_detail_showing = false;
            },
            proChenge(val){
                /*let pArr = [
                    /!*{
                        value: '临时',
                        label: '临时'
                    },
                    {
                        value: '短期',
                        label: '短期'
                    },
                    {
                        value: '常驻',
                        label: '常驻'
                    },
                ];
                let pErr = [
                    {
                        value: '临时',
                        label: '临时'
                    },
                    {
                        value: '短期',
                        label: '短期'
                    },
                ]
                if(val === '协力'){
                    this.form.timess = pArr;
                }else {
                    this.form.timess = pErr;
                }*!/*/
            },
            saveAdd(){
                // debugger
                let sum = this.rows.filter(item => {
                    if(item.idCard === this.form.idCard){
                        return item
                    }
                })
                console.log(sum);
                if(sum.length <= 0){
                    console.log(this.form.vTime);
                    this.form.num = this.rows.length + 1;
                    this.rows.unshift(JSON.parse(JSON.stringify(this.form)));
                    this.dialog_add_showing =false;
                    this.form.rongNu = 1
                }else {
                    let num = sum[0].num;
                    console.log(sum[0].num);
                    this.addCount(num)
                }

            },
            addCount(num){
                // debugger;
                console.log(this.rows[this.rows.length - num]);
                this.rows[this.rows.length - num].rongNu++;
            },

            blackChange(val){
                console.log(val)

                if(val === true){
                    this.customer.isToBlake = '是'
                }else {
                    this.customer.isToBlake = '否'
                }

            }
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
