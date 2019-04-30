import Vue from 'vue';
import axios from 'axios';
import Quill from 'quill';
import App from './App.vue';
import router from './router';
import utils from './jslib/utils';
import ElementUI from 'element-ui';
import store from './store/store.js';
import vuePicturePreview from 'vue-picture-preview';//图片预览
import {ImageExtend} from 'quill-image-extend-module';//富文本图片配置
import "babel-polyfill";
import './jslib/filter';
import './router/authority';
import './jslib/directives';
import './assets/css/icon.css';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

Vue.use(vuePicturePreview);

Vue.prototype.$utils= utils;
Vue.prototype.$axios = axios;

Quill.register('modules/ImageExtend', ImageExtend);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')