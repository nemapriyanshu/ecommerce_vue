<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <div class="left-sidebar">
            <h2>Category</h2>
           <Category/>
            <!--/category-products-->

            <div class="brands_products">
              <!--brands_products-->
              <h2>Brands</h2>
              <Brand/>
            </div>
            <!--/brands_products-->

            

            <div class="shipping text-center">
              <!--shipping-->
              <img src="images/home/shipping.jpg" alt="" />
            </div>
            <!--/shipping-->
          </div>
        </div>

        <div class="col-sm-9 padding-right">
          <div class="product-details">
            <!--product-details-->
            <div class="col-sm-5">
              <div class="view-product">
                <img :src="imageurl+firstimg.image" alt="" style="border-radius:20px" />
                 
              </div>
              <div
                id="similar-product"
                class="carousel slide"
                data-ride="carousel"
              >
                <!-- Wrapper for slides -->
                <div class="h3" style="margin-bottom:25px; color:orange">MORE IMAGES...</div>
                <div class="carousel-inner">
                  <div v-for="(pro, index) in proimage"
                v-bind:key="index"
                v-bind:class="index == 0 ? 'item active' : 'item'">
                     <img :src="imageurl + pro.image" id="innerimage2" v-if="pro"
                  style="width:250px ; height:250px; margin-left:35px ;"  /> 
                    
                  </div>
                 
                </div>

                <!-- Controls -->
                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                  style="margin-top:50px" 
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                    style="margin-top:50px" 
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="product-information"> 
                <img
                  src="images/product-details/new.jpg"
                  class="newarrival"
                  alt=""
                />
                <h1>{{prodetail.name}}</h1> 
                <span>
                  <span>&#8377;{{ prodetail.price }}</span>
                  <label>Quantity:</label> 
                  <button type="button" class="btn btn-fefault cart" @click="addcartvalue(productid)">
                    <i class="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p><b>Availability:&nbsp;</b> 
                <span v-if="prodetail.status">In-Stock</span>
                <span v-else>Out-of-Stock</span>
                
                </p>
                <!-- <p><b>Condition:</b> New</p> -->
                <p><b>Description:&nbsp;&nbsp;</b>{{prodetail.description}}</p>
                <p><b>Brand:</b> {{brand}}</p>
                <p><b>Color:</b>&nbsp;&nbsp;&nbsp;
                <span style=" height:20px ; width:80px" class="attrcolor">{{proattr.color}}</span>
                </p>
                <!-- <a href=""
                  ><img
                    src="/images/product-details/share.png"
                    class="share img-responsive"
                    alt=""
                /></a> -->
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->

         
          <!--/category-tab-->

       
          <!--/recommended_items-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { productdetails } from "../../comman/services";
import {URL_PRODUCT_IMAGE} from '../../comman/url'
import Category from "../admin/Category.vue";
import Brand from "../admin/Brand.vue";

export default {
  name: "Productdetail",
  components: {
    Category,
    Brand,
  },
  data() {
    return {
      productid: this.$route.params.id,
      prodetail: undefined,
      proimage: undefined,
      proattr: undefined,
      firstimg:undefined,
      imageurl:URL_PRODUCT_IMAGE,
      brand:undefined
    };
  },

  mounted() {
    productdetails(this.productid).then((res) => {
      this.prodetail = res.data.productinfo;
      this.proimage = res.data.images;
      this.proattr = res.data.attribute;
      this.firstimg= this.proimage[0];
      this.brand=res.data.brand
     
    });
  },
  methods:{
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
             
                this.$swal('Added',"ITEM ADDED",'success');
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
               
              this.$swal('Added',"ITEM ADDED",'success');
          }
      }
  }
};
</script>

<style>

</style>