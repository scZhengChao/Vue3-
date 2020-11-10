<template>
<div>
    {{count}}
    {{double}}
    <div v-for="item in list" :ref="setItemRef">{{item}}</div>
    <div @vnodeMounted="myHook" />

    <ul>
        <li v-is="'p'">122</li>
        <li>{{book}}</li>
        <li>{{state.foo}}</li>
    </ul>
    <p v-highlight="'yellow'">{{ $filters.currencyUSD(accountBalance) }}</p>
</div>
</template>

<script>
import { ref, computed, onMounted,getCurrentInstance ,watchEffect,reactive} from 'vue'

export default {
    name:'Componsition',
    inject: {
        book: {
            from: 'guide'
        }
    },
    data(){return{
        list:[1,2,3,4,5,6,7],
        itemRefs:[],
        accountBalance:'000'
    }},
    methods: {
        setItemRef(el) {
            this.itemRefs.push(el)
        },
        myHook(){
    
        }
    },
    beforeUpdate() {
        
        this.itemRefs = []
    },
    updated() {
       
    },
    beforeCreate() {
       
    },
    created() {
       
        setTimeout(()=>{
            this.increment()
        },2000)
    },
    setup(props,ctx) {
        const count = ref(0)
        const double = computed(() => count.value * 2)
        const  { proxy, data } = getCurrentInstance()
        function increment() {
            count.value++
        }
        const state = reactive({
            foo: 'foo',
        })
        
        watchEffect(() => {
            console.log(proxy.accountBalance) // foo变化会有输出
            console.log(data.accountBalance) // foo变化会有输出
            console.log(state.foo)
        })
        state.foo = 'foooooo' // 输出 'foooooo'
        onMounted(() =>{
            proxy.accountBalance = '8888'
        })
        return {
            count,
            double,
            increment,
            state
        }
    },
    mounted() {
       
    },
}
</script>
<style lang='scss' scoped>
    web-html{
        color: red;
    }
</style>