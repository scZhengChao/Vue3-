<template>
<div>
    <slot name='header' :item="item"></slot>
    <input type="text" value="foo"    @input="emitValueFoo"  />
    <input type="text" value="modelValue" @input="emitValue">
    <slot></slot>
    {{user}}/{{model}}/{{model2.value}}
</div>
<div class="second" v-bind='$attrs'>
    asgasga
</div>
</template>

<script>
    import {ref,reactive,h} from 'vue'
export default {
    name:'child',
    inject:['user','model','model2'],
    setup(props,ctx){
        console.log(ctx.attrs)
        console.log(ctx.slots)
        console.log(ctx.emit)
        // const readersNumber = ref(0)
        // const book = reactive({ title: 'Vue 3 Guide' })
        // // Please note that we need to explicitly expose ref value here
        // return () => h('div', [readersNumber.value, book.title])
    },
    props:{
        foo:String,
        modelValue:String,
        modelModifiers: {
            default: () => ({})
        },
        fooModifiers: {
            default: () => ({})
        },
    },
    data(){return{
        item:{
            name:10,
            age:12
        }
    }}, 
    mounted() {
     
    },
    methods: {
        emitValue(e) {
            let value = e.target.value
            if (this.modelModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            this.item.name = value
            this.$emit('update:modelValue', value)
        },
        emitValueFoo(e){
            let value = e.target.value
            if (this.fooModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            this.item.age = value
            this.$emit('update:foo',value)
        }
    },
    created() {
        console.log(this.modelModifiers) // { capitalize: true }
        console.log(this.fooModifiers)
    },
}
</script>
<style lang='scss' scoped>

</style>