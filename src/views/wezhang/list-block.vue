<template>
    <div style="width: 99%">
        <!-- 按钮与筛选 -->
        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
            <!-- 按钮 -->
            <el-col :span="20">
                <el-button-group style="margin-right: 10px;">
                    <el-button type="primary" @click="dialog_add_showing = true">+ 违章添加</el-button>
                </el-button-group>


                <el-button-group style="margin-right: 10px;">
                    <el-button type="danger" icon="el-icon-delete" @click="deleteChecked">批量删除</el-button>
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
            <el-table-column prop="vName" label="姓名" width="100"></el-table-column>
            <el-table-column prop="event" label="违章事件" width=""></el-table-column>
            <el-table-column prop="vSex" label="性别" width="100"></el-table-column>
            <el-table-column prop="property" label="属性" width="100"></el-table-column>
            <el-table-column prop="depart" label="单位" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
            <el-table-column prop="idCard" label="身份证" width="200"></el-table-column>
            <el-table-column prop="vTime" label="时间" width="200"></el-table-column>
            <el-table-column prop="rongNu" label="违章次数" width="100"></el-table-column>
<!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
<!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
            <el-table-column prop="grade" label="违章等级" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.grade == '一般'">一般</el-tag>
                    <el-tag type="warning" v-if="scope.row.grade == '轻微'">轻微</el-tag>
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
                            <el-form-item label="姓名">
                                <el-input v-model="customer.vName"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="customer.depart"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="customer.vSex" placeholder="请选择">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
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
                                <el-select v-model="customer.property" >
                                    <el-option label="公司员工" value="公司员工"></el-option>
                                    <el-option label="外来访客" value="外来访客"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="违章事件">
                            <el-input v-model="customer.event" ></el-input>
                        </el-form-item>
<!--                            <el-form-item label="类别">-->
<!--                                <el-input v-model="customer.times"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="填表日期">-->
<!--                                <el-input v-model="customer.creatTime"></el-input>-->
<!--                            </el-form-item>-->

                            <el-form-item label="违章次数">
                                <el-input v-model="customer.rongNu"></el-input>
                            </el-form-item>
                            <el-form-item label="时间">
                                <el-date-picker
                                        v-model="customer.vTime"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="违章等级">
                                <el-select v-model="customer.grade" placeholder="请选择" style="width: 200px;">
                                    <el-option label="一般" value="一般"></el-option>
                                    <el-option label="轻微" value="轻微"></el-option>
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
                    <el-form-item label="姓名">
                        <el-input v-model="form.vName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="来访目的">-->
<!--                        <el-input v-model="form.target" placeholder="请输入来访目的"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="单位">
                        <el-input v-model="form.depart" placeholder="请输入单位"></el-input>
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
                <div style="display:flex; justify-content: space-between;">
                    <el-form-item label="性别">
                        <el-select v-model="form.vSex" placeholder="请选择" style="width: 200px;">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="属性">
                        <el-select v-model="form.property" @change="proChenge" placeholder="请选择" style="width: 200px;">
                            <el-option :label="item.label" :value="item.value" v-for="item in form.propertys"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="时间">
                        <el-date-picker
                                style="width: 200px;"
                                v-model="form.vTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div style="display:flex;">
                    <el-form-item label="违章事件">
                        <el-input
                                style="width: 200px;"
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                v-model="form.event">
                        </el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="违章等级">
                        <el-select v-model="form.grade" placeholder="请选择" style="width: 200px;">
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
                rowNum: [ ],

                form: {
                    rongNu: 1,
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
                            value: '严重',
                            label: '严重'
                        },
                    ],
                    rowNumq: 0

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
                this.rows.splice(this.rows.length - this.rowNumq,1,this.customer);
                this.dialog_detail_showing = false;
            },
            desPass(){
                this.rows[this.rowNumq].state = '不通过审批';
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
                    this.form.rongNu = 1
                }else {
                    let num = sum[0].num;
                    console.log(sum[0].num);
                    this.addCount(num)
                }
                this.dialog_add_showing =false;
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
