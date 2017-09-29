<template lang="html">
    <div id="tmpl">
        <div class="row" v-for="(item,index) in datalist">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li>购买数量组件</li>
						<li><a href="#">删除</a></li>
					</ul>

				</div>
			</div>
		</div>
		{{value}}
    </div>
</template>

<script>
    import {getshopData} from '../../kits/localSG.js';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    
export default {
    data(){
        return {
            value:[],//引入的插件选择当前这个商品的index
            datalist:[
//                {
//						"cou": 1,
//						"id": 87,
//						"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//						"sell_price": 2195,
//						"thumb_path": "http://www.webhm.top:8080/upload/201504/20/thumb_201504200046594439.jpg"
//					},
            ]
        }
    },
    created(){
        this.getshopList();
    },
    methods:{
        getshopList(){
            //1.0 先获取到从本地存储中拿到的数据
            var obj = getshopData();
            //	2.0 将id值按照 api的参数格式提交给api
            var idstring = '';
            for(var key in obj){
                idstring+= key + ',';
            }
            //去掉最后一个逗号
            idstring = idstring.substring(0,idstring.length-1);
            //3.0 把id传给url中
            var url =  common.apidomain + '/api/goods/getshopcarlist/'+idstring;
            this.$http.get(url).then(function(res){
                if(res.body.status !=0){
                    Toast(res.body.message);
                }
                this.datalist = res.body.message;
            });
        }
    }
}
</script>

<style lang="css">
    .row{
        border-bottom: 1px solid rgba(0,0,0,0.3);
        height: 102px;
        display: flex;
        padding: 5px;
    }

    .switch{
        flex:0 0 52px;
    }

    .img{
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
    }

    .inforight{
        margin-left: 5px;
        flex:1;
    }
    .inforight ul{
        padding-left: 0px;
    }
    .inforight li{
        list-style: none;
        display: inline-block;
    }

    .inforight h4{
        color: #0094ff;
        font-size: 14px;
    }

    .bottom li:first-child{
        color:red;
        margin-right: 5px;
    }

    .bottom li:last-child{
        margin-left: 5px;
    }
</style>
