<template>
  <div class="container">
      <div class="step-one" v-for="(pro,index) in mycart" :key="index">
        <div class="heading text-center"><span class="h1"> ORDER - {{index+1}}</span>  </div>
           
      
        <div>
          <div class=" h3">Order Details</div>

          <div class="row h4">
            <div class="col-md-3">Total Amount - </div>
            <div class="col-md-9">{{pro.amount}} </div>
          </div>

          <div class="row h4">
            <div class="col-md-3">Payment Mode - </div>
            <div class="col-md-9">{{pro.payment_mode}} </div>
          </div>
<div class="row h4">
            <div class="col-md-3">Order ID - </div>
            <div class="col-md-9">{{pro.pro_order_id}} </div>
</div>
<div class="row h4">
            <div class="col-md-3">Payment Status - </div>
            <div class="col-md-9" v-if="pro.payment_status==0"> Pending </div>
            <div class="col-md-9" v-else> Success </div>
            </div>

<div class="row h4">
            <div class="col-md-3">Coupon used </div>
            <div class="col-md-9" v-if="pro.coupon_used"> NOPE </div>
            <div class="col-md-9" v-else> Success </div>
</div>

          
        </div>
        
        <table  class=" " style="width:100% ; margin-top:50px">
          <tr>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
          <tr v-for="(data,ind) in pro.productinfo" :key="ind" >
            <td><img :src="imageurl+data.image" alt="" style="width:101px ; height:101px"></td>
            <td>{{data.product_price}}</td>
            <td>{{data.quantity}}</td>
            <td>{{data.total_price}}</td>
          </tr>
        </table>


      
      </div>
  </div>
</template>

<script>
import {getmyorder} from '../../comman/services'
import {URL_PRODUCT_IMAGE} from '../../comman/url'
export default {
  name:"Myorder",
  data(){
    return{
      mycart:undefined,
      user_id:localStorage.getItem("id"),
      imageurl:URL_PRODUCT_IMAGE,
    }
  },
  mounted(){
    getmyorder(this.user_id)
    .then(res=>{
      this.mycart=res.data.myorder
      console.log(this.mycart);
    })
  },
}
</script>

<style>
    
</style>