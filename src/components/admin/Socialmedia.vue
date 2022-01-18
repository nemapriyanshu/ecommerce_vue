<template>
  <div>
       <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import { saveToken, SaveEmail } from "../../comman/savetoken"; 
import store from "../../store";
import { userLogin ,userRegister } from "../../comman/services";
export default {
    components:{
        GoogleLogin
    },
    data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "54334684381-gm1bkhlc1g04mavf4sjj3uatn4u95huh.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 300,
                    height: 50,
                    longtitle: true
                }
            }
        },
        methods: {
            onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile().ev);
        let googlelogin=googleUser.getBasicProfile().ev
        let gogglepassword=googleUser.getBasicProfile().FX + '@' + '123456'
        localStorage.setItem('googlelogin',googlelogin)
        var logindata={email:googlelogin,password:gogglepassword}
        // console.log(logindata);
        
//register
let data = {
          firstname: googleUser.getBasicProfile().FX,
          lastname: googleUser.getBasicProfile().UV,
          email: googleUser.getBasicProfile().ev,
          password: gogglepassword ,
          confirmpassword: gogglepassword ,
        };
        console.log(data);
        userRegister(data)

//  LOGIN       
        userLogin(logindata)
          .then((res) => {
            this.loginerror = res.data.error;
            this.logindone = res.data.message;
            // console.log(this.loginerror)
            // console.log(this.logindone)
            if (!res.data.error) {
              saveToken(res.data.access_token);
              SaveEmail(res.data.email);
            
              localStorage.setItem('id',res.data.user)
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Login Successful!",
              });
               this.$swal.fire({
                icon: "warning",
                title: "Important Infomation",
                text: "Your Password is your first name of your Google Account + @123456  <hr>" + gogglepassword,
                footer: " Password is - "+gogglepassword
              });

              //store
              store.dispatch({
                type: "changeemail",
                newmail: googleUser.getBasicProfile().ev,
              });
              this.$router.push("/");
              // location.reload();
            }
          })
          .catch((e) => {
            alert(e);
          });
        }
    }
}
</script>

<style>

</style>