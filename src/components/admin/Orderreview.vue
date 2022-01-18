<template>
  <div class="container" style="">
      <div class="" style=" margin: auto; width: 60%;   border: 3px solid  #FFD17B; padding:0px  ">
         <table class="text-center" style="width:100%; border:#FFD17B solid 3px" >
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
              <tr v-for="(pro,index) in allcartdata" :key="index">
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
                    <input
                      class="cart_quantity_input"
                      type="text"
                      name="quantity"
                      :value="cartdata[index].quantity"
                      autocomplete="off"
                      size="2"
                      disabled

                    />
                  </div>
                </td>
                <td class="cart_total">
                  <p class="cart_total_price">&#8377;{{cartdata[index].quantity * pro.productinfo.price}}</p>
                </td>
               
              </tr>
            </tbody>
          
          </table>

   
        <table   class="text-center" style="width:100%; font-size:20px ; margin:10px 0px">
            <tr >
                <th class="text-center" style="width:35%">
                    Email
                </th>
                <td  class="text-center" style="width:65%">
                    {{billdetail.email}}
                </td>
            </tr>
            <tr >
                <th class="text-center" style="width:35%">
                    Mobile Number
                </th>
                <td  class="text-center" style="width:65%">
                    {{billdetail.mobile}}
                </td>
            </tr>
            <tr>
                <th class="text-center">
                    State
                </th>
                <td class="text-center">
                    {{billdetail.state}}
                </td>
            </tr>
            <tr>
                <th class="text-center">
                    Pin/Postal/Zip Code
                </th>
                <td class="text-center">
                    {{billdetail.pincode}}
                </td>
            </tr>
            <tr>
                <th class="text-center">
                    Address
                </th>
                <td class="text-center">
                    {{billdetail.address}}
                </td>
            </tr>
        </table>

<hr>
<!-- Amount table -->
  <table class="text-center" style="width:100% ; font-size:30px; " >
              <tr>
                <td style="padding:0px">Total Item Price</td>
                <td>-</td>
                <td>&#8377; {{billdetail.total}}</td>
              </tr>
              <tr>
                <td>Shipping Charge </td>
                <td>-</td>
                <td >&#8377; {{billdetail.ship}}
                  <!-- <span v-if="totalprices>50">{{shippingcharge}}</span>
                  <span v-else>0</span> -->
                </td>
              </tr>
              <tr>
                <td>Coupon Apply</td>
                <td>-</td>
                <td style="color:red">- &#8377; {{billdetail.coupon}}</td>
              </tr>
              <tr>
                <td> <hr style="background-color:#FF9446; height:2px"><b>Grand-Total</b></td>
                <td><hr><b>-</b></td>
                <td  style="color:green"> <hr style="background-color:#FF9446; height:2px"><b>&#8377; {{billdetail.grandtotal}}</b></td>
              </tr>
            </table>



<!-- Payment mode -->
        <div class="step-one text-center">
			<h2 class="heading">Select Payment Mode</h2>
                 <div class="radio-toolbar">
                    <input type="radio" id="radioApple" v-model="demeth" value="Cash on Delivery" >
                    <label for="radioApple"  style=" ">Cash On Delivery</label>

                    <input type="radio" id="radioBanana" v-model="demeth" value="Paypal">
                    <label for="radioBanana"  style="margin-left:250px">PayPal</label>

                 </div>
		</div>

    <hr>
<div class="text-center" style="margin-bottom:20px">
    
      <button class="btn" @click="completeorder" style="background-color:#fb641b;color:white; padding:15px 20px; font-size:20px;font-weight:bold">Place Order</button> 
     
</div>
      </div>

      
  </div>
</template>

<script>

