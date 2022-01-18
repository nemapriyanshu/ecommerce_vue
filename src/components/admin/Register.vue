<template>
  <div class="signup-form">
    <!--sign up form-->
    <h2>New User Signup!</h2>
    <div
      v-if="registrationdone"
      class="alert"
      style="background-color: #ffcc77"
    >
      {{ registrationdone }}
    </div>

    <div class="alert alert-danger" v-if="registererror">
      <div v-for="(item, id) in registererror" :key="id">{{ item[0] }}</div>
    </div>

    <form @submit.prevent="formSubmit">
      <div>
        <div
          v-if="submitted && !$v.user.firstname.required"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Firstname is Required
        </div>
        <input
          type="text"
          placeholder="First Name"
          v-model="user.firstname"
          :class="{ 'is-invalid': submitted && $v.user.firstname.$error }"
        />
      </div>

      <div>
        <div
          v-if="submitted && !$v.user.lastname.required"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          LastName is Required
        </div>
        <input type="text" placeholder="Last Name" v-model="user.lastname" />
      </div>

      <div>
        <div
          v-if="submitted && !$v.user.email.required"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Email is Required
        </div>
        <div
          v-if="submitted && !$v.user.email.email"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Email Formate is not Correct
        </div>
        <input type="email" placeholder="email" v-model="user.email" />
      </div>

      <div>
        <div
          v-if="submitted && !$v.user.password.required"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Password is Required
        </div>
        <div
          v-if="
            (submitted && !$v.user.password.minLength) ||
            (submitted && !$v.user.password.checkpassword)
          "
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Password Should Contain atleast (A-Z a-z 0-9 !@#$%^&*) and minimum 8
        </div>
        <!-- <div
          v-if="submitted && !$v.user.password.checkpassword"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
         
        </div> -->
        <input type="password" placeholder="Password" v-model="user.password" />
      </div>

      <div>
        <div
          v-if="submitted && !$v.user.confirmpassword.required"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Confirm Password is Required
        </div>
        <div
          v-if="submitted && !$v.user.confirmpassword.sameAsPassword"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Password is not Matched
        </div>
        <input
          type="password"
          placeholder="Confirm password"
          v-model="user.confirmpassword"
          name="confirmpassword"
        />
      </div>

      <div class="text-center">
        <button type="submit" class="btn">Sign-up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { userRegister } from "../../comman/services";
// const alpha = helpers.regex(/^[0-9]{2,10}/)
export default {
  name: "App",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      login: { email: "", pasword: "" },
      submitted: false,
      registrationdone: undefined,
      registererror: undefined,
    };
  },
  validations: {
    user: {
      firstname: { required },
      lastname: { required },
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

      confirmpassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  methods: {
    resetData: function () {
      this.user.firstname = "";
      this.user.lastname = "";
      this.user.email = "";
      this.user.password = "";
      this.user.confirmpassword = "";
    },
    formSubmit() {
      this.submitted = true;
      //stop here if form is invalid
      // console.log(this.$v);
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        //This is Login CODE
        let data = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password,
          confirmpassword: this.user.confirmpassword,
        };
        // console.log(data);
        userRegister(data)
          .then((res) => {
            // console.log(res.data);
            if (!res.data.error) {
              this.$swal.fire({
                icon: "success",
                title: "<h4>Register Successfully GO to Login</h4>",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });

              if (res.data.message) this.registrationdone = res.data.message;
              this.$v.$reset();
              this.resetData();
              this.submitted = false;
            } else {
              this.registererror = res.data.error;
              alert("User Alerady Register ");
            }
          })
          .catch((err) => {
            this.registererror = err;
            alert("SOMETHING WANT WRONG --   " + err);
            // console.log(err);
          });
      }
    },
  },
};
</script>

<style>
</style>