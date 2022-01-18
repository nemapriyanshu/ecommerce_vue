<template>
  <div class="login-form">
    <h2>Login to your account</h2>

    <div class="alert alert-danger" v-if="loginerror">
      Credential Not Matched
    </div>
    <div class="alert alert-success" v-if="logindone">{{ logindone }}</div>

    <form @submit.prevent="loginsubmit">
      <div
        v-if="submitted && !$v.login.email.required"
        class="invalid-feedback"
        style="color: #ffa429; font-weight: bold"
      >
        Email is Required
      </div>
      <div
        v-if="submitted && !$v.login.email.email"
        class="invalid-feedback"
        style="color: #ffa429; font-weight: bold"
      >
        Email Should be in Correct Formate
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          v-model="login.email"
          :class="{ 'is-invalid': submitted && $v.login.email.$error }"
        />
      </div>

      <div
        v-if="submitted && !$v.login.password.required"
        class="invalid-feedback"
        style="color: #ffa429; font-weight: bold"
      >
        Password is Required
      </div>
      <div
        v-if="
          (submitted && !$v.login.password.minLength) ||
          (submitted && !$v.login.password.checkpassword)
        "
        class="invalid-feedback"
        style="color: #ffab21; font-weight: bold"
      >
        Password Length Should be minimum 8 and container a-z A-Z 0-9 !@#$%^&*
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="login.password"
          :class="{ 'is-invalid': submitted && $v.login.password.$error }"
        />
      </div>

      <button type="submit" class="btn btn-default">Login</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { userLogin } from "../../comman/services";
import { saveToken, SaveEmail } from "../../comman/savetoken";
import store from "../../store";
export default {
  name: "App",
  data() {
    return {
      login: { email: "", password: "" },
      submitted: false,
      loginerror: undefined,
      logindone: undefined,
      token: "",
    };
  },
  validations: {
    login: {
      email: { required, email },
      password: {
        required,
        checkpassword(password) {
          const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
          return regex.test(password);
        },
        minLength: minLength(8),
      },
    },
  },
  methods: {
    loginsubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        var logindata = {
          email: this.login.email,
          password: this.login.password,
        };
        userLogin(logindata)
          .then((res) => {
            this.loginerror = res.data.error;
            this.logindone = res.data.message;
            if (!res.data.error) {
              saveToken(res.data.access_token);
              SaveEmail(res.data.email);
              localStorage.setItem('id',res.data.user)
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Login Successful!",
              });

              //store
              store.dispatch({
                type: "changeemail",
                newmail: this.login.email,
              });
              this.$router.push("/");
              // location.reload();
            }
          })
          .catch((e) => {
            alert(e);
          });

        // console.log(profile(this.token));
        // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.login));
      }
    },
  },
};
</script>

<style>
</style>