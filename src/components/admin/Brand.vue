<template>
  <div class="brands_products">
    <!--brands_products-->

    <div class="brands-name">
      <ul class="nav nav-pills nav-stacked">
        <li v-for="brand in branddata" :key="brand.id">
       
           <router-link :to=" '/brandcategory/' + brand.id">{{ brand.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { allbrand } from "../../comman/services";
export default {
  name: "Brand",
  data() {
    return {
      branddata: undefined,
    };
  },
  mounted() {
    allbrand().then((res) => {
      this.branddata = res.data.allbrand;
      //   console.log(this.branddata);
    });
  },
};
</script>

<style>
</style>