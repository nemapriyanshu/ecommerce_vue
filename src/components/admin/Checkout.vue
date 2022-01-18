<template>
  
	<section id="cart_items">
		<div class="container" v-if="allcartitem.length" >
			<div class="breadcrumbs">
				<ol class="breadcrumb">
					<li><a href="#">Home</a></li>
					<li class="active">Check out</li>
				</ol>
			</div>
			<!--/breadcrums-->

			<div class="step-one">
				<h2 class="heading text-center">Your Carts  Items</h2>
			</div>

  
      


<!------------------------------------------------ Enter cart Elements here ------------------------------------>
<div>
   <table class="" style="width:100%; border:#FFD17B solid 3px" >
            <thead>
              <tr class="" style="background-color:#FFD17B; padding:10px; font-weight:bold">
                <td class="image" style=" padding:10px">Item</td>
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
</div>


<!------------------------------------------- Cart items endd---------------------------------------------------- -->
	<div class="step-one">
				<h2 class="heading text-center">Billing Information</h2>
			</div>

			<div class="shopper-informations">
				<div class="row">
					<div class="col-sm-6">
						<div class="shopper-info">
							<p>Billing Information</p>

							<form @submit.prevent="checkout">


                  <div v-if="submitted && !$v.email.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                   Email is Required
                 </div>
                  <div v-if="submitted && !$v.email.email" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                   Email is not in correct Formate
                 </div>
								<input type="email" v-model="email" placeholder="Email" disabled>
								<input type="hidden" v-model="email" placeholder="Email">



                 <div v-if="submitted && !$v.fullname.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                  Full Name is Required
                 </div>
								<input type="text" v-model="fullname" placeholder="Full Name">


                
                 <div v-if="submitted && !$v.mobile.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                  Mobile Number is Required
                 </div>
								<input type="number" v-model="mobile" placeholder="Mobile Number">



                
                 <div v-if="submitted && !$v.state.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                  Choose the State
                 </div>
                <select name="cars_id" v-model="state" class="checkoutform" style="margin-bottom:10px ; padding :10px">
                    <option value="" selected disabled>---- Select State ----</option>
                    <option :value="i" v-for="i in states" :key="i">{{i}}</option>
                    <option value="odyssey">Odyssey</option>
                    <option value="ford_mustang">Ford Mustang</option>
                    <option value="tesla_model">Tesla Model 3</option>
                    <option value="honda_accord">Honda Accord</option>
                    <option value="ford_expedition">Ford Expedition</option>
                    <option value="lincoln_navigator">Lincoln Navigator</option>
                 </select>



                 <div v-if="submitted && !$v.pincode.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                  Enter a Pincode
                 </div>
								<input type="number" v-model="pincode" placeholder="Postal/Zip/Pin code">


                 <div v-if="submitted && !$v.address.required" class="invalid-feedback" style="color: #ffa429; font-weight: bold">
                  Enter Your Complete Address
                 </div>
                <textarea v-model="address" cols="30" rows="4" placeholder="Full Address" style="padding:10px"></textarea>
                <button class="btn btn-lg" style="background-color:orange; margin:20px 225px">Order</button>
							</form>

						</div>
					</div>

          <div class="col-sm-6 text-center" >
            <table style="width:100% ; font-size:30px" >
              <tr>
                <td>Total Item Price</td>
                <td>-</td>
                <td>&#8377; {{totalprices}}</td>
              </tr>
              <tr>
                <td><div>Shipping Charge </div> <div style="font-size:18px">
                  you need to pay if  total cart value is less then 500</div></td>
                <td>-</td>
                <td >&#8377; {{shippingcharge}}
                  <!-- <span v-if="totalprices>50">{{shippingcharge}}</span>
                  <span v-else>0</span> -->
                </td>
              </tr>
              <tr>
                <td>Coupon Apply</td>
                <td>-</td>
                <td style="color:red">- &#8377; {{couponvalue}}</td>
              </tr>
              <tr>
                <td> <hr style="background-color:#FF9446; height:2px"><b>Grand-Total</b></td>
                <td><hr><b>-</b></td>
                <td  style="color:green"> <hr style="background-color:#FF9446; height:2px"><b>&#8377; {{grandtotal}}</b></td>
              </tr>
            </table>
            <div style="margin-top:50px; border:black 1px solid ; padding:20px; border-radius:10px">
              <div>
                <span style="font-size:25px">ENTER COUPON (if you have)</span>
              </div>
              <input type="text" v-model="couponid" style="background:#F0F0E9; margin-bottom: 10px; padding: 10px; width: 100%; font-weight: 300; border:none">

              <button style="background-color:yellow" @click="couponcheck()" class="btn">Apply Coupon</button>
            </div>
          </div>
				</div>
			</div>
		

		
		</div>



      <div class="text-center container" v-else style="background-color:yellow ; font-size:45px">
          There is no any Item in your cart Go and add the item <br>

          <span style=" font-size:25px">
            <router-link to="/product">Add Items</router-link>
          </span>

      </div>


	</section>
