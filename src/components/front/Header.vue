<template>
  <div>
    <header id="header">
      <!--header-->
      <!-- {{cmsdata}} -->
      <div class="header_top">
        <!--header_top-->
      </div>
      <!--/header_top-->

      <div class="header-middle">
        <!--header-middle-->
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div class="logo pull-left">
                <router-link to="/"
                  ><img src="/images/home/logo.png" alt=""
                /></router-link>
              </div>
              <div class="btn-group pull-right"></div>
            </div>
            <div class="col-sm-8">
              <div class="shop-menu pull-right">
                <ul class="nav navbar-nav">
                  <li>
                    <router-link to="/profile/">
                      <span class="h4" v-if="email" style="color: #ff8700"
                        ><i class="fa fa-user"></i>{{ email }}</span
                      >
                      <span v-else><i class="fa fa-user"></i>Account</span>
                    </router-link>
                  </li>

                  <li v-if="email">
                    <router-link to="/wishlist/"
                      ><i class="fa fa-star"></i> Wishlist</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/checkout/"
                      ><i class="fa fa-crosshairs"></i> Checkout</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/cart/">
                      <span
                        class="badge badge-warning cardchange"
                        id="lblCartCount"
                      >
                        {{ councart }}
                      </span>

                      <i class="fa fa-shopping-cart h4"></i>

                      Cart
                    </router-link>
                  </li>
                  <li v-if="email">
                    <a href="javascript:void(0)" @click="logout()"
                      ><i class="fa fa-sign-out"></i> Logout
                    </a>
                  </li>

                  <li v-else>
                    <router-link to="/Login"
                      ><i class="fa fa-lock"></i> Login</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-middle-->

      <div class="header-bottom">
        <!--header-bottom-->
        <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>

              <div class="mainmenu pull-left">
                <ul class="nav navbar-nav collapse navbar-collapse">
                  <li><router-link to="/">Home </router-link></li>
                  <li class="dropdown">
                    <router-link to="/">
                      Shop <i class="fa fa-angle-down"></i
                    ></router-link>
                    <ul role="menu" class="sub-menu">
                      <li><router-link to="/product/">Product</router-link></li>
                      <li><router-link to="/myorder/">MYORDER</router-link></li>

                      <li>
                        <router-link to="/checkout/"> Checkout</router-link>
                      </li>
                      <li><router-link to="/cart/">Cart </router-link></li>
                      <li v-if="email">
                        <a href="javascript:void(0)" @click="logout()">
                          Logout
                        </a>
                      </li>

                      <li v-else>
                        <router-link to="/Login"
                          ><i class="fa fa-lock"></i> Login</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a href="#">More..<i class="fa fa-angle-down"></i></a>
                    <ul  class="sub-menu">
                       <li  v-for="(pro,index) in newdetails" :key="index"> 
               <router-link :to="`/moreinfo/${newdetails[index].id}`"> {{newdetails[index].name}}</router-link>
        </li> 
                    </ul>
                 
                  </li>

                  <li><router-link to="/Contactus">Contact Us</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-bottom-->
    </header>
  </div>
</template>

<script>
import store from "../../store";
import { mapState } from "vuex";
import axios from "axios";
// import { URL_USER } from "../../comman/url";

export default {
  name: "Slider",
  data() {
    return { 
      countcart: JSON.parse(localStorage.getItem("myCart")),
      newdetails:undefined,
    };
  },
     mounted(){
        axios.get("http://127.0.0.1:8000/api/getcms")
        .then(res=>{
            console.log(res.data);
            this.newdetails=res.data.cmsinfo
        })
    },
  computed: mapState({
    email: (state) => state.email,
    councart: (state) => state.inCart.length,
  }),

  methods: {
    logout() {
      localStorage.removeItem("emailid");
      localStorage.removeItem("id_token");

      this.$router.push("/");
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "You've been logged out",
        showConfirmButton: false,
        timer: 2000,
      });
      store.commit("initialiseStore");
      // location.reload();
    },
  },
};
</script>

<style>
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
  font-size: 15px;
  background: #ff0000;
  color: #fff;
  padding: 0px 3px;
  vertical-align: top;
  margin-right: -5px;
}
.cardchange:hover {
  background-color: orange;
}
</style>