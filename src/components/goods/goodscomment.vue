<template>
    <div id="tmpl">
        <comment :id="id"></comment> <!--引用公共组件需要给子组件传值，子组件通过props接收 -->
    </div>
</template>

<script>
    import comment from '../subcom/comment.vue'
    export default {
        data(){
            return {
                id:0,
            }
        },
        created(){
            this.id = this.$route.params.id;
        },
        components:{
            comment //定义子组件，然后用标签形式来使用
        }
    }
</script>

<style scoped>

</style>