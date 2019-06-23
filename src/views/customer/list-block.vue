<template>
    <div>
        <!-- 按钮与筛选 -->
        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
            <!-- 按钮 -->
            <el-col :span="20">
                <el-button-group style="margin-right: 10px;">
                    <el-button type="primary" @click="dialog_add_showing = true">+ 新增预约</el-button>
                </el-button-group>


                <el-button-group style="margin-right: 10px;">
                    <el-button type="danger" :disabled="btnDe" icon="el-icon-delete" @click="deleteChecked">批量删除</el-button>
                </el-button-group>
                <el-button-group style="margin-right: 10px;">
                    <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
                </el-button-group>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="4">
                <el-input placeholder="请输入要查找人的姓名" class="input-with-select" prefix-icon="el-icon-search"
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
        <el-table :data="rows.slice((currentPage-1)*pagesize,currentPage*pagesize)" @selection-change="checkedRow" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="编号" width="100"></el-table-column>
            <el-table-column prop="vName" label="姓名" width=""></el-table-column>
            <el-table-column prop="vSex" label="性别" width="100"></el-table-column>
            <el-table-column prop="property" label="属性" width="100"></el-table-column>
            <el-table-column prop="times" label="类别" width="100"></el-table-column>

            <el-table-column prop="pepleN" label="人数" width="100"></el-table-column>
            <el-table-column prop="company" label="所在单位" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="150"></el-table-column>
            <el-table-column prop="idCard" label="身份证" width="200"></el-table-column>
            <el-table-column prop="vTime" label="预约时间" width="180"></el-table-column>
