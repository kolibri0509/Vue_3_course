<template>
  <navbar></navbar>
  <div  class="app"></div>
  
  <router-view></router-view>
</template>

<script>
import Navbar from '@/components/UI/Navbar.vue'
export default {
    components:{
        Navbar,
    }
}
</script>

<style>
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}
.app{
padding: 20px;
} 
</style>