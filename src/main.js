import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import service from './utils/request';
import quillEditor from 'vue-quill-editor'
Vue.use(quillEditor);
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {getToken} from './utils/Func'
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Cookies);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

Vue.prototype.$http = service;
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();

    }
    else if(to.path === '/getPassword'){
        next();
    }
    else {
        let token = getToken(); // js中      空字符串和0都是false
        if (!token) {
            next('/login');
        } else {
            next();
        }
    }
});
//时间戳转换时间
Vue.prototype.dateString = function(timestamp) {
    if(!timestamp){
        return '暂无'
    }
    timestamp = Number(timestamp);
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+' ';
    let  h = date.getHours() ;
    if(h <10){
        h = '0'+ h+':';
    }
    else {
        h = h+':'
    }
    let  m = date.getMinutes();
    if(m < 10){
        m = '0' + m +':';
    }
    else {
        m = m+':';
    }
    let s = date.getSeconds();
    if(s <10){
        s = '0'+s;
    }

    return Y+M+D+h+m+s;
};
new Vue({
    service,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
