<template>
	<div class="temp">
	<!--1.0 实现提交评论数据到服务器的静态结构-->
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
			<mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
		</div>
	</div>
</template>
<script>
	//引入common.js公共域名的文件
	import common from '../../kits/common.js'
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				postcontent:'',//双向数据绑定获取textarea中客户输入的评论内容
			}
		},
		props:['id'],	//接受父组件传过来的值
		methods:{
			postcomment:function(){	//调用发表的点击事件
				var url = common.apidomain + '/api/getcomments/'+this.id;
				this.$http.post(url,{content:this.postcontent}).then(function(res){
					Toast(res.body.message);
					this.postcontent='';
				})
			}
		}
	}
</script>
<style scoped>
	/* 1.0 实现提交评论样式 */
#postcomment{
	padding: 5px;
}
.p{
	height: 1px;
	width: 100%;
	border-bottom: 1px solid rgba(0,0,0,0.3);
}
	/*2.0 评论列表的样式*/
#list{
	padding: 5px;
}
.title{
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}
</style>