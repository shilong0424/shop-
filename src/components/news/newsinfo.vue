<template>
	<div class="temp">
		<div class="temp">
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datafmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content"></div>
        <!-- 1.3 实现评论组件 -->
		<comment :id="id"></comment>
    </div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
//引入公共的域名路径
import common from '../../kits/common.js';
//引入评论组件comment.vue 1.1
import comment from '../subcom/comment.vue';
	export default{
		//1.2 注册评论组件
		components:{
			comment
		},
		data(){
			return {
				id : 0,
				info:{}
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.getInfo();
		},
		methods:{
			getInfo:function(){
				var url =common.apidomain + '/api/getnew/'+this.id;
				this.$http.get(url).then(function(res){
					var body = res.body;
					if(body.status != 0){
						Toast(body.message)
					}
					this.info = body.message[0];
				})
			}
		}
	}
</script>
<style scoped>
	.title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>