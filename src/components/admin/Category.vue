<template>
  <div class="panel-group category-products " id="accordian">
    <!--category-productsr-->

    <div class="panel panel-default" v-for="cat in categorydata" :key="cat.id">
      <div class="panel-heading">
        <h4 class="panel-title">
          <!-- <a href="#">{{cat.title}}</a> -->
          <router-link :to=" '/checkcategory/' + cat.id">{{cat.title}}</router-link>
        </h4>
      </div>
    </div>

  
  </div>
</template>

<script>
import {allcategory} from '../../comman/services'
export default {
  name: "Category",
  data(){
      return{
        categorydata:undefined
      }
  },
  mounted()
  {
      allcategory()
      .then(res=>{
          this.categorydata=res.data.allcategory;
          
        //   console.log(this.categorydata);
      })
  }
};
</script>

<style>
</style>