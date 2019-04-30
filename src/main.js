import Vue from 'vue';
import Quill from 'quill';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import utils from './jslib/utils';
import ElementUI from 'element-ui';
import store from './store/store.js';
import vuePicturePreview from 'vue-picture-preview';
import {ImageExtend} from 'quill-image-extend-module';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './assets/css/iconfont.css';
import './jslib/directives';
import 'babel-polyfill';
import './router/authority';
import './jslib/filter';
// import './assets/css/iconfontTest.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(vuePicturePreview);

Vue.prototype.$axios = axios;
Vue.prototype.$utils= utils;
// 公共七牛
Vue.prototype.$qiniuUrl = 'http://qiniu.mayeeyy.com/';

Quill.register('modules/ImageExtend', ImageExtend);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')