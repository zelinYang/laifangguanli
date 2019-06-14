import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);




// axios
import axios from 'axios'
Vue.prototype.axios = axios;
axios.interceptors.response.use((res)=>{
    const data = res.data;
    return res;
},(err)=>{
    Vue.prototype.$message.error('网络错误，请稍后再试。');
    return {data: {error: -1 }};
});



// 富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);



// echarts
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
Vue.component('chart', ECharts)



// font-awesome/css/font-awesome.min.css
import 'font-awesome/css/font-awesome.min.css';


// mockjs
require('./mock');


// 
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
