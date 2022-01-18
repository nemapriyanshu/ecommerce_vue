<template>
  <div>
    <section id="form">
      <!--form-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-1">
            <div>
              <!--login form-->
              <Login/>
            </div>
            <div style="margin-top:30px">
              <div class="text-center" style="font-weight:bold ; font-size:25px ; color:orange">Login with Your mail ID</div>
             <div class="text-center" style="margin:30px 50px">
                <Socialmedia/>
             </div>
            </div>
            <!--/login form-->
          </div>
          <div class="col-sm-1">
            <h2 class="or">OR</h2>
          </div>
          <div class="col-sm-4">
            <!--/sign up form-->
            <Register/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Login from "../admin/Login.vue";
import Register from "../admin/Register.vue";
import Socialmedia from "../admin/Socialmedia.vue";
export default {
  name: "RegisterLogin",
  components: {
    Login,
    Register,
    Socialmedia,
  },
};
</script>

<style>
</style>