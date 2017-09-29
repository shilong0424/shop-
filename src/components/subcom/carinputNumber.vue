<template>
    <div id="subtmpl">
        <div @click="jian">-</div>
        <div v-text="count"></div>
        <div @click="add">+</div>
    </div>
</template>

<script>
    export default {
        props:[],
        data(){
            return {
                count:1 //代表购买商品的数量
            }
        },
        methods:{
            jian(){
                this.count--;
                if(this.count<1){
                    this.count =1;
                }
                this.sendcount();
            },
            add(){
                this.count++;
                this.sendcount();
            },
            sendcount(){
                this.$emit('send',this.count);//给父组件传值
            }
        }
    }
</script>

<style scoped>
    #subtmpl div{
        width: 40px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
    }
</style>