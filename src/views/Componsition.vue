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
        <li>{{foo}}</li>
        <li :disabled='attribute'>attribute</li>
    </ul>
    <p v-highlight="'yellow'">{{ $filters.currencyUSD(accountBalance) }}</p>
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />checkbox

</div>
</template>

<script>
import { ref,toRefs, computed, onMounted,getCurrentInstance ,watchEffect,reactive,unref,isRef,isProxy,watch } from 'vue'

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
        accountBalance:'000',
        attribute:0,
        toggle:null,
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
       
        // setTimeout(()=>{
        //     this.increment()
        // },2000)
    },
    setup(props,ctx) {
        console.log(ctx)
        const count = ref(0)
        const double = computed(() => count.value * 2)
        console.log(double.value,'double+++')
        const  { proxy, data } = getCurrentInstance()
        function increment() {
            count.value++
        }
        const state = reactive({
            foo: 'foo',
        })
        const countValue = unref(state) // foo是我们要的值
        // 等效于
        // const foo = isRef(props.foo) ? props.foo.value : props.foo
        
        watchEffect( onInvalidate => {
            // console.log(proxy.accountBalance) // foo变化会有输出
            // console.log(data.accountBalance) // foo变化会有输出
            console.log(count.value,'watcheffect+++====')
            console.log(state.foo,'watcheffect+++====')
            onInvalidate(() => {
                console.log('onInvalidate========')
            })
        },{
            flush:'post',//sync pre
            onTrigger(e) {
                // debugger
            },
            onTrack(){

            }
        })
        // setTimeout(()=>{
            // count.value ++
        // },2000)
        watch(_=>proxy.toggle,(newValue,oldValue)=>{
            console.log(newValue,oldValue)
        })
        // state.foo = 'foo' // 输出 'foooooo'
        onMounted(() =>{
            count.value ++
            proxy.accountBalance = '8888'
            state.foo ='mounted'
            console.log('onMounted')
        })
        return {
            count,
            double,
            increment,
            state,
            watch,
            watchEffect,
            ...toRefs(state)
        }
    },
    mounted() {
        console.log('Mounted')
    },
}
</script>
<style lang='scss' scoped>
    web-html{
        color: red;
    }
</style>