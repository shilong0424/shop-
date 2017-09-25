<template>
	<div class="temp">
		<ul class="mui-table-view">
				<li v-for='item in list' class="mui-table-view-cell mui-media">
					<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis' v-text='item.zhaiyao'></p>
							<div class="ft">
	                            <span>发表时间:{{item.add_time | datafmt('YYYY-MM-DD HH:mm:ss')}}</span>
	                            <span>点击数:{{item.click}}</span>
                        	</div>
						</div>
					</router-link>
				</li>
			</ul>
	</div>
</template>
<script>
//引入的是弹出框的组件（按需引用）
import { Toast } from 'mint-ui';
//引入公共的域名路径
import common from '../../kits/common.js';
	export default{
		data(){
			return {
				list:[
				// {
                //     "id": 13,
                //     "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
                //     "add_time": "2015-04-16T03:50:28.000Z",
                //     "zhaiyao": "房企一季度销售业绩已经陆续公布，克而瑞研究中心统计",
                //     "click": 1,
                //     "img_url": "http://182.254.146.100:8080/upload/201504/16/201504161149414479.jpg"
                // }
				]
			}
		},
		created:function(){
			this.getNewsList()
		},
		methods:{
			getNewsList:function(){
				var url =common.apidomain +'/api/getnewslist';
				this.$http.get(url).then(function(res){
					if(res.body.status !=0){
						Toast(res.body.message);
						return;
					}
					this.list = res.body.message;
				})
			}
		}
	}
</script>
<style scoped>
	.mui-table-view img {
		height: 80px;
		width: 80px;
	}
	.mui-table-view .mui-media-object {
		line-height: 80px;
		max-width: 80px;
	}
	.ft {
		margin-top: 1.5em;
		font-size: 14px;
		color:lightblue;
	}
	.ft span:nth-of-type(2){
		margin-left: 20px;
	}
</style>