<template>
    <div class="box">
        <h1>clamp测试测试测试测试</h1>
        <div class="container">
 
            <div 
            class="item"
            :style="{
                'background': `rgb(${Math.floor(Math.random()*255)},    ${Math.floor(Math.random()*255)},    ${Math.floor(Math.random()*255)}`
            }"
            v-for="i in list">
                {{i}}
            </div>
        </div>
    </div>
    <div v-bind="$attrs">
        asasga
    </div>

</template>


<script>
  export default {
    name: 'grid',
    data() {
      return {
        list:[1,2,3,4,5,6]
      }
    },
    created() {

    },
  }

</script>
<style scoped>
    h1 {
        font-size: 50px;
        font-size: clamp(16px, 5vw, 34px);
    }
    
  .item {
    background: #ddd;
    margin: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    height: 50px;
  }

  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
  }

  /* .container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  } */

  /* .container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
  } */

  /* .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
  } */

  /* .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  } */

</style>
