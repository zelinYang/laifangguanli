const Mock = require('mockjs');


let random = Mock.Random;

// 审批管理的模拟数据
(function () {
    let arr = [];
    for (let i = 0; i < 100; i++) {
        let prot = setPro()
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
            vPeple: random.cname(),
            // 填表时间
            creatTime: getTime(),
            // 将预约的时间
            vTime: getVTime(),
            // 编号
            num: i + 1,
            // 身份证号
            idCard: setIdcard(),
            // 手机号
            mobile: '17687576301',
            // 状态
            state: setState(),
            // 预约方式
            fun: setFun(),
            // 人数
            pepleN: 1,
            // 访客属性
            property: prot,
            // 访问时长
            times: setTimes(prot)
        };
        arr.push(obj)
    }


    function setIdcard() {
        let cardN = ''
        for(let i = 0;i <18;i ++){
            let ran = Math.round(Math.random() * 9)
            cardN += ran
        }
        return cardN
    }
    function setState() {
        let sArr = ['未审批','已通过','不通过'];
        let num = Math.round(Math.random() * (sArr.length - 1));
        return sArr[num];
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

    function setTimes(val){
        let tArr = ['临时','短期','常驻'];
        let tErr = ['临时','短期'];
        if(val === '协力'){
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }else {
            let num = Math.round(Math.random() * (tErr.length - 1));
            return tErr[num]
        }
    }
    function setPro(){
        let pArr = ['入司','入厂','施工','协力'];
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
    }


    let flag = true;

    function getVTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        // let MM = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        // let DD = date.getDate() > 10 ? date.getDate() + setD() : `0${date.getDate() + setD()}`;
        // let HH = date.getHours() > 10? date.getHours() : `0${getHours()}`;
        // let mm = date.getMinutes() > 10? date.getMinutes() : `0${getMinutes()}`;
        // let SS = date.getSeconds() > 10? date.getSeconds() : `0${getSeconds()}`;
        let MD = setDate()

        return `${YY}-${MD.MM}-${MD.DD} ${setHour()}:${setMinute()}`;

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
        function setDate() {
            debugger;
            let obj = {}
            let oNum = Math.round(Math.random() * 9);
            let DD = date.getDate() + oNum
            let MM = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
            if(DD > 30){
                MM = date.getMonth() > 10 ? date.getMonth() + 2 : `0${date.getMonth() + 2}`;
                DD = `0${oNum}`;
            }
            obj.MM = MM;
            obj.DD = DD;
            return obj;
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


    Mock.mock('/vistor/getTable', 'post', arr.reverse());
})();

// 人员管理的模拟数据
// 公司员工/常驻
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
            idCard: '450228199999991234',
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
            pType: setPtype(),

        };
        arr.push(obj)
    }

    function setPtype() {
        let pArr = ['公司员工','协力常驻']
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
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
            let tArr = [];
            for (let i = 0; i < 60; i++) {
                tArr.push(i > 9 ? i : `0${i}`)
            }
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }

        function setMinute() {
            let tArr = [];
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

    Mock.mock('/peple/employee/getTable', 'post', arr.reverse());

})();

// 短期
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
            idCard: '450228199999991234',
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
            pType: setPtype(),

        };
        arr.push(obj)
    }

    function setPtype() {
        let pArr = ['入厂','入司','施工','协力']
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
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

    Mock.mock('/peple/xieli/getTable', 'post', arr.reverse());

})();

// 临时
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
            idCard: '450228199999991234',
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
            pType: setPtype(),

        };
        arr.push(obj)
    }

    function setPtype() {
        let pArr = ['入厂','入司','施工','协力']
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
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

    Mock.mock('/peple/linshi/getTable', 'post', arr.reverse());

})();

// 车辆管理模拟数据
//内部车辆
(function () {
    let arr = [];
    for(let i = 0;i < 100;i ++){
        let obj = {
            num: i + 1,
            cName: `粤A${setCName()}`,
            cpName: random.cname(),
            mobile: '17687576301',
            state:setState(),
            time: setTime()
        };
        arr.push(obj);
    }

    function setCName(){
        let sum = '';
        for (let i = 0; i < 4; i++) {
            let rand = Math.round(Math.random() * 9);
            sum += rand
        }
        return sum;
    }

    function setState() {
        let hArr = ['公司车', '办证车', '通勤车', '自备车'];
        let num = Math.round(Math.random() * 3);
        return hArr[num];
    }

    function setTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let DD = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let HH = date.getHours() > 9? date.getHours() : `0${date.getHours()}`;
        let mm = date.getMinutes() > 9? date.getMinutes() : `0${date.getMinutes()}`;
        let SS = date.getSeconds() > 9? date.getSeconds() : `0${date.getSeconds()}`;

        return `${YY}-${MM}-${DD} ${HH}:${mm}:${SS}`;


    }

    Mock.mock('/cart/neibu','post',arr.reverse())
})();