</template>



<script>
import { productdetails } from "../../comman/services";
import { URL_PRODUCT_IMAGE } from "../../comman/url";
import { mapState } from "vuex";
import { required, email} from "vuelidate/lib/validators";
import {getcoupon} from '../../comman/services'
export default {
  name:"Checkout",
  data(){
    return{
      state:'',
      email:localStorage.getItem('emailid'),
      fullname:'',
      mobile:'',
      pincode:'',
      address:'',
      submitted:false,
      couponvalue:0 ,
      couponid:'',  
      // useremail:localStorage.getItem('emailid') ,  
     
      states:{'0': 'Andhra Pradesh', '1': 'Arunachal Pradesh', '2': 'Assam', '3': 'Bihar', '4': 'Chhattisgarh', '5': 'Goa', '6': 'Gujarat', '7': 'Haryana', '8': 'Himachal Pradesh', '9': 'Jharkhand', '10': 'Karnataka', '11': 'Kerala', '12': 'Madhya Pradesh', '13': 'Maharashtra', '14': 'Manipur', '15': 'Meghalaya', '16': 'Mizoram', '17': 'Nagaland', '18': 'Odisha', '19': 'Punjab', '20': 'Rajasthan', '21': 'Sikkim', '22': 'Tamil Nadu', '23': 'Telangana', '24': 'Tripura', '25': 'Uttar Pradesh', '26': 'Uttarakhand', '27': 'Gairsain'},
      //cart items
      allcartitem: [],
      imageurl:URL_PRODUCT_IMAGE,
      //cart items end
    }
  },
   validations: {
      email:{required,email},
      state:{required},
      fullname:{required},
      mobile:{required},
      pincode:{required},
      address:{required},
   },
  computed: mapState({
      cartdata: (state) => state.inCart,
      totalprices(){
              var a=0
              this.allcartitem.map((value,index)=>{
              a+=value.productinfo.price * this.cartdata[index].quantity ;
            });
            return a;
      },
      grandtotal(){
        let ship=0
        if(this.totalprices<50)
           ship=50
        return this.totalprices+ship-this.couponvalue
      },
      shippingcharge(){
        let ship=0
         if(this.totalprices<500)
           ship=50
        return ship
      }

  }),
  mounted() {
    this.cartdata.map((value) => {
      productdetails(value.pid).then((res) => {
        this.allcartitem.push(res.data);
        // console.log(res.data);
      });
    });
    
  },
  methods:{
     checkout() {
      //  alert("CHECK")
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid)
      {
        return;
      } 
      else 
      {
        let checkoutinfo={
            state:this.state,
            email:this.email,
            fullname:this.fullname,
            mobile:this.mobile,
            pincode:this.pincode,
            address:this.address,
            grandtotal: this.grandtotal,
            coupon:this.couponvalue,
            ship:this.shippingcharge,
            total:this.totalprices,
            coupon_name:this.couponid
        }

        console.log(checkoutinfo);
        localStorage.setItem("allcart",JSON.stringify(this.allcartitem))
        localStorage.setItem("checkoutinfo",JSON.stringify(checkoutinfo))
        console.log(this.allcartitem);
        this.$router.push('/orderreview')
      }
    },
    // END CHECK OUT

  
// Coupon Management 
  couponcheck()
    {
      if(this.couponid.length==0)
      {
          this.error="SELECT Payment Option"
                      this.$swal.fire({
                      icon: "error",
                      title: "Oops",
                      text: "You not Enter Coupon code",
                    });
      }
      else
      {
            let formdata={coupanid:this.couponid}
          getcoupon(formdata)
          .then(res=>{
            let getdata=res.data
            if(getdata.error)
            {
              // console.log(getdata);
                this.$swal.fire({
                icon: "error",
                title: "Oops",
                text: ""+getdata.error,
              });
            }
            else
            {
              let check=this.grandtotal - getdata.price
              if(check<0)
              {
                  this.$swal.fire({
                  icon: "warning",
                  title: "OOps",
                  text: "Increase the cart value for using this coupon ",
                });
              }
              else
              {
                this.couponvalue=getdata.price
                this.$swal.fire({
                  icon: "success",
                  title: "Successfully Applied",
                  text: "Coupon of  "+getdata.price + "  is applied successfully on your total ",
                });
              }
            }
          })
         
            }
    },

// This is cart functions

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
      this.couponvalue=0





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

//cart function endd-------------------------------

  }


}
</script>

<style>
 
</style>