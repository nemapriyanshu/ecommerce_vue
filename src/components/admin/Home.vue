<template>
  <div>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div class="left-sidebar">
              <h2>Category</h2>
              <Category />
              <!--/category-products-->
                  <h2>Brand</h2>
              <Brand />
              <!--/brands_products-->

              <div class="shipping text-center">
                <!--shipping-->
                <img src="images/home/shipping.jpg" alt="" />
              </div>
              <!--/shipping-->
            </div>
          </div>

          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>

              <!-- THIS IS PRODUCT USING API -->
              <div
                class="col-sm-4"
                v-for="(pro, index) in products"
                :key="index"
              >
            
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                         <router-link :to=" '/productdetail/' + pro.id">
                      <img
                        :src="imageurl + product_image[index][0].image"
                        alt=""
                        width="250px"
                        height="250px"
                        style="border-radius: 20px"
                      />
 </router-link>
                      <h2>&#8377;{{ pro.price }}</h2>
                      <p>{{ pro.name }}</p>
                       <div>
                          <button class="btn btn-default add-to-cart" @click="addcartvalue(pro.id)"  > Add to cart 
                        </button>
                        <button class="btn  add-to-cart" @click="wishlist(pro.id)"  style="margin-left:10px" > Wishlist 
                        </button>
                       </div>
                    </div>
                    <!-- <div class="product-overlay">
                      <div class="overlay-content">
                        <h1>{{ pro.name }}</h1>
                        <h2>&#8377;{{ pro.price }}</h2>
                        <p>{{ pro.description }}</p>
                        <a href="#" class="btn btn-default add-to-cart"
                          ><i class="fa fa-shopping-cart"></i>Add to cart</a
                        >
                      </div>
                    </div> -->
                  </div>
                 
                </div>


       

              </div>
            </div>
            <!--features_items-->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from "../front/Slider.vue";
import Category from "../admin/Category.vue";
import Brand from "../admin/Brand.vue";
import { allproduct ,checkwishlist} from "../../comman/services";
import { URL_PRODUCT_IMAGE } from "../../comman/url";

export default {
  name: "Home",
  data() {
    return {
      products: undefined,
      product_image: undefined,
      imageurl: URL_PRODUCT_IMAGE,
    };
  },

  components: {
    Slider,
    Brand,
    Category,
  },
  mounted() {
    allproduct().then((res) => {
      this.products = res.data.allproduct;
      this.product_image = res.data.images;
      // console.log(this.products);
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
               this.$swal('Added',this.products.name,'success');
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
// Wish List are there
      wishlist(id)
      {
       let email = localStorage.getItem('emailid');
       if(email)
       {
           let data={product_id:id}
        checkwishlist(data)
        .then(res=>{
          if(res.data.error==1)
          {
             this.$swal.fire({
                icon: "error",
                title: "Aleady in wishlist",
                text: "",
              });

          }
          else
          {
               this.$swal.fire({
                icon: "success",
                title: "ADDED",
                text: "your Item is Successfully ADDED",
              });
          }
        })
  
       }
       else
       {
           this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Login First to use Wishlist',
            })
            this.$router.push('login')
       }
      
      }
  }
};
</script>

<style>
</style>