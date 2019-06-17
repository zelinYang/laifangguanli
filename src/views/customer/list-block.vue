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
                    <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
                </el-button-group>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="4">
                <el-input placeholder="请输入要查找人的姓名" class="input-with-select" prefix-icon="el-icon-search"
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
            <el-table-column prop="vName" label="姓名" width=""></el-table-column>
            <el-table-column prop="vSex" label="性别" width="100"></el-table-column>
            <el-table-column prop="fun" label="预约方式" width="100"></el-table-column>
            <el-table-column prop="pepleN" label="来访人数" width="100"></el-table-column>
            <el-table-column prop="company" label="所在单位" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="200"></el-table-column>
            <el-table-column prop="idCard" label="身份证" width="300"></el-table-column>
            <el-table-column prop="creatTime" label="填表日期" width="200"></el-table-column>
            <el-table-column prop="vTime" label="预约时间" width="200"></el-table-column>
            <el-table-column prop="target" label="来访目的" width="180"></el-table-column>
            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>
            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>
            <el-table-column prop="state" label="状态" width="100"></el-table-column>
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
                <el-tab-pane label="访客预约资料">
                    <el-form ref="form" :model="customer" label-width="80px">
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="访客姓名">
                                <el-input v-model="customer.vName" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="访客性别">
                                <el-input v-model="customer.vSex" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所在单位">
                                <el-input v-model="customer.company" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="手机号码">
                                <el-input v-model="customer.mobile" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input v-model="customer.idCard" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-input v-model="customer.state" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="预约方式">
                                <el-input v-model="customer.fun" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="预约时间">
                                <el-input v-model="customer.vTime" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="填表日期">
                                <el-input v-model="customer.creatTime" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: flex;justify-content: space-between">
                            <el-form-item label="来访目的">
                                <el-input v-model="customer.target" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="受访部门">
                                <el-input v-model="customer.depart" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="受访人">
                                <el-input v-model="customer.vPeple" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="desPass">不通过</el-button>
                <el-button type="primary" @click="passA">通 过</el-button>
            </span>
        </el-dialog>


        <el-dialog title="新增预约" :visible.sync="dialog_add_showing" width="1200px">
            <AddForm></AddForm>
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
                    console.log(res.data);
                    this.loading = false;
                });
            },
            handleSizeChange(val) {
                this.pagesize = val;
                this.ReLoad();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ReLoad();
            },
            searchName() {
                this.$message({message: '此功能尚在开发中', type: 'warning'});
            },
            showDetail(val) {
                this.customer = val;
                this.rowNum = parseInt(this.customer.num) -1;
                this.dialog_detail_showing = true;
                console.log(this.customer);
            },
            passA(){
                this.rows[this.rowNum].state = '通过审批';
                this.dialog_detail_showing = false;
            },
            desPass(){
                this.rows[this.rowNum].state = '不通过审批';
                this.dialog_detail_showing = false;
            }
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
