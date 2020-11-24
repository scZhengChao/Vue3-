<template>
  <div id="nav">
    <router-link to="/" >Home</router-link> |
    <router-link to="/grid" >grid</router-link> |
    <router-link to="/comp" >组件</router-link> |
    <router-link to="/transition" >动画</router-link> 
  </div>
  <router-view @click.native='emit' class="view"/>
</template>

<script>
export default{
    name:'app',
    data(){return{
        
    }},
    methods: {
        emit(data){
            console.log(data)
        }
    },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.view{

}
</style>
