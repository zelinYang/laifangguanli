<template>
    <div>
        <!-- 按钮与筛选 -->
        <el-row :gutter="0" type="flex" justify="space-between" style="margin: 10px 0;">
            <!-- 按钮 -->
            <el-col :span="20">
                <el-button-group style="margin-right: 10px;">
                    <el-button icon="el-icon-refresh" @click="ReLoad()" :loading="loading">刷新</el-button>
                </el-button-group>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="4">
                <el-input placeholder="请输入要查找的车牌号" class="input-with-select" prefix-icon="el-icon-search"
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
            <el-table-column prop="cName" label="车牌号" width=""></el-table-column>
            <el-table-column prop="cpName" label="车主姓名" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
            <el-table-column prop="idCard" label="证件号" width="200"></el-table-column>
            <el-table-column prop="time" label="记录时间" width="200"></el-table-column>

            <!--            <el-table-column prop="depart" label="受访部门" width="180"></el-table-column>-->
            <!--            <el-table-column prop="vPeple" label="受访对象" width="100"></el-table-column>-->
            <el-table-column prop="state" label="车主属性" width="100">
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.state == '预约'">预约</el-tag>
                    <el-tag type="success" v-if="scope.row.state == '政府'">政府</el-tag>
                    <el-tag type=" " v-if="scope.row.state == '客户'">客户</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" @click="deleteR(scope.row)"
                               style="margin-right: 10px;">删除记录
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


    </div>
</template>


<script>
    import Detail from '@/views/customer/detail.vue';
    import AddForm from '@/views/customer/add-form.vue';

    export default {
        name: "wailaichel",
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


            };
        },

        mounted() {
            this.ReLoad();
        },
        methods: {
            ReLoad() {
                this.loading = true;
                this.axios.post('/cart/wailai').then((res) => {
                    this.rows = res.data;
                    // this.riws = res.data;
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
            searchName() {
                this.$message({message: '此功能尚在开发中', type: 'warning'});
            },
            deleteR(val){
                console.log(val.num);
            }
        },
        computed: {},
        components: {Detail, AddForm}
    }
</script>
