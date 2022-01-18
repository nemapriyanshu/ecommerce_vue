<template>
  <div>
    <div id="contact-page" class="container">
      <div class="bg">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="title text-center">Contact <strong>Us</strong></h2>
            <div id="gmap" class="contact-map">
                <img src="images/contact/contactus.jpeg" alt="" style="width:100% ; height:100% ; border-radius:20px"> 
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8">
            <div class="contact-form">
              <h2 class="title text-center">Get In Touch</h2>
              <div
                class="status alert alert-success"
                v-if="success"
              >{{success}}</div>
              <form
                id="main-contact-form"
                class="contact-form row"
                 @submit.prevent="Contactform"
                 ref="myform"
              >
                <div class="form-group col-md-6">
                    <!-- NAME -->
                <div v-if="submitted && !$v.contact.name.required" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                    Name is Required
                </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    v-model="contact.name"
                   :class="{'is-invalid':submitted && $v.contact.name.$error}"
                  />
                </div>
                <div class="form-group col-md-6">
                    <!-- EMAIL -->
                <div v-if="submitted && !$v.contact.email.required" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                    Email is Required
                </div>
                <div v-if="submitted && !$v.contact.email.email" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                    Email Should be in correct Formate
                </div>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Email"
                   v-model="contact.email"
                     :class="{'is-invalid':submitted && $v.contact.email.$error}"
                  />
                </div>
                <div class="form-group col-md-12">
                    <!-- Contact -->
                <div v-if="submitted && !$v.contact.contact.required" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                    Contact Number is required
                </div>
                <div v-if="submitted && (!$v.contact.contact.minLength || !$v.contact.contact.maxLength )" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                   Enter a valid Number
                </div>
                  <input
                    type="number"
                    name="subject"
                    class="form-control"
                   v-model="contact.contact"
                     :class="{'is-invalid':submitted && $v.contact.contact.$error}"
                    placeholder="Contact Number"
                  />
                </div>
                <div class="form-group col-md-12">
                    <!-- message -->
                <div v-if="submitted && !$v.contact.message.required" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                       Message  is required
                </div>
                <div v-if="submitted && !$v.contact.message.minLength" class="invalid-feedback" style="color:#FFA429; font-weight:bold;">
                       Minimum 20 Characters are there
                </div>
                  <textarea
                     v-model="contact.message"
                     :class="{'is-invalid':submitted && $v.contact.message.$error}"
                    id="message"
                    class="form-control"
                    rows="8"
                    placeholder="Your Message Here"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="submit"
                    name="submit"
                    class="btn btn-primary pull-right"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="contact-info">
              <h2 class="title text-center">Contact Info</h2>
              <address>
                <p>E-Shopper Inc.</p>
                <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
                <p>Newyork USA</p>
                <p>Mobile: +2346 17 38 93</p>
                <p>Fax: 1-714-252-0026</p>
                <p>Email: info@e-shopper.com</p>
              </address>
              <div class="social-networks">
                <h2 class="title text-center">Social Networking</h2>
                <ul>
                  <li>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/#contact-page-->
  </div>
</template>

<script>

import { required, email, minLength, maxLength} from "vuelidate/lib/validators";
import {contactus} from '../../comman/services';

export default {
  name: "Contact",
  data() {
    return {
      contact: { name:"",email:"",contact:"",message:"" },
      submitted: false,
      success:undefined
    };
  },
  validations: {
    contact: {
      name: { required },
      email: { required,email },
      contact: { required,minLength: minLength(10), maxLength:maxLength(10) },
      message: { required, minLength: minLength(20) },
    },
   
  },
  methods: {
     resetData: function() {
            this.contact.name = '';
            this.contact.email = '';
            this.contact.contact = '';
            this.contact.message = '';
        },
    Contactform() {
      this.submitted = true;
      //stop here if form is invalid
      console.log(this.$v);
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      else{
        var data={name:this.contact.name,email:this.contact.email,contact:this.contact.contact,message:this.contact.message};
        // console.log(data);
        contactus(data)
        .then(res=>{
          // console.log(res.data);
          this.success=res.data.message;
            this.resetData();
            this.submitted= false

            console.log(this);

            // this.$v.$reset();
          // this.contact={
          //   name:'',
          //   email:'',
          //   contact:'',
          //   message:'' myform
          // };
          //  event.target.reset();
          // this.contact.name=''
          // this.contact.email=''
          // this.contact.message=''
          // this.contact.contact=''
                    
        })
        .catch(err=>{
          alert("SOMETHING WANT WRONG"+err)
        })
      }
    },
   
  },
};
</script>

<style>
</style>