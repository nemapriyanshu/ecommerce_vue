<template>
  
 <div>
        <li  v-for="(pro,index) in newdetails" :key="index"> 
               <router-link :to="`/moreinfo/${newdetails[index].id}`"> {{newdetails[index].name}}</router-link>
        </li> 
     
 </div>
  
</template>

<script>
import axios from 'axios'


export default {
    name:"More",
    data(){
       return{
            newdetails:undefined
       }
    },
    mounted(){
        axios.get("http://127.0.0.1:8000/api/getcms")
        .then(res=>{
            console.log(res.data);
            this.newdetails=res.data.cmsinfo
        })
    }

}
</script>

<style>

</style>