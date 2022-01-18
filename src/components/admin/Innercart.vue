<template>
  <tr v-if="prodetail">
    <!-- :src="imageurl+firstimg.image"  -->
    <td class="cart_product">
      <a href=""
        ><img
          :src="imageurl + firstimg.image"
          alt=""
          style="height: 111px; width: 111px; border-radius: 10px"
      /></a>
    </td>
    <td>
      <h1>{{ prodetail.id }}</h1>
    </td>
    <td class="cart_description">
      <h4>
        <a href="">{{ prodetail.name }}</a>
      </h4>

      <p v-if="brand"><b>Brand - &nbsp; </b>{{ brand }}</p>
    </td>
    <td class="cart_price">
      <p>&#8377;{{ prodetail.price }}</p>
    </td>
    <td class="cart_quantity">
      <div class="cart_quantity_button">
        <a
          class="cart_quantity_up"
          href="javascript:void(0)"
          @click="decreasecart(productid)"
        >
          -
        </a>
        <input
          class="cart_quantity_input"
          type="text"
          name="quantity"
          :value="quantity"
          autocomplete="off"
          size="2"
          disabled
        />
        <a
          class="cart_quantity_down"
          href="javascript:void(0)"
          @click="increasecart(productid)"
        >
          +
        </a>
      </div>
    </td>
    <td class="cart_total">
      <p class="cart_total_price">&#8377;{{ prodetail.price * quantity }}</p>
    </td>
    <td class="cart_delete">
      <a
        class="cart_quantity_delete"
        href="javascript:void(0)"
        @click="deleteitem(productid)"
        ><i class="fa fa-times"></i
      ></a>
    </td>
  </tr>
</template>

<script>
import { productdetails } from "../../comman/services";
import { URL_PRODUCT_IMAGE } from "../../comman/url";

export default {
  name: "Innercart",
  props: ["productid", "quantity"],

  data() {
    return {
      prodetail: undefined,
      proimage: undefined,
      proattr: undefined,
      firstimg: undefined,
      imageurl: URL_PRODUCT_IMAGE,
      total: 0,
    };
  },
  mounted() {
    productdetails(this.productid).then((res) => {
      this.prodetail = res.data.productinfo;
      // console.log(this.prodetail);
      this.proimage = res.data.images;
      this.proattr = res.data.attribute;
      this.firstimg = this.proimage[0];
      this.brand = res.data.brand;
      // console.log(this.prodetail);

      this.$emit("totalprice", this.prodetail.price * this.quantity);
    });
  },
  methods: {
    increasecart(id) {
      // console.log(id);
      let arr = JSON.parse(localStorage.getItem("myCart"));
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]["pid"] == id) {
          arr[i]["quantity"] += 1;
        }
      }
      this.$emit("totalprice", this.prodetail.price);
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
        this.$emit("totalprice", this.prodetail.price);
      }
      this.$emit("totalprice", -1 * this.prodetail.price);
      localStorage.setItem("myCart", JSON.stringify(arr));
      this.$store.dispatch({
        type: "addToCart",
        array: arr,
      });

      // if the Quantity is zero then product deleted
      if (this.quantity <= 1) {
        this.$swal
          .fire({
            title: "Do you want to Delete the Item",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$swal.fire("Your Item is Deleted!", "", "success");
              this.deleteitem(id);
            } else if (result.isDenied) {
              this.$swal.fire("Item is Not Deleted", "", "info");
              // this.increasecart(id)
            }
          });
      }
    },
    deleteitem(id) {
      var index;
      let arr = JSON.parse(localStorage.getItem("myCart"));
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]["pid"] == id) {
          index = i;
          break;
        }
      }
      alert(index);
      arr.splice(index, 1);

      this.$emit("totalprice", -1 * (this.prodetail.price * this.quantity));
      localStorage.setItem("myCart", JSON.stringify(arr));
      this.$store.dispatch({
        type: "addToCart",
        array: arr,
      });
      this.$swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Your Item is Deleted from Cart !",
      });
    },
  },
};
</script>

<style>
</style>