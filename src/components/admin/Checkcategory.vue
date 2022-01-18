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
              <h2 class="title text-center">CATEGORY Items</h2>

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
                       <button class="btn btn-default add-to-cart" @click="addcartvalue(pro.id)"  > Add to cart 
                        </button>
                    </div>
                 
                  </div>
                  <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                      <li>
                        <a href="#"
                          ><i class="fa fa-plus-square"></i>Add to wishlist</a
                        >
                      </li>
                      <li>
                        <a href="#"
                          ><i class="fa fa-plus-square"></i>Add to compare</a
                        >
                      </li>
                    </ul>
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
import { category } from "../../comman/services";
import { URL_PRODUCT_IMAGE } from "../../comman/url";
// import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      products: undefined,
      productimageurl: URL_PRODUCT_IMAGE,
      catid: this.$route.params.id,
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
    // axios.get(`${URL_USER}categoryproducts/` + this.paramm).then((res) => {
        category(this.paramm)
        .then(res=>{
        this.products = res.data.categoryproducts;
        this.product_image = res.data.images;
        // console.log(res.data);
      });
  },
  watch: {
    $route(to) {
      this.paramm = to.params.id;
      // console.log(this.paramm);
       category(this.paramm)
        .then(res=>{
        this.products = res.data.categoryproducts;
        this.product_image = res.data.images;
        // console.log(res.data);
      });
    },
  },
  created(){
      this.paramm=this.$route.params.id
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
      }
  }

};
</script>

<style>
</style>