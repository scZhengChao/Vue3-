<template>
<div>

    <button @click='click' ref="root">自定义事件</button>
    <Child v-model:foo.capitalize='imp' v-model.capitalize='modifier' class="test">
        asgas
        <template v-slot:header="headerProp">
            <div>
                这是header
                <p>name:{{headerProp.item.name}}</p>
                <p>age:{{headerProp.item.age}}</p>
            </div>
        </template>
    </Child>

</div>
</template>

<script>
import {computed,defineAsyncComponent,onMounted ,ref,watch} from 'vue'
export default {
    name:'组件',
    created() {
       
    },
    setup(){
        const root = ref(null)
        onMounted(()=>{
            console.log(root.value) // <div>这是根元素</div>
        })
        watch(root,(newValue,oldValue)=>{
            console.log(oldValue,newValue,'watch')
        })
        return {
            root
        }
    },
    errorCaptured(...rest){
        console.log(rest,'errorCaptured')
    },
    renderTracked(...rest){
        console.log(rest,'renderTracked')
    },
    renderTriggered(...rest){
        console.log(rest,'renderTriggered')
    },
    provide(){
        return {
            user:'name',
            model:this.imp,
            model2:computed(() => this.modifier)
        }
    },
    data(){return{
        imp:'2222',
        modifier:'asfasf'
    }},
    components:{
        Child:defineAsyncComponent(()=>import('../components/child.vue'))
    },
    // emits: ['in-focus', 'click'],
    emits:{
        click:null,
        change:(value)=>{
            if(value !== 'zhengchao'){
                return false
            }else{
                return true
            }
        }
    },
    watch:{
        imp(value){
            console.log('imp',value)
        },
        modifier(value){
            console.log(value)
        },

    },
    methods: {
        click(){
            console.log('click 了')
            // this.$emit('click','hahaha')
            this.$emit('change','zhenchao')
        }
    },
}
</script>
<style lang='scss' scoped>
</style>