import { URL_PRODUCT_IMAGE } from "../../comman/url";
import {updatecartinfo, orderdetail, product_address,product_orders} from "../../comman/services"
// import emailjs from 'emailjs-com';
export default {
    name:'',
    data(){
        return{
            allcartdata:JSON.parse(localStorage.getItem('allcart')),
             imageurl:URL_PRODUCT_IMAGE,
             cartdata:JSON.parse(localStorage.getItem('myCart')),
             billdetail:JSON.parse(localStorage.getItem("checkoutinfo")),
             radioFruit:'',
             demeth:'',
             error:'',
            
        }
    },
    methods:{
            completeorder()
            {
              var  order_idd=null
              let used_coupon=0
              // demeth - > detaivery methodd
                if(this.demeth.length)
                {
                 const d= new Date();
              let  order_id=d.getTime() + Math.floor((Math.random() * 100) + 1);
               
                                 
                //   let overalladdress=''
                  //login for backend
                    if(this.billdetail.coupon>0)
                    {
                      let updatecart={coupanid:this.billdetail.coupon_name};
                      console.log(updatecart)
                    //update database  
                      updatecartinfo(updatecart)
                      .then(res=>{
                        console.log(res.data);
                      })
                      used_coupon=this.billdetail.coupon + this.billdetail.coupon
                      // alert("Coupon apply")

                    }
                    // else
                    // {
                    //         // alert("Coupan not apply")
                    // }

// Check coupon end

//API WORK STARTT

//order
                 let overallorder={
                    user_id : localStorage.getItem("id"),
                    amount : this.billdetail.grandtotal,
                    payment_mode : this.demeth,
                    pro_order_id : order_id,
                    payment_status : "0",
                    payment_id : 0,
                    transaction_id : 0,
                    coupon_used : used_coupon,
                  }

                orderdetail(overallorder)
                .then(res=>{
                  console.log(res.data);  
                  order_idd=res.data.order_id
                 


  //Address
          let overalladdress={
            order_id:order_idd,
            mobile:this.billdetail.mobile,
            address:this.billdetail.address,
            pincode:this.billdetail.pincode,
            state:this.billdetail.state,
          }
    console.log(overalladdress);

    product_address(overalladdress).then(res=>{
      console.log(res.data);
    })

  //End address

  //products item

  let allitems=JSON.parse(localStorage.getItem('allcart'));
  allitems.forEach((element,index) => {
    let info=element.productinfo
    let image=element.images[0]
    // console.log(image);
 let product={
    order_id:order_idd,
    product_id:info.id,
    product_price:info.price,
    quantity:this.cartdata[index].quantity,
    total_price:info.price * this.cartdata[index].quantity,
    image:image.image
  }

  product_orders(product).then(res=>{console.log(res.data);})
    console.log(product);
    
  
  });
localStorage.removeItem("myCart")
localStorage.removeItem("allcart")
 this.$store.dispatch({
        type: "orderplaced",
        array: [],
      });


 this.$swal.fire({
                icon: "success",
                title: "Done !",
                text: "Your Oder placed Successfully",
              });

this.$router.push('/')
  //end product items


                })
                .catch(e=>{
                  console.log(e);
                })
  // Cart  completed


// try {
//         emailjs.sendForm('gmail', 'template_q7ornnl', { message: this.message,
//           to_name:localStorage.getItem('emailid')}, 
//         'user_PsoteX0nscTZJPAHNE4PQ', {
         
//           message: this.message,
//           to_name:localStorage.getItem('emailid'),
//         })

//       } catch(error) {
//           console.log({error})
//       }








                }
                else
                {
                 this.error="SELECT Payment Option"
                 this.$swal.fire({
                icon: "error",
                title: "Oops",
                text: "You not choose Payment method",
              });
                }
            }
    }

}
</script>

<style>
.radio-toolbar {
  margin: 10px;
}

.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
    display: inline-block;
    background-color: rgb(228, 224, 224);
    padding: 5px 10px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid rgb(158, 158, 158);
    border-radius: 4px;
}

.radio-toolbar label:hover {
  background-color: rgb(255, 217, 0);
}


.radio-toolbar input[type="radio"]:checked + label {
    background-color: rgb(255, 183, 50);
    border-color: rgb(255, 187, 0);
}

</style>