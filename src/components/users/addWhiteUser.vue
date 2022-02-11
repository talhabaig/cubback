<template>
  <form>
    <v-row>
      <v-col class="col-6"> 
        <v-text-field
          v-model="userModel.user_name"
          :error-messages="NameErrors"
          :counter="10"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.userModel.user_name.$touch()"
          @blur="$v.userModel.user_name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          v-model="userModel.user_role_id"
          :items="getroleList"
          :error-messages="roleErrors"
            item-value="_id"
          item-text="name"
          label="Select role"
          required
          color="blue darken-3"
          @change="$v.userModel.user_role_id.$touch()"
          @blur="$v.userModel.user_role_id.$touch()"
        ></v-select>
      </v-col>

      <v-col class="col-6">
        <v-text-field
          v-model="userModel.user_phone"
          label="Phone Number."
          required
          color="blue darken-3"
          type="number"
          :error-messages="phoneNumberErrors" 
          @input="$v.userModel.phone.$touch()"
          :counter="15"
          @blur="$v.userModel.phone.$touch()"
        ></v-text-field>
      </v-col>
      <v-col v-if="!this.userModel._id" class="col-6">
        <v-text-field
          v-model="userModel.user_email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          color="blue darken-3"
          @input="$v.userModel.user_email.$touch()"
          @blur="$v.userModel.user_email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col v-if="!this.userModel._id" class="col-6">
        <v-text-field
          v-model="userModel.user_password"
          :error-messages="passwordErrors"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          color="blue darken-3"
          @input="$v.userModel.user_password.$touch()"
          @blur="$v.userModel.user_password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
        <v-col class="col-6"> 
        <strong>Status</strong>
        <v-radio-group v-model="userModel.user_status" row>
          <v-radio label="Active" value="active"></v-radio>
          <v-radio label="InActive" value="inactive"></v-radio>
        </v-radio-group>
      </v-col> 
      <v-col class="col-12">
        <v-btn class="mr-4" dark color="main_bg_color" @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear"> Close </v-btn>
      </v-col>

    </v-row>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    userModel: {
      user_name: { required, maxLength: maxLength(10) },
      user_role_id: { required },
      user_phone: { required, maxLength: maxLength(15) },
      user_email: { required, email },
      user_password: { required },
    },
  },

  data: () => ({
    showPassword: false, 
    items: ["Machine Filler","Food Supplier", "Canteen Admin"], 
    userModel: {
      user_name: "",
      user_role_id: "",
      user_phone: "",
      user_email: "",
      user_password: "",
      user_status:"active"
    },
  }),

  computed: {
    ...mapGetters(["getroleList", "getUserById"]),

    roleErrors() {
      const errors = [];
      if (!this.$v.userModel.user_role_id.$dirty) return errors;
      !this.$v.userModel.user_role_id.required && errors.push("Role is required");
      return errors;
    },

    NameErrors() {
      const errors = [];
      if (!this.$v.userModel.user_name.$dirty) return errors;
      !this.$v.userModel.user_name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.userModel.user_name.required && errors.push("Name is required.");
      return errors;
    },

    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.userModel.user_phone.$dirty) return errors;
      !this.$v.userModel.user_phone.maxLength &&
        errors.push("Phone Number must be at most 14 characters long");
      !this.$v.userModel.user_phone.required &&
        errors.push("Phone Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.userModel.user_email.$dirty) return errors;
      !this.$v.userModel.user_email.email && errors.push("Must be valid e-mail");
      !this.$v.userModel.user_email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.userModel.user_password.$dirty) return errors;
      !this.$v.userModel.user_password && errors.push("Must be valid Password");
      !this.$v.userModel.user_password.required &&
        errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    enforcePhoneFormat() {
      let x = this.userModel.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.userModel.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    submit() { 
      this.$v.$touch(); 
      debugger
      if (!this.userModel._id) {
        this.$store.dispatch("addUser", this.userModel).then((res) => {
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            }); 
            this.$emit("closeIt");
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      } else {
        this.$store.dispatch("updateUser", this.userModel).then((res)=>{
          if (res.success) {
            Swal.fire({
              title: "",
              text: res.message,
              icon: "success",
            }); 
            this.$emit("closeIt");
          } else {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          }
        });
      }
    },
    clear() {
      this.$v.$reset();
      this.userModel = {
        name: "",
        user_role_id: "",
        phone: "",
        email: "",
        password: "",
      };
      this.$emit("closeIt");
    },
  },

  destroyed() {
    //
    this.$store.dispatch("resetUserState");
  },

  mounted() {
   
    if (this.getUserById) {
      this.userModel = this.getUserById;  
    }
  },
};
</script>