// 外来车辆
(function () {
    let arr = [];
    for(let i = 0;i < 100;i ++){
        let obj = {
            num: i + 1,
            cName: `粤A${setCName()}`,
            cpName: random.cname(),
            mobile: '17687576301',
            state:setState(),
            time: setTime(),
            idCard: setIDC()
        };
        arr.push(obj);
    }

    function setIDC() {
        let sum = '';
        for (let i = 0; i < 18; i++) {
            let rand = Math.round(Math.random() * 9);
            sum += rand
        }
        return sum;
    }


    function setCName(){
        let sum = '';
        for (let i = 0; i < 4; i++) {
            let rand = Math.round(Math.random() * 9);
            sum += rand
        }
        return sum;
    }

    function setState() {
        let hArr = ['预约','政府','客户'];
        let num = Math.round(Math.random() * 2);
        return hArr[num];
    }

    function setTime() {
        const date = new Date();
        // console.log(date.getMinutes());
        let YY = date.getFullYear();
        let MM = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        let DD = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let HH = date.getHours() > 9? date.getHours() : `0${date.getHours()}`;
        let mm = date.getMinutes() > 9? date.getMinutes() : `0${date.getMinutes()}`;
        let SS = date.getSeconds() > 9? date.getSeconds() : `0${date.getSeconds()}`;

        return `${YY}-${MM}-${DD} ${HH}:${mm}:${SS}`;


    }

    Mock.mock('/cart/wailai','post',arr.reverse())
})();

