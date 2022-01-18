<template>
  
  <div class="container" style="margin-bottom:100px"> 
     
      <div style="font-size:50px">{{cmsdata.name}}</div>
     <div class="row">
          <div class="col-md-6">
          
          <img :src="cmsimage+cmsdata.image" alt="CMSDATA" style= "height:500px ; width:98%" >
      </div>
      <div  class="col-md-6"  style="font-size:20px">
          {{cmsdata.description}}
      </div>
     </div>
  </div>
</template>

<script>
import {getcmsbyid} from '../../comman/services' 
import { URL_CMS_IMAGE } from "../../comman/url";
export default {
    name:"Moreinfo",
    data(){
        return{
            cmsid: this.$route.params.id,
            cmsimage:URL_CMS_IMAGE,
            cmsdata:'',
        }
    },
     mounted() {
    // axios.get(`${URL_USER}categoryproducts/` + this.paramm).then((res) => {
        getcmsbyid(this.cmsid)
        .then(res=>{
        this.cmsdata=res.data.cmsdata;
        console.log(res.data.cmsdata);
      })
      .catch(e=>{console.log(e);})
  },
  watch: {
    $route(to) {
      this.paramm = to.params.id;
      // console.log(this.paramm);
       getcmsbyid(this.paramm)
        .then(res=>{
         this.cmsdata=res.data.cmsdata;
       
        // console.log(res.data);
      });
    },
  },
  created(){
      this.paramm=this.$route.params.id
  },

}
</script>

<style>

</style>