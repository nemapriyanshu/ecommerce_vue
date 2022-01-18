<template>
  <div> 
<Header/>  
    <router-view></router-view>
<Footer/>
  </div>
</template>

<script>
import Footer from './components/front/Footer.vue'
import Header from './components/front/Header.vue'
// import Slider from './components/front/Slider.vue'

export default {
  name: 'App',
  components: {
 Footer ,
 Header  
  }
}
</script>

<style>

</style>
