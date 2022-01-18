<template>
  <div class="container">
    <div style="color: #828282; margin:20px" class="h1 text-center">
      CHANGE PASSWORD 
    </div>
      <div v-if="msg==1" class="col-md-6  alert alert-success" style="margin-left: 275px">Password Change Successfully</div>
      <div v-if="msg==0" class="col-md-6 alert alert-danger" style="margin-left: 275px">Password Not Matched</div>
    <div class="col-md-6 login-form" style="margin-left: 275px">
      <div class="" style="">
        <form @submit.prevent="handleSubmit">

          <div class="form-group">
            <label>Old Password</label>
            <div
              v-if="submitted && !$v.change.oldpass.required"
              class="invalid-feedback"
              style="color: #ffa429; font-weight: bold"
            >
              Old Password is required
            </div>
            <input
              type="password"
              v-model="change.oldpass"
              placeholder="Old PASSWORD"
              :class="{ 'is-invalid': submitted && $v.change.oldpass.$error }"
            />
          </div>



          <div class="form-group">
            <label>New Password</label>
            <div  v-if="submitted && !$v.change.newpass.required" class="invalid-feedback"  style="color: #ffa429; font-weight: bold" >
                 New Password is required
            </div>
            <div  v-if="(submitted && !$v.change.newpass.minLength) || (submitted && !$v.change.newpass.checkpassword)" class="invalid-feedback"  style="color: #ffa429; font-weight: bold" >
                Password Should Contain atleast (A-Z a-z 0-9 !@#$%^&*) and minimum 8 
            </div>
            <input
              type="password"
              v-model="change.newpass"
              placeholder="New PASSWORD"
              :class="{ 'is-invalid': submitted && $v.change.oldpass.$error }"
            />
          </div>



          <div class="form-group">
            <label>Confirmpass Password</label>
            <div
              v-if="submitted && !$v.change.confirmpass.required"
              class="invalid-feedback"
              style="color: #ffa429; font-weight: bold"
            >
              Confirmpass Password is required
            </div>

             <div
          v-if="submitted && !$v.change.confirmpass.sameAsPassword"
          class="invalid-feedback"
          style="color: #ffa429; font-weight: bold"
        >
          Password is not Matched
        </div>

            <input
              type="password"
              v-model="change.confirmpass"
              placeholder="Confirmpass PASSWORD"
              :class="{ 'is-invalid': submitted && $v.change.confirmpass.$error }"
            />
          </div>



          <div class="form-group">
            <button class="btn btn-primary">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required,  minLength, sameAs   } from "vuelidate/lib/validators";

export default {
  name: "app",
  props:['userid'],
  data() {
    return {
      change: {
        oldpass: "",
        newpass: "",
        confirmpass: "",
      },
      submitted: false,
      msg:undefined
    };
  },
  validations: {
    change: {
      oldpass: { required },
      newpass: {
        required,
        checkpassword(newpass) {
          const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
          return regex.test(newpass);
        },
        minLength: minLength(8),
      },

      confirmpass: { required, sameAsPassword: sameAs("newpass") },
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) 
      {
        return;
      }
    else
    { 
        // alert(this.userid)
        var formdata={'userid':this.userid,'oldpass': this.change.oldpass ,'newpass':this.change.newpass}
        console.log(formdata);
        axios.post("http://127.0.0.1:8000/api/changepass/",formdata)
        .then(res=>{
            console.log(res.data);
            if(res.data.err)
            {
                this.msg=0
            }
            else
            {
                this.msg=1
            }

        })
        .catch(e=>{
            console.log(e);
        })


    }
    },
  },
};
</script>

<style>
</style>