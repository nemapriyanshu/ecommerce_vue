<template>
  <div>
      <!-- <div v-for="(wish,index) in wishlist" :key="index"> -->
     <div class="container"  v-if="wishlist.length!=0"> 
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><router-link to="/">Home </router-link></li>
            <li class="active">WishList is there</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">


          <table class="table table-condensed text-center"  >
            <thead style="background-color:orange ; color:white; font-size:20px">
              <tr class="cart_menu">
                <td style="padding:20px" class="">Item</td>
                <td style="padding:20px" class="">Desripion</td>
                <td style="padding:20px" class="">Name</td>
                <td style="padding:20px" class="">Price</td>
                <td style="padding:20px" class="">Options</td>
                <td></td>
              </tr>
            </thead>
            <tbody  >
              <tr v-for="(pro,index) in wishlist" :key="index">
                <td class="">
                  <a href=""><img :src="imageurl+pro.images[0].image" alt="" style="width:101px ; height:101px margin:0px; padding:0px" /></a>
                </td>
                <td>
                  {{pro.productinfo.description}}
                </td>
                <td class="cart_description">
                  <h4><a href="">{{pro.productinfo.name}}</a></h4>
                  <!-- <p>Web ID: 1089772</p> -->
                </td>
                <td class="cart_price">
                  <p>&#8377;{{pro.productinfo.price}}</p>
                </td>
                
                 
                <td class="cart_delete" style=" padding:50px ">
                  <!-- <a class="" href="javascript:void(0)" @click="deleteitem(pro.productinfo.id)"
                    ><i class="fa fa-times"></i>  </a> -->


                   <button class="btn btn-default add-to-cart" @click="deleteitem(pro.productinfo.id)" > 
                     <i class="fa fa-times"></i>
                        </button>

                   <button class="btn btn-default add-to-cart"  style="margin-left:20px"  @click="addcartvalue(pro.productinfo.id)"  > Add to cart 
                        </button>




                </td>
              </tr>
            </tbody>
          
          </table>
       
        </div>
      </div>

       <div  v-else class="text-center container" style="background-color:orange; color:white; font-size:35px">
          There is no any Item in Wishlist Go and add the item <br>

          <span style=" font-size:25px">
            <router-link to="/product">Add Items to Wishlist</router-link>
          </span>

      </div>    
    
  </div>
</template>

<script>
import {showwishlist ,productdetails,deletewishlist} from "../../comman/services"
import { URL_PRODUCT_IMAGE } from "../../comman/url";
export default {
  name:"Wishlist",
  data(){
    return{
      wishlist:[],imageurl:URL_PRODUCT_IMAGE,
    }
  } ,
  mounted()
  {
    showwishlist()
    .then(res=>{

      let tempdata=res.data.wishdata;
    
     for(let i=0 ;i <tempdata.length ; i++)
     {
  
        productdetails(tempdata[i].product_id).then((res) => {
        this.wishlist.push(res.data);
        
    });
     }

    //  console.log(this.wishlist);
    //   res.data.map((value) => {
    //   productdetails(value.pid).
    //   then((res) => {
    //     this.wishlist.push(res.data);
    //     // console.log(res.data);
    //   });
    // });
    })
    
  },
  methods:{
    deleteitem(id)
    {
      deletewishlist(id)
      .then(res=>{
        console.log(res.data);

      })
      location.reload();
    },

    addcartvalue(id){
            var temp=0
            if(localStorage.getItem('myCart')!=undefined){
               let arr=JSON.parse(localStorage.getItem('myCart'))
               for(var i=0;i<arr.length;i++)
               {
                 if(arr[i]['pid']==id)
                 {
                   arr[i]['quantity']+=1
                   temp=1
                 }
               }
               
               if(temp==0)
               {
                 let obj={'pid':id,quantity:1}
                 arr.push(obj);
               }
               
               localStorage.setItem('myCart',JSON.stringify(arr));
                this.$store.dispatch({
                type: "addToCart",
                array: arr,
              });
               this.$swal('Added',"Item ADDED",'success');
          }
          else {
              let arr=[]
               
              let obj={pid:id,quantity:1}
              arr.push(obj);

              localStorage.setItem('myCart',JSON.stringify(arr));
                this.$store.dispatch({
                type: "addToCart",
                array: arr,
              });
              this.$swal('Added',this.products.name,'success');
          }
      },



  }
}
</script>

<style>

</style>