// 违章管理的模拟数据
// 人员违章
(function () {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let prot = setPro();
        let part = setDepart(prot);
        let black = setGrade();
        let rongNum = setNum()
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
            depart: part,
            // 受访人
            vPeple: 'XXX',
            // 填表时间
            creatTime: getTime(),
            // 将预约的时间
            vTime: getVTime(),
            // 编号
            num: i + 1,
            // 身份证号
            idCard: setidCard(),
            // 手机号
            mobile: '17687576301',
            // 状态
            state: setState(),
            // 预约方式
            fun: setFun(),
            // 人数
            pepleN: 1,
            // 访客属性
            property: prot,
            // 访问时长
            times: setTimes(prot),
            // 违章等级
            grade: black,
            event: setEvent(prot),
            isToBlake: setToB(black),
            rongNu: rongNum
        };
        arr.push(obj)
    }

    function setidCard() {
        let cNum = '';
        for(let i = 0;i < 18;i ++){
            let ran = Math.round(Math.random() * 9);
            cNum += ran;
        }
        return cNum;
    }

    function setNum() {
        return Math.round(Math.random() *10)
    }
    function setToB(val) {
        if (val === '严重') {
            return '是'
        }else{
            return '否'
        }
    }

    function setEvent(val){
        let eArr = ['现场预约','强行过闸','未预约过闸','来访超时','蒙混过闸'];
        let aArr = ['不刷卡过闸'];
        if(val === '外来访客'){
            let num = Math.round(Math.random() * (eArr.length - 1));
            return eArr[num];
        }else {
            let num = Math.round(Math.random() * (aArr.length - 1));
            return aArr[num];
        }
    }

    function setGrade() {
        let gArr = ['一般','轻微','严重'];
        let num = Math.round(Math.random() * (gArr.length - 1))
        return gArr[num]
    }



    function setDepart(val) {
        let tArr = [
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
        let tErr = ['总经办','策划部','销售部','技术部'];
        if(val === '外来访客'){
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }else {
            let num = Math.round(Math.random() * (tErr.length - 1));
            return tErr[num]
        }
    }


    function setState() {
        let sArr = ['未审批','通过审批','不通过审批'];
        let num = Math.round(Math.random() * (sArr.length - 1));
        return sArr[num];
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

    function setTimes(val){
        let tArr = ['临时','短期','常驻'];
        let tErr = ['临时','短期'];
        if(val === '协力'){
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }else {
            let num = Math.round(Math.random() * (tErr.length - 1));
            return tErr[num]
        }
    }
    function setPro(){
        let pArr = ['公司员工','外来访客'];
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
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


    Mock.mock('/weiz/getTable', 'post', arr.reverse());
})();

// 车辆违章
(function () {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let prot = setPro();
        let part = setDepart(prot);
        let black = setGrade();
        let rongNum = setNum();
        let obj = {
            // 访客姓名
            vName: random.cname(),
            //访客性别
            vSex: setSex(random.bool()),
            // 所在单位
            company: setCop(),
            cName: `粤A${setCName()}`,
            // 来访目的
            target: '技术交流/商务交流',
            // 受访部门
            depart: part,
            // 受访人
            vPeple: 'XXX',
            // 填表时间
            creatTime: getTime(),
            // 将预约的时间
            vTime: getVTime(),
            // 编号
            num: i + 1,
            // 身份证号
            idCard: setidCard(),
            // 手机号
            mobile: '17687576301',
            // 状态
            state: setState(),
            // 预约方式
            fun: setFun(),
            // 人数
            pepleN: 1,
            // 访客属性
            property: prot,
            // 访问时长
            times: setTimes(prot),
            // 违章等级
            grade: black,
            event: setEvent(prot),
            isToBlake: setToB(black),
            rongNu: rongNum
        };
        arr.push(obj)
    }

    function setidCard() {
        let cNum = '';
        for(let i = 0;i < 18;i ++){
            let ran = Math.round(Math.random() * 9);
            cNum += ran;
        }
        return cNum;
    }

    function setNum() {
        let num = Math.round(Math.random() * 10);
        return num
    }
    function setCName(){
        let sum = '';
        for (let i = 0; i < 4; i++) {
            let rand = Math.round(Math.random() * 9);
            sum += rand
        }
        return sum;
    }

    function setToB(val) {
        // debugger;
        if (val === '严重'|| val ==='较严重') {
            return '是'
        }else{
            return '否'
        }
    }

    function setEvent(val){
        let eArr = ['现场预约','强行过闸','未预约过闸','来访超时','蒙混过闸'];
        let aArr = ['不刷卡过闸'];
        if(val === '外来访客'){
            let num = Math.round(Math.random() * (eArr.length - 1));
            return eArr[num];
        }else {
            let num = Math.round(Math.random() * (aArr.length - 1));
            return aArr[num];
        }
    }

    function setGrade() {
        let gArr = ['一般','轻微','较严重','严重'];
        let num = Math.round(Math.random() * (gArr.length - 1))
        return gArr[num]
    }



    function setDepart(val) {
        let tArr = [
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
        let tErr = ['总经办','策划部','销售部','技术部'];
        if(val === '外来访客'){
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }else {
            let num = Math.round(Math.random() * (tErr.length - 1));
            return tErr[num]
        }
    }


    function setState() {
        let sArr = ['未审批','通过审批','不通过审批'];
        let num = Math.round(Math.random() * (sArr.length - 1));
        return sArr[num];
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

    function setTimes(val){
        let tArr = ['临时','短期','常驻'];
        let tErr = ['临时','短期'];
        if(val === '协力'){
            let num = Math.round(Math.random() * (tArr.length - 1));
            return tArr[num];
        }else {
            let num = Math.round(Math.random() * (tErr.length - 1));
            return tErr[num]
        }
    }
    function setPro(){
        let pArr = ['公司车辆','外来车辆'];
        let num = Math.round(Math.random() * (pArr.length - 1))
        return pArr[num]
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


    Mock.mock('/weizcl/getTable', 'post', arr.reverse());

    Mock.mock('/shebgl/tables', 'post', [{
        num: 4,
        vName: '访客管理系统',
        type: 'C3&SQLFKV4.0',
        agu: '可实现访客的综合管理',
        meber: 1,
        depart: '套',
        mobile: '17687576301',
        grade: '正常',
    },
        {
            num: 3,
            vName: '发卡器',
            type: 'DAC FK4160',
            agu: 'USB 接口',
            meber: 2,
            depart: '台',
            mobile: '17687576301',
            grade: '正常',
        },
        {
            num: 2,
            vName: '票据打印机',
            type: '5890T',
            agu: '打印访客凭条',
            meber: 2,
            depart: '台',
            mobile: '17687576301',
            grade: '异常',
        },
        {
            num: 1,
            vName: '二代身份证阅读器',
            type: 'DAC CR880',
            agu: 'USB 接 口 、 有 效 采 集 面 积16mm*14mm',
            meber: 2,
            depart: '台',
            mobile: '17687576301',
            grade: '正常',
        }
    ]);
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
