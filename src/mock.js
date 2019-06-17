const Mock = require('mockjs');


let random = Mock.Random;

// 审批管理的模拟数据
(function () {
    let arr = [];
    for (let i = 0; i < 100; i++) {
        let obj = {
            // 访客姓名
            vName: random.cname(),
            //访客性别
            vSex: setSex(random.bool()),
            // 所在单位
            company: setCop(),
            // 来访目的
            target: '技术交流/商务交流',
            // 受访部门
            depart: '技术部/销售部',
            // 受访人
            vPeple: 'XXX',
            // 填表时间
            creatTime: getTime(),
            // 将预约的时间
            vTime: getVTime(),
            // 编号
            num: i + 1,
            // 身份证号
            idCard: '450222XXXXX18位',
            // 手机号
            mobile: '17687576301',
            // 状态
            state: '未审批',
            // 预约方式
            fun: setFun(),
            // 人数
            pepleN: 1

        };
        arr.push(obj)
    }

    function setSex(val) {
        if (val) {
            return '男';
        } else {
            return '女';
        }
    }

    function getTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let DD = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;

        return `${YY}-${MM}-${DD}`;


    }

    let flag = true;

    function getVTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let DD = date.getDate() > 10 ? date.getDate() + 1 : `0${date.getDate() + 1}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;

        return `${YY}-${MM}-${DD} ${setHour()}:${setMinute()}`;

        function setMinute() {
            if (flag) {
                flag = false;
                return '00';
            } else {
                flag = true;
                return '30'
            }
        }

        function setHour() {
            let hArr = ['10', '12', '14', '15'];
            let num = Math.round(Math.random() * 3);
            return hArr[num];
        }
    }


    function setCop() {
        let copArr = [
            "光明乳业",
            "Bingosoft",
            "微游网络",
            "软通动力",
            "道一云",
            "绛门科技",
            "萌友游戏",
            "中望软件",
            "帮啦跑腿",
            "亚美科技"
        ];
        let num = Math.round(Math.random() * 9);
        return copArr[num];
    }


    function setFun() {
        let copArr = ['电话预约', '短信预约', '网络预约'];
        let num = Math.round(Math.random() * 2);
        return copArr[num];
    }


    Mock.mock('/vistor/getTable', 'post', arr);
})();

// 人员管理的模拟数据
// 公司员工
(function () {
    let arr = [];

    function setInNum() {
        let iArr = [];
        for (let i = 320; i < 460; i++) {
            iArr.push(i)
        }
        let num = Math.round(Math.random() * (iArr.length - 1));
        return iArr[num];
    }

    for (let i = 0; i < 520; i++) {
        let intNum = setInNum()
        let obj = {
            // 员工姓名
            emName: random.cname(),
            // 性别
            emSex: setSex(random.bool()),
            // 所在部门
            depart: setDepart(),
            // 电话号码
            mobile: '17687576301',
            // 身份证号
            idCard: '450222XXXXX18位',
            // 工号
            workNum: `GJSS00${i + 1}`,
            // 门禁卡号
            dorCardNum: `GJSS00${i + 1}`,
            // 最近的入闸时间
            intoTime: getTime(),
            // 最近的出闸时间
            leaveTime: getLTime(),
            // 编号
            num: i + 1,
            // 累计入闸
            intoNum: intNum,
            leaveNum: intNum,

        };
        arr.push(obj)
    }

    function setSex(val) {
        if (val) {
            return '男';
        } else {
            return '女';
        }
    }

    function setDepart() {
        let dArr = ['总经办', '策划部', '技术部', '销售部'];
        let num = Math.round(Math.random() * 3);
        return dArr[num];
    };

    function getTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`;
        let DD = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;

        return `${YY}-${MM}-${DD} ${setHour()}:${setMinute()}:${setSecond()}`;


        function setSecond() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setMinute() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setHour() {
            let hArr = ['08', '09', '10', '11', '12'];
            let num = Math.round(Math.random() * 3);
            return hArr[num];
        }
    }

    function getLTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() - 1 : `0${date.getMonth() - 1}`;
        let DD = date.getDate() > 10 ? date.getDate() - 1 : `0${date.getDate() - 1}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;

        return `${YY}-${MM}-${DD} ${setHour()}:${setMinute()}:${setSecond()}`;


        function setSecond() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setMinute() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setHour() {
            let hArr = ['17', '18', '19', '20', '21'];
            let num = Math.round(Math.random() * 3);
            return hArr[num];
        }

    }

    Mock.mock('/peple/employee/getTable', 'post', arr);

})();

// 协力
(function () {
    let arr = [];
    for (let i = 0; i < 60; i++) {
        let obj = {
            // 编号
            num: i + 1,
            // 协力姓名
            xName: random.cname(),
            // 性别
            xSex: setSex(random.bool()),
            // 协力人员类别
            xType: setXType(),
            // 协力常驻人员门禁卡号
            cardNum: setCardNum(setXType()),
            // 最近入闸的时间
            intoTime: getTime(),
            // 最近的出闸时间
            leaveTime: getLTime(setSate(setXType())),
            // 访客状态
            xState: setSate(setXType())
        };
        arr.push(obj)
    }

    function setXType() {
        let tArr = ['临时', '短期', '常驻'];
        let num = Math.round(Math.random() * 2);
        return tArr[num]
    }

    function setCardNum(val) {
        let cArr = [];
        for (let i = 540; i < 600; i++) {
            cArr.push(`GJSSCZ00${i}`)
        }
        let num = Math.round(Math.random() * cArr.length - 1);
        if (val === '常驻') {
            return cArr[num];
        }
    }

    function setSex(val) {
        if (val) {
            return '男';
        } else {
            return '女';
        }
    }

    function getTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`;
        let DD = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;


        return `${YY}-${MM}-${DD} ${setHour()}:${setMinute()}:${setSecond()}`;


        function setSecond() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setMinute() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setHour() {
            let hArr = ['08', '09', '10', '11', '12'];
            let num = Math.round(Math.random() * 3);
            return hArr[num];
        }
    }
    function getLTime(val) {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 10 ? date.getMonth() - 1 : `0${date.getMonth() - 1}`;
        let DD = date.getDate() > 10 ? date.getDate() - 1 : `0${date.getDate() - 1}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;

        if(val !== '正在办理业务'){
            return `${YY}-${MM}-${DD} ${setHour()}:${setMinute()}:${setSecond()}`;
        }


        function setSecond() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setMinute() {
            let tArr = []
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setHour() {
            let hArr = ['17', '18', '19', '20', '21'];
            let num = Math.round(Math.random() * 3);
            return hArr[num];
        }

    }
    let flag = true;
    function setSate(val) {
        if(val !== '常驻'){
            if(flag){
                flag = false;
                return '正在办理业务';
            }else {
                flag = true;
                return '已办完离司';
            }
        }
    }
    Mock.mock('/peple/xieli/getTable', 'post', arr);
})();
/*
// System
Mock.mock('/index/user/trylogin', 'post', {errcode:0});
Mock.mock('/index/admin_api/list_action', 'post', {errcode:0, data:[{title:'登录', }]});
Mock.mock('/index/admin_api/upload', 'post', {errcode:0, data:{url: require('@/assets/demo-card.jpg') }});
Mock.mock('/index/admin_api/system_info', 'post', {errcode:0, data:[{title:'固若金汤管理平台', }]});


// Customer
Mock.mock('/customer/admin_api/get_customer_counter', 'post', {errcode:0, data:{total:1321, today:21, yestoday:36, last7days:220, last30days:1022, thisyear:15001} });
Mock.mock('/customer/admin_api/list_customer', 'post', {errcode:0, data:{total:1, rows:[{id:1, username:'张飞',mobile:13978887888}]}});
Mock.mock('/customer/admin_api/get_customer', 'post', {errcode:0, data:{id:1, username:'张飞',mobile:13978887888}});
Mock.mock('/customer/admin_api/list_customer_class', 'post', {errcode:0, data:[{id:1, title:'普通会员'}, {id:2, title:'白金会员'}] });
Mock.mock('/customer/admin_api/save_customer', 'post', {errcode:0});
Mock.mock('/customer/admin_api/get_customer_wechat', 'post', {errcode:0, data:{id:1, nickanme:'koen', city:'南宁'} });
Mock.mock('/customer/admin_api/list_vip', 'post', {errcode:0, data:{total:1, rows:[{id:1, title:'普通会员', customer_count:87, status:1}]} });
Mock.mock('/customer/admin_api/save_vip', 'post', {errcode:0});
Mock.mock('/customer/admin_api/get_vip', 'post', {errcode:0, data:{title:'金卡', bkimg:require('@/assets/demo-card.jpg'), status:1, remark:'这是一张金卡', }});


// Shop
Mock.mock('/shop/admin_api/list_order', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });
Mock.mock('/shop/admin_api/get_order', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });

// Point
Mock.mock('/point/admin_api/list_point', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });
Mock.mock('/point/admin_api/get_point', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });

// Deposit
Mock.mock('/deposit/admin_api/list_deposit', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });
Mock.mock('/deposit/admin_api/get_deposit', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'普通消费', time_make:'2018-12-30 14:34:21'}]} });

// ActionLog
Mock.mock('/point/admin_api/list_action', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'微信端登录', time_make:'2018-12-30 14:34:21'}]} });


// 团队下线
Mock.mock('/subuser/admin_api/list_action', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'微信端登录', time_make:'2018-12-30 14:34:21'}]} });

// 奖励
Mock.mock('/award/admin_api/list_action', 'post', { errcode:0, data:{total:1, rows:[{id:1, title:'微信端登录', time_make:'2018-12-30 14:34:21'}]} });


*/
