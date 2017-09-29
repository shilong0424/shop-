<template>
    <div id="tmpl">
        <!--1.0轮播图模块-->
        <div class="slider">
            <slider :imgs="imgs"></slider>
        </div>
        <!--2.0 实现商品购买区-->
        <div id="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量：<inputnumber class="inputnumber" v-on:send="getcount"></inputnumber>
                    <transition @before-enter="beforEenter" @enter="Enter" @after-enter="afterEnter">
                        <div v-if="isshow" class="ball"></div>
                    </transition>
                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datafmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>

        <!--3.0 图文详情-->
        <!--4.0 商品评论-->
        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>

        </div>
    </div>
</template>
<script>
    import slider from '../subcom/slider.vue';
    import common from '../../kits/common.js';
    import inputnumber from '../subcom/inputNumber.vue';//引入子组件用来获取传递的count值
    import {vm,COUNTSTR} from '../../kits/vm.js';  //4.1 按需引入把购买的数量值传给购物车图标上
    import {setItem,valueObj} from '../../kits/localSG.js';  //5.0 按需引入本地存储中的setItem，用来存储传入的数据
    export default {
        components:{
            slider,
            inputnumber
        },
        data(){
            return {
                isshow:false,
                inputCount:1,
                id:0,
                imgs:[],
                info:{ //存储数据的详细信息
 //                   "id": 87,
//					"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//					"add_time": "2015-04-19T16:51:03.000Z",
//					"goods_no": "SD9102356032",
//					"stock_quantity": 60,
//					"market_price": 2499,
//					"sell_price": 2195
                }
            }
        },
        created(){
            this.id = this.$route.params.id;//可以拿到url中传入的id值
            this.getimgs();
            this.getinfo();
        },
        methods:{
            //1.0 获取轮播图数据
            getimgs(){
                var url = common.apidomain + '/api/getthumimages/'+this.id;// 少写了var
                this.$http.get(url).then(function(res){
                    this.imgs = res.body.message;
                })
            },
            //2.0 获取详细参数
            getinfo(){
                var url = common.apidomain +'/api/goods/getinfo/'+this.id;
                this.$http.get(url).then(function(res){
                    this.info = res.body.message[0]; //忘加[0]了，请求的数据放在数组中，参数只在[0]第一个数组中
                    //console.log(this.info)
                })
            },
            //3.0 获取子组件inputNumber传过来的count值
            getcount(count){
                //console.log(count);
                this.inputCount = count;
            },
            //4.0 把inputCount购买数量传到购物车图标上
            toshopcar(){
                vm.$emit(COUNTSTR,this.inputCount);//把值传到公共区vm.js上

                //5.1 把购买产品的id和数量保存到本地存储中
                valueObj.goodsid = this.id;
                valueObj.count = this.inputCount;
                //5.2 利用按需引入的setItem把数据传入到localSG.js
                setItem(valueObj);
                this.isshow = !this.isshow;
            },
            //5.0 实现小球动画
            beforEenter(el){
                el.style.transform="translate(0px,0px)";
            },
            Enter(el,done){
                el.offsetWidth;
                el.style.transform="translate(75px,366px)";
                done();
            },
            afterEnter(el){
                this.isshow = !this.isshow;
            }
        }
    }
</script>
<style scoped>
    .slider{
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        margin: 5px;
    }

    #buy,#params,#other
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    .inputnumber{
        position: absolute;
        left:100px;
        top:5px;
    }
    .ball{
        background-color: red;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        position: absolute;
        left:150px;
        top:10px;
        transition: all 0.4s ease;
        z-index: 100;
    }
</style>