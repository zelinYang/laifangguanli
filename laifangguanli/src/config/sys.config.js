export default {
        	title: '后台管理系统',
            author: '',
            ver: '1.2',

            menu:[
                {title:'概览', url:'/', icon:'el-icon-date'},
                {title:'客户管理', url:'/customer/list', icon:'el-icon-service'},
                {title:'订单管理', url:'/order/list', icon:'el-icon-edit-outline'},
                {title:'商品与服务管理', url:'/goods/list', icon:'el-icon-goods'},
                {title:'统计分析', url:'/home/counter', icon:'el-icon-sort'},
                {title:'系统设置', url:'/home/system/setup', icon:'el-icon-setting'},
            ],
            api:{
            	login: '/index/user/trylogin',
                
            	coustomer_list: '/customer/admin_api/list_customer',
            	coustomer_info: '/customer/admin_api/get_customer',
            	coustomer_save: '/customer/admin_api/save_customer',
                coustomer_wechat_info: '/customer/admin_api/get_customer_wechat',

                order_list: '/shop/admin_api/list_order',
                order_info: '/shop/admin_api/get_order',
                order_save: '/shop/admin_api/save_order',

                deposit_list: '/deposit/admin_api/list_deposit',
                deposit_info: '/deposit/admin_api/get_deposit',
                deposit_save: '/deposit/admin_api/save_deposit',

                point_list: '/point/admin_api/list_point',
                point_info: '/point/admin_api/get_point',
                point_save: '/point/admin_api/save_point',

                action_list: '/point/admin_api/list_action',
                action_info: '/point/admin_api/get_action',
            }
        }