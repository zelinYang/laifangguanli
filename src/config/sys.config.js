export default {
        	title: '访客管理平台',
            author: '',
            ver: '1.2',

            menu:[
                {title:'概览', url:'/', icon:'el-icon-date'},
                {title:'审批管理', url:'/audit/list', icon:'el-icon-news'},
                {title:'人员管理', url:'/visit/list', icon:'el-icon-s-custom'},
                {title:'车辆管理', url:'/visitCart/list', icon:'el-icon-truck'},
                {title:'报表管理', url:'/table/list', icon:'el-icon-tickets'},
                {title:'配置管理', url:'/home/system/setup', icon:'el-icon-setting'},
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
