<template>
    <div>
        <!-- 按钮与筛选 -->
        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
            <!-- 按钮 -->
            <el-col :span="20">
                <el-button-group style="margin-right: 10px;">
                    <el-button type="primary" @click="dialog_add_showing = true">违章信息添加</el-button>
                </el-button-group>


                <el-button-group style="margin-right: 10px;">
                    <el-button type="danger" icon="el-icon-delete" @click="dialog_add_showing = true">批量删除</el-button>
                </el-button-group>
                <el-button-group style="margin-right: 10px;">
                    <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
                </el-button-group>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="4">
                <el-input placeholder="请输入要查找人的车主姓名" class="input-with-select" prefix-icon="el-icon-search"
                          @change="searchName" v-model="sousuo" style="max-width: 280px; float: right;"
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
            <el-table-column prop="num" label="编号" width="100"></el-table-column>
            <el-table-column prop="vName" label="车主姓名" width="100"></el-table-column>
            <el-table-column prop="event" label="违章事件" width=""></el-table-column>
<!--            <el-table-column prop="vSex" label="性别" width="100"></el-table-column>-->
            <el-table-column prop="property" label="属性" width="100"></el-table-column>
<!--            <el-table-column prop="depart" label="单位" width="100"></el-table-column>-->
            <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
            <el-table-column prop="cName" label="车牌号" width="100"></el-table-column>
            <el-table-column prop="isToBlake" label="是否列入黑名单" width="100"></el-table-column>
            <!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
            <!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
            <el-table-column prop="grade" label="违章等级" width="100">
                <template slot-scope="scope">
                    <el-tag type="" v-if="scope.row.grade == '一般'">一般</el-tag>
                    <el-tag type="success" v-if="scope.row.grade == '轻微'">轻微</el-tag>
                    <el-tag type="warning" v-if="scope.row.grade == '较严重'">较严重</el-tag>
                    <el-tag type="danger" v-if="scope.row.grade == '严重'">严重</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showDetail(scope.row)"
                               style="margin-right: 10px;">详情
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
                <el-tab-pane label="违章人员资料">
                    <el-form ref="form" :model="customer" label-width="80px">
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="车主姓名">
                                <el-input v-model="customer.vName"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-input v-model="customer.vSex"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="customer.depart"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="手机号码">
                                <el-input v-model="customer.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input v-model="customer.idCard"></el-input>
                            </el-form-item>
                            <el-form-item label="属性">
                                <el-input v-model="customer.property"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;">
                            <el-form-item label="违章事件">
                                <el-input v-model="customer.event" style="width: 400px;"></el-input>
                            </el-form-item>
                            <!--                            <el-form-item label="类别">-->
                            <!--                                <el-input v-model="customer.times"></el-input>-->
                            <!--                            </el-form-item>-->
                            <!--                            <el-form-item label="填表日期">-->
                            <!--                                <el-input v-model="customer.creatTime"></el-input>-->
                            <!--                            </el-form-item>-->

                            <el-form-item label="黑名单">
                                <el-switch
                                        v-model="customer.isToBlake=='是'? true:false">
                                </el-switch>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="违章等级">
                                <el-select v-model="customer.grade" placeholder="请选择">
                                    <el-option label="一般" value="一般"></el-option>
                                    <el-option label="较严重" value="较严重"></el-option>
                                    <el-option label="较严重" value="较严重"></el-option>
                                    <el-option label="严重" value="严重"></el-option>
                                </el-select>
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


        <el-dialog title="违章信息添加" :visible.sync="dialog_add_showing" width="700px">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="display:flex;justify-content: space-between;">
                    <el-form-item label="车主姓名">
                        <el-input v-model="form.vName" placeholder="请输入车主姓名"></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="来访目的">-->
                    <!--                        <el-input v-model="form.target" placeholder="请输入来访目的"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="单位">
                        <el-input v-model="form.depart" placeholder="请输单位"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex;justify-content: space-between;">
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="人数">-->
                    <!--                        <el-input v-model="form.pepleN" placeholder="请输入人数"></el-input>-->
                    <!--                    </el-form-item>-->
                </div>
                <div style="display:flex;">
                    <el-form-item label="违章事件">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form.event">
                        </el-input>
                    </el-form-item>
                </div>
                <div style="display:flex; justify-content: space-between;">
                    <el-form-item label="性别">
                        <el-select v-model="form.vSex" placeholder="请选择">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="黑名单">
                        <el-select v-model="form.isToBlake" placeholder="请选择">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="属性">
                        <el-select v-model="form.property" @change="proChenge" placeholder="请选择">
                            <el-option :label="item.label" :value="item.value" v-for="item in form.propertys"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="违章等级">
                        <el-select v-model="form.grade" placeholder="请选择">
                            <el-option :label="item.label" :value="item.value" v-for="item in form.timess"></el-option>
                        </el-select>
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
                    isToBlake:'',
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
                    grade: '',
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
                            value: '公司车辆',
                            label: '公司车辆'
                        },
                        {
                            value: '外来车辆',
                            label: '外来车辆'
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
                this.axios.post('/weiz/getTable').then((res) => {
                    this.rows = res.data;
                    // this.riws = res.data;
                    console.log(res.data);
                    this.loading = false;
                });
            },
            deleteR(){
                console.log(val.num);
            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            searchName() {
                this.$message({message: '此功能尚在开发中', type: 'warning'});
            },
            showDetail(val) {
                this.customer = JSON.parse(JSON.stringify(val));
                this.rowNum = parseInt(this.customer.num) -1;
                this.dialog_detail_showing = true;
                console.log(this.customer);
            },
            passA(){
                this.rows.splice(this.rowNum,1,this.customer)
                console.log(this.rows[this.rowNum]);
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
                ]
                if(val === '协力'){
                    this.form.timess = pArr;
                }else {
                    this.form.timess = pErr;
                }
            },
            saveAdd(){
                console.log(this.form.vTime)
                this.form.num = this.rows.length + 1
                this.rows.unshift(JSON.parse(JSON.stringify(this.form)));
                this.dialog_add_showing =false;
            }
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
