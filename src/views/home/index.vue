<template>
    <div style="">
        <div style="text-align: right; margin: 10px 0; width:1200px;">
            <el-button @click="ReLoad()" icon="el-icon-refresh" circle></el-button>
        </div>


        <div style="position: relative; text-align: center; width:1100px; margin: 0 auto;">
            <template v-for="item in info.counters">
                <div style="width: 180px; margin: 5px; display: inline-block;">
                    <el-card shadow="hover" class="c"><p>{{item.value}}</p>
                        <p>{{item.name}}</p></el-card>
                </div>
            </template>
        </div>

        <div style="text-align: center;">
            <template v-for="item in info.bars">
                <chart ref="chart" :options="bar(item)" :auto-resize="false"
                       style="width:1200px; margin: 10px auto;"></chart>
                <div class="title">{{item.name}}</div>
            </template>
        </div>


    </div>
</template>


<script>
    export default {

        data() {
            return {
                loading: false,
                info: {counters: []},
                counter: [
                    {name: "年访客总人数", value: 868},
                    {name: "公司员工", value: 520},
                    {name: "入司", value: 133},
                    {name: "入厂", value: 94},
                    {name: "施工", value: 30},
                    {name: "协力", value: 91},
                    {name: "最近30天外来访客数", value: 17},
                    {name: "最近7天外来访客数", value: 7}
                ],
                bars: [
                    {
                        name: '最近30天外来访客',
                        data: [
                            ["2019-05-16", 2],
                            ["2019-05-17", 0],
                            ["2019-05-18", 0],
                            ["2019-05-19", 1],
                            ["2019-05-20", 0],
                            ["2019-05-21", 1],
                            ["2019-05-22", 0],
                            ["2019-05-23", 0],
                            ["2019-05-24", 3],
                            ["2019-05-25", 0],
                            ["2019-05-26", 2],
                            ["2019-05-27", 0],
                            ["2019-05-28", 1],
                            ["2019-05-29", 0],
                            ["2019-05-30", 0],
                            ["2019-05-31", 0],
                            ["2019-06-01", 2],
                            ["2019-06-02", 0],
                            ["2019-06-03", 1],
                            ["2019-06-04", 0],
                            ["2019-06-05", 0],
                            ["2019-06-06", 1],
                            ["2019-06-07", 0],
                            ["2019-06-08", 0],
                            ["2019-06-09", 2],
                            ["2019-06-10", 0],
                            ["2019-06-11", 0],
                            ["2019-06-12", 1],
                            ["2019-06-13", 0],
                            ["2019-06-14", 0],
                            ["2019-06-15", 0],
                        ]
                    },
                    {
                        name: '最近7天外来访客',
                        data: [
                            ["2019-06-09", 1],
                            ["2019-06-10", 2],
                            ["2019-06-11", 2],
                            ["2019-06-12", 1],
                            ["2019-06-13", 0],
                            ["2019-06-14", 1],
                            ["2019-06-15", 0],
                        ]
                    },
                ]
            }
        },
        mounted: function () {
            this.ReLoad();
        },
        methods: {


            ReLoad: function () {
                this.loading = true;
                this.axios.post("/shop/admin_api/get_base_data").then((res) => {
                    res.data.data.counters = this.counter;
                    res.data.data.bars = this.bars;
                    this.info = res.data.data;
                    this.loading = false;
                    this.$message({message: '刷新成功', type: 'success'});
                });
            },
            bar: function (item) {
                return {
                    title: {text: '',},
                    tooltip: {},
                    xAxis: {type: 'category', axisLabel: {interval: 0, rotate: 45}},
                    yAxis: {},
                    series: [
                        {
                            type: 'bar',
                            data: item.data,
                            itemStyle: {normal: {color: '#409EFF'}},
                        }
                    ]
                };
            },
            pie: function (item) {
                return {
                    title: {text: '',},
                    tooltip: {formatter: "{b}<br>数量：{c}<br>占比：{d}%"},
                    series: [
                        {
                            type: 'pie',
                            radius: ['35%', '70%'],
                            data: item.data,
                        }
                    ]
                }
            }


        },

    }
</script>


<style scoped>
    .c {
        background-color: #409EFF;
        color: #bddeff;
        font-size: 14px;
        text-align: center;
    }

    .c p:first-child {
        font-size: 36px;
        color: #fff;
    }
</style>
