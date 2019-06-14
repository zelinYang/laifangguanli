const Mock = require('mockjs');

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