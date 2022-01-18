<template>
  <div>
   
    <section id="slider">
      <!--slider-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div
              id="slider-carousel"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <!-- <li
                  data-target="#slider-carousel"
                  data-slide-to="0"
                  class="active"
                ></li> -->
              
                <li v-for="(pro, index) in proData"
                v-bind:key="index"
                v-bind:class="index == 0 ? 'active' : ''"></li>
                
              </ol>

              <div class="carousel-inner">
               
                <div v-for="(pro, index) in proData"
                v-bind:key="index"
                v-bind:class="index == 0 ? 'item active' : 'item'">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>{{ pro.heading }}</h2>
                    <p>
                      {{ pro.caption }}
                    </p>
                    <button type="button" class="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div class="col-sm-6">
                    <img
                      v-bind:src="
                        'http://127.0.0.1:8000/bannerimages/' + pro.image
                      "
                      width="250px"
                      height="250px"
                    />

                    <!-- <img src="images/home/pricing.png" class="pricing" alt="" /> -->
                  </div>
                </div>
              </div>

              <a
                href="#slider-carousel"
                class="left control-carousel hidden-xs"
                data-slide="prev"
              >
                <i class="fa fa-angle-left"></i>
              </a>
              <a
                href="#slider-carousel"
                class="right control-carousel hidden-xs"
                data-slide="next"
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Apipractice",
  data() {
    return {
      proData: undefined,
      id: "",
      name: "",
      price: "",
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8000/api/banner").then((res) => {
      // console.log(res.data)
      this.proData = res.data.bannerdata;
      // console.log(this.proData);
    });
  },
  methods: {},
};
</script>

<style>
</style>