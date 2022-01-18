<template>
  <div>
    <div class="container m-auto" style="border: red solid 2px">
      <div class="row">
        <div class="col-md-3">
          <div class="">
            <img
              src="/images/profile/proimg.jpg"
              alt="profile Image"
              width="250px"
              height="250px"
              style="margin: 0px auto"
            />
          </div>
        </div>
        <div class="col-md-9">
          <div class="text-center " style="color:orange ; font-weight:bold; margin-top: 0px;">
                    <div style="padding:20px"><span class="h3">FirstName -</span> <span class="h1">{{profile.firstname}}</span></div>
                    <div style="padding:20px"><span class="h3">LastName -</span> <span class="h1">{{profile.lastname}}</span></div>
                    <div style="padding:20px"><span class="h3">Email -</span> <span class="h1">{{profile.email}}</span></div>
                </div>
        </div>
      </div>
    </div>
    <Changepassword v-bind:userid="uid" />
  </div>
</template>

<script>
import Changepassword from "../admin/Changepassword.vue";
import { getprofile } from "../../comman/services";
export default {
  name: "Profile",
  components: {
    Changepassword,
  },
  data() {
    return {
      profile: undefined,
      uid:undefined
    };
  },
  mounted() {
    try {
      getprofile().then((res) => {
        console.log(res.data);
        this.profile = res.data;
        this.uid=res.data.id
        // alert(this.uid)
      });
    } catch {
      alert("SESSION EXPIRE GO AND LOGIN");
    }
  },
  methods: {},
};
</script>
    
<style>
</style>