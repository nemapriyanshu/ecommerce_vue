<template>
  <div>
    <section id="cart_items">
      <div class="container"  v-if="allcartitem.length!=0">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><router-link to="/">Home </router-link></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">


          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description"></td>
                <td class="price">Price</td>
                <td class="quantity">Quantity</td>
                <td class="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody  >
              <tr v-for="(pro,index) in allcartitem" :key="index">
                <td class="cart_product">
                  <a href=""><img :src="imageurl+pro.images[0].image" alt="" style="width:101px ; height:101px" /></a>
                </td>
                <td class="cart_description">
                  <h4><a href="">{{pro.productinfo.name}}</a></h4>
                  <!-- <p>Web ID: 1089772</p> -->
                </td>
                <td class="cart_price">
                  <p>&#8377;{{pro.productinfo.price}}</p>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <a class="cart_quantity_up" href="javascript:void(0)" @click="decreasecart(cartdata[index].pid)"> - </a>
                    <input
                      class="cart_quantity_input"
                      type="text"
                      name="quantity"
                      :value="cartdata[index].quantity"
                      autocomplete="off"
                      size="2"
                      disabled

                    />
                    <a class="cart_quantity_down" href="javascript:void(0)" @click="increasecart(cartdata[index].pid)" > +  </a>
                  </div>
                </td>
                <td class="cart_total">
                  <p class="cart_total_price">&#8377;{{cartdata[index].quantity * pro.productinfo.price}}</p>
              
                </td>
                <td class="cart_delete">
                  <a class="cart_quantity_delete" href="javascript:void(0)" @click="deleteitem(cartdata[index].pid)"
                    ><i class="fa fa-times"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          
          </table>
          <div class="col-md-12">
            <div class="">
             
             <div class="row" > 
                  <div class="col-md-6">
                    <router-link to="/Checkout" class="btn btn-lg" style="background-color:orange; color:white;margin:30px 0px" >Check out</router-link>
                  </div>
                <div class="col-md-6" >
                  <span style="font-size:20px ; margin-left:280px">  Cart Sub Total -:</span> <b style="color:orange; font-size:30px ">&#8377;{{totalprices}} </b>    
                </div>

             </div>
            
            
            </div>
          </div>
        </div>
      </div>

       <div  v-else class="text-center container" style="background-color:orange; color:white; font-size:35px">
          There is no any Item in your cart Go and add the item <br>

          <span style=" font-size:25px">
            <router-link to="/product">Add Items</router-link>
          </span>

      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import { productdetails } from "../../comman/services";
import { URL_PRODUCT_IMAGE } from "../../comman/url";
import { mapState } from "vuex";
export default {
  name: "Cart",
  components: {},
  data() {
    return {
      allcartitem: [],
      imageurl:URL_PRODUCT_IMAGE,
      total:0
    };
  },
  computed: mapState({
    cartdata: (state) => state.inCart,
    totalprices(){
      var a=0
     this.allcartitem.map((value,index)=>{
          a+=value.productinfo.price * this.cartdata[index].quantity ;
     });
      return a;
      
    }

  })
  
  ,
  mounted() {
    this.cartdata.map((value) => {
      productdetails(value.pid).then((res) => {
        this.allcartitem.push(res.data);
        // console.log(res.data);
      });
    });
    
  },

  methods:
  {
      increasecart(id) {
      // console.log(id);
      let arr = JSON.parse(localStorage.getItem("myCart"));
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]["pid"] == id) {
          arr[i]["quantity"] += 1;
        }
      }
     
      localStorage.setItem("myCart", JSON.stringify(arr));
      this.$store.dispatch({
        type: "addToCart",
        array: arr,
      });
    },

    decreasecart(id) {
      // console.log(id);
  
      let arr = JSON.parse(localStorage.getItem("myCart"));
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]["pid"] == id) {
          arr[i]["quantity"] -= 1;
          break;
        }
      }
      if (arr[i]["quantity"] <= 0) {
        arr[i]["quantity"] = 1;    
      }
      localStorage.setItem("myCart", JSON.stringify(arr));
      this.$store.dispatch({
        type: "addToCart",
        array: arr,
      });

     
    },

     deleteitem(id) {
      let catt=JSON.parse(localStorage.getItem('myCart'));
      let cat2 = catt.filter((value) => value.pid != id);
      localStorage.setItem("myCart", JSON.stringify(cat2));
      // console.log(this.allcartitem);
      this.allcartitem = this.allcartitem.filter((value) => value.productinfo.id != id);
      // this.$store.dispatch("addToCart", this.cartdata);
  // console.log(this.allcartitem);
 this.$store.dispatch({
        type: "addToCart",
        array: cat2,
      });





    //   var index;
    //   let arr = this.allcartitem;
    //   for (var i = 0; i < arr.length; i++) {
    //     if (arr[i]["pid"] == id) {
    //       index = i;
    //       break;
    //     }
    //   }

    //  arr.splice(index, 1);
    //  localStorage.setItem("myCart", JSON.stringify(arr));
    
    //  this.$store.dispatch({
    //     type: "addToCart",
    //     array: arr,
    //   });

    //  this.cartdata.map((value) => {
    //   productdetails(value.pid).then((res) => {
    //     this.allcartitem.push(res.data);
    //     // console.log(res.data);
    //   });
    // });
     
    },


  }




};
</script>

<style>
</style>