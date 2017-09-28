// 1.0 导入vue核心包
import Vue from 'vue';
// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将 vue-route 集成到这个项目中来
import VueRouter from 'vue-router';
// 3.0.1 将 vueRoute 对象绑定到vue对象上
Vue.use(VueRouter);
// 3.0.2 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodsList from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
// 3.0.3 定义路由规则
var router1 = new VueRouter({
	linkActiveClass : 'mui-active',
	routes : [
		{path : '/',component: home},	//当服务器刷新的时候自动进入主页面
		{path : '/home', component: home},
		{path : '/shopcar', component: shopcar},
		{path : '/news/newslist',component:newslist},
		{path : '/news/newsinfo/:id',component:newsinfo},//绑定分页的路由规则
		{path : '/photo/photolist',component:photolist},
		{path : '/photo/photoinfo/:id',component:photoinfo},
		{path : '/goods/goodslist',component:goodsList},
		{path : '/goods/goodsinfo/:id',component:goodsinfo},
		{path : '/goods/goodsdesc/:id',component:goodsdesc},
		{path : '/goods/goodscomment/:id',component:goodscomment}
	]
})

// 4.0 使用mint-ui
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css'
// 4.1 将 mint-ui 对象绑定到vue对象上
Vue.use(mintUi);

// 5.0 使用mui
import '../statics/mui/css/mui.css'

// 6.0 引入全局 css
import '../statics/css/site.css'
// 7.0 引入vue-resource， 并绑定， 就会自动在Vue实例上注册一个$http对象
import VueResource from 'vue-resource';
Vue.use(VueResource);
//8.0 引入monent 绑定
import moment from 'moment';
//8.1 使用全局过滤器来利用moment插件
Vue.filter('datafmt',function(input,fmtstring){//input he fmtstring都不要带引号
	return moment(input).format(fmtstring);
});
// 9.0 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 3.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router: router1,
	render:c=>c(App)
});