<!--            <el-table-column prop="target" label="来访目的" width="180"></el-table-column>-->
<!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
<!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
<!--            <el-table-column prop="state" label="状态" width="100">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-tag type="info" v-if="scope.row.state == '未审批'">未审批</el-tag>-->
<!--                    <el-tag type="success" v-if="scope.row.state == '通过'">通过</el-tag>-->
<!--                    <el-tag type="warning" v-if="scope.row.state == '不通过'">不通过</el-tag>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="操作" width="100">
<!--                <template slot-scope="scope">-->
<!--                    <el-button size="mini" @click="showDetail(scope.row)"-->
<!--                               style="">详情-->
<!--                    </el-button>-->
<!--                </template>-->
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
                <el-tab-pane label="访客预约资料">
                    <el-form ref="form" :model="customer" label-width="80px">
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="访客姓名">
                                <el-input v-model="customer.vName"></el-input>
                            </el-form-item>
                            <el-form-item label="访客性别">
                                <el-input v-model="customer.vSex"></el-input>
                            </el-form-item>
                            <el-form-item label="所在单位">
                                <el-input v-model="customer.company"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="手机号码">
                                <el-input v-model="customer.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input v-model="customer.idCard"></el-input>
                            </el-form-item>
                            <el-form-item label="来访目的">
                                <el-input v-model="customer.target"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="属性">
                                <el-select v-model="customer.property" placeholder="请选择">
                                    <el-option label="协力" value="协力"></el-option>
                                    <el-option label="入司" value="入司"></el-option>
                                    <el-option label="入厂" value="入厂"></el-option>
                                    <el-option label="施工" value="施工"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-select v-model="customer.times" placeholder="请选择">
                                    <el-option label="临时" value="临时"></el-option>
                                    <el-option label="短期" value="长期"></el-option>
                                    <el-option label="常驻（协力）" value="常驻（协力）"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="customer.state" placeholder="请选择">
                                    <el-option label="未审批" value="未审批"></el-option>
                                    <el-option label="通过" value="通过"></el-option>
                                    <el-option label="不通过" value="不通过"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="display: flex">

                        </div>
                        <div style="display: flex;justify-content: space-between">

                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button type="default" @click="dialog_detail_showing=false">取消</el-button>
                <el-button type="primary" @click="passA">保存</el-button>
            </span>
        </el-dialog>


        <el-dialog title="新增预约" :visible.sync="dialog_add_showing" width="900px">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="display:flex;justify-content: space-between;">
                    <el-form-item label="访客姓名">
                        <el-input v-model="form.vName" placeholder="请输入访客姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="来访目的">
                        <el-input v-model="form.target" placeholder="请输入来访目的"></el-input>
                    </el-form-item>
                    <el-form-item label="所在单位">
                        <el-input v-model="form.company" placeholder="请输入所在单位"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex;justify-content: space-between;">
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="人数">
                        <el-input v-model="form.pepleN" placeholder="请输入人数"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex; justify-content: space-between;">
                    <el-form-item label="访客性别">
                        <el-select v-model="form.vSex" placeholder="请选择">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="属性">
                        <el-select v-model="form.property" @change="proChenge" placeholder="请选择">
                            <el-option :label="item.label" :value="item.value" v-for="item in form.propertys"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="类别">
                        <el-select v-model="form.times" placeholder="请选择">
                            <el-option :label="item.label" :value="item.value" v-for="item in form.timess"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="display:flex;">
                    <el-form-item label="预约时间">
                        <el-date-picker
                                value-format="yyyy-MM-dd HH:mm"
                                v-model="form.vTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="form.pickerOptions">
                        </el-date-picker>
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
                btnDe: false,
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

                rowNum: [],
                rowNumq: 0,

                form: {
                    state: '未审核',
                    vName: '',
                    vSex: '',
                    company: '',
                    mobile: '',
                    idCard: '',
                    pepleN: '',
                    vTime: '',
                    target: '',
                    property: '',
                    times: '',
                    date1:'',
                    date2:'',
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
                    rules:{
                        vName: [{required: true,message: '不能为空',trigger: 'blur'}],
                        target: [{required: true,message: '不能为空',trigger: 'blur'}],
                        company: [{required: true,message: '不能为空',trigger: 'blur'}],
                        mobile: [{required: true,message: '不能为空',trigger: 'blur'}],
                        idCard: [{required: true,message: '不能为空',trigger: 'blur'}],
                        pepleN: [{required: true,message: '不能为空',trigger: 'blur'}],
                        vSex: [{required: true,message: '不能为空',trigger: 'blur'}],
                        property: [{required: true,message: '不能为空',trigger: 'blur'}],
                        times: [{required: true,message: '不能为空',trigger: 'blur'}],
                    },
                    propertys: [
                        {
                            value: '入司',
                            label: '入司'
                        },
                        {
                            value: '入厂',
                            label: '入厂'
                        },
                        {
                            value: '施工',
                            label: '施工'
                        },
                        {
                            value: '协力',
                            label: '协力'
                        }
                    ],
                    timess: [
                        {
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
                    ],

                },
            };
        },

        mounted() {
            this.ReLoad();
        },
        methods: {
            ReLoad() {
                this.loading = true;
                this.axios.post('/vistor/getTable').then((res) => {
                    this.rows = res.data;
                    this.riws = res.data;
                    console.log(res.data);
                    this.loading = false;
                });
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
            },
            showDetail(val) {
                this.customer = JSON.parse(JSON.stringify(val));
                this.rowNumq = this.customer.num;
                this.dialog_detail_showing = true;
                console.log(this.customer);
            },
            passA(){
                console.log(this.rows)
                this.rows.splice(this.rows.length - this.rowNumq,1,this.customer)
                console.log(this.rows);
                this.dialog_detail_showing = false;
            },
            desPass(){
                this.rows[this.rowNum].state = '不通过审批';
                this.dialog_detail_showing = false;
            },
            proChenge(val){
                let pArr = [
                    {
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
                ];
                if(val === '协力'){
                    this.form.timess = pArr;
                }else {
                    this.form.timess = pErr;
                }
            },
            saveAdd(){
                console.log(this.form.vTime);
                this.form.num = this.rows.length + 1;
                this.rows.unshift(JSON.parse(JSON.stringify(this.form)));
                this.dialog_add_showing =false;
            },

            checkedRow(selection){
                let arr = [];
                 selection.forEach((item) => {
                     arr.push(item.num)
                     // console.log(arr);
                });
                this.rowNum = arr;
                console.log(this.rowNum);

            },
            deleteChecked(){
                if(this.rowNum.length < 1){
                    this.$message({
                        message: '请选择内容',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除这些内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.rowNum.forEach((item) => {
                        this.rows.splice(this.rows.length - item,1)
                        // console.log(this.rows[item])
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
