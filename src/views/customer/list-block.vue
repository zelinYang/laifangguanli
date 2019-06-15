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
                <el-input placeholder="" class="input-with-select" prefix-icon="el-icon-search" auto-complete="true"
                          @change="" style="max-width: 280px; float: right;" :clearable="true"></el-input>
            </el-col>
        </el-row>


        <!-- 筛选条件 -->
        <div class="filter_box">
            <div>

            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="rows" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="编号" width="100"></el-table-column>
            <el-table-column prop="vName" label="姓名" width="100"></el-table-column>
            <el-table-column prop="vSex" label="性别" width="100"></el-table-column>
            <el-table-column prop="company" label="所在单位" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="200"></el-table-column>
            <el-table-column prop="idCard" label="身份证" width=""></el-table-column>
            <el-table-column prop="creatTime" label="填表时间" width="300"></el-table-column>
            <el-table-column prop="vTime" label="预约时间" width="280"></el-table-column>
            <el-table-column prop="target" label="来访目的" width="180"></el-table-column>
            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>
            <el-table-column prop="vPeple" label="受访人" width="100"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" @click="customer =scope.row; dialog_detail_showing=true; "
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
                :current-page="list_input.page"
                :page-size="list_input.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="rows.count">
        </el-pagination>


        <el-dialog title="详情" :visible.sync="dialog_detail_showing" :fullscreen="false" width="75%">
            <Detail :id="customer.id"></Detail>
        </el-dialog>


        <el-dialog title="新增" :visible.sync="dialog_add_showing" width="1200px">
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
                loading: false,
                dialog_detail_showing: false,
                dialog_add_showing: false,
                rows: [],
                customer: {},
                user_pic: 'this.src=' + require('@/assets/user.png'),


                list_input: {
                    from_key: '',
                    search: '',
                    page: 1,
                    page_size: 10,
                    filter: {vip_vipcard_id: '', vip_store_id: '', mobile: '', wx_sex: '',},
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
                    console.log(res.data);
                    this.loading = false;
                });
            },
            handleSizeChange: function (val) {
                this.list_input.page = 1;
                this.list_input.page_size = val;
                this.ReLoad();
            },
            handleCurrentChange: function (val) {
                this.list_input.page = val;
                this.ReLoad();
            },
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
