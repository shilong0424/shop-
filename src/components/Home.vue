<template lang="html">
    <div id="tmpl">
       <!--&lt;!&ndash; &lt;!&ndash; 轮播图组件 &ndash;&gt;-->
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item v-for="item in list" :key="item.id">-->
                <!--<img v-bind:src="item.img">-->
            <!--</mt-swipe-item>-->
        <!--</mt-swipe>&ndash;&gt;-->
        <slider :imgs="list"></slider>
        <!--九宫格 -->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/news/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/photo/photolist">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/goods/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/feedback">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/video">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/callme">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div>
                        </router-link>
                    </li>
		        </ul>

		</div>
    </div>
</template>

<script>
//引入的是弹出框的组件（按需引用）
import { Toast } from 'mint-ui';
import slider from './subcom/slider.vue';
//引入公共的域名路径
import common from '../kits/common.js';
export default {
    components:{
        slider
    },
	data(){
		return {
			list : []
		}
	},
	created : function(){
        // 当页面中的data和methods对象都创建完毕之后，就会自动调用created方法
        this.getImgs()
    },
    methods : {
        getImgs(){
            // 实现轮播组件中的数据请求
            var url =common.apidomain +'/api/getlunbo';
            this.$http.get(url).then(function(res){
                var data = res.body;
                // 错误处理
                if (data.status != 0) {
                    Toast(data.message);
                    return ;
                }
                this.list = data.message;
            })
        }
    }
}
</script>

<style scoped>

    .mui-content,.mui-content ul{
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right:0px;
		border-bottom:0px;
	}
	.mui-grid-view.mui-grid-9{
		border-top:0px;
		border-left:0px;
	}
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}

	.mui-icon-home:before{
		background-image: url(../../statics/imgs/1.png);
	}

	.mui-icon-email:before{
		background-image: url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background-image: url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before{
		background-image: url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background-image: url(../../statics/imgs/5.png);
	}
	.mui-icon-phone:before{
		background-image: url(../../statics/imgs/6.png);
	}
</style>
