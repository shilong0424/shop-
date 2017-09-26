<template>
	<div id="tmpl">
	<!--1.0 实现提交评论数据到服务器的静态结构-->
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
			<mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
		</div>
		<!-- 2.0 实现评论列表的功能 -->
		<div id="list">
			<h3>评论列表</h3>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					<span>第{{index +1}}楼</span>
					<span>用户名：{{item.user_name}}</span>
					<span>发表时间: {{item.add_time | datafmt('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					 <li class="mui-table-view-cell" v-text="item.content"></li>
				</ul>
			</div>
		</div>
		<!--3.0 实现获取更多按钮-->
		<mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
	</div>
</template>
<script>
	//引入common.js公共域名的文件
	import common from '../../kits/common.js'
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				pageindex:1 , //代表获取api中的第几页评论数据
				postcontent:'',//双向数据绑定获取textarea中客户输入的评论内容
				list:[] //评论列表的数据
			}
		},
		props:['id'],	//接受父组件传过来的值
		created(){
			this.getcommentlist(this.pageindex);//默认加载第一页的数据
		},
		methods:{
			//第1个功能 实现添加评论的功能
			postcomment(){	//调用发表的点击事件
				//确定输入的内容是否为空 
				if(this.postcontent.trim().length <=0 ){
					Toast("您输入的内容不存在");
					return;
				}
				//1.0 确定提交的地址 /api/postcomment/:artid   url地址写错了
				var url = common.apidomain + '/api/postcomment/'+this.id;
				this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
					Toast(res.body.message);
					//把最新的评论数据放到最顶端
					this.list = [{
						"user_name": "匿名用户",
						"add_time": new Date(),
						"content": this.postcontent
					}].concat(this.list);

					//清空输入框的内容
					this.postcontent='';
				})
			},
			//第2个功能 实现评论列表的功能
			getcommentlist(pageindex){
				pageindex = pageindex || 1;
				var url  = common.apidomain + '/api/getcomments/'+this.id+'?pageindex='+pageindex;
				this.$http.get(url).then(function(res){
					var body = res.body;
					if(body.status != 0){
						Toast(body.message);
						return ;
					}
					this.list = this.list.concat(body.message);//把新评论的数据添加到评论列表中

				})
			},
			//第3个功能  点击加载更多
			getmore(){
				this.pageindex++;//当点击加载更多时 让评论页面加上1页
				this.getcommentlist(this.pageindex); //然后重新刷新页面即可

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