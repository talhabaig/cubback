<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <div class="mb-3" style="color: #f8932d">
        <h1>WELCOME</h1>
      </div>
      <div>
        <h3>Login to your Account</h3>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <form>
        <v-text-field
          v-model="loginForm.user_email"
          :error-messages="user_emailErrors"
          label="E-mail Address"
          required
          color="blue darken-3"
          @input="$v.loginForm.user_email.$touch()"
          @blur="$v.loginForm.user_email.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="loginForm.user_password"
          :error-messages="user_passwordErrors"
          color="blue darken-3"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          @input="$v.loginForm.user_password.$touch()"
          @blur="$v.loginForm.user_password.$touch()"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn block class="mt-4" color="main_bg_color" dark @click="submit">
          Login
        </v-btn>
        <v-btn
          block
          class="mt-4"
          color="main_bg_color"
          dark
          @click="redirectToForgot()"
        >
          Forget Password
        </v-btn>
      </form>
    </v-card-text>
    <v-divider></v-divider>
    <!-- <v-card-actions>
      <v-btn
        color="main_bg_color"
        block
        dark
        class="pa-5"
        @click="redirectToSignUp()"
      >
        Sign Up
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    loginForm: {
      user_email: { required, email },
      user_password: { required },
    },
  },

  data: () => ({
    showPassword: false,

    loginForm: {
      user_email: "",
      user_password: "",
    },
  }),

  computed: {
    user_passwordErrors() {
      const errors = [];
      if (!this.$v.loginForm.user_password.$dirty) return errors;
      !this.$v.loginForm.user_password.required &&
        errors.push("Password is required.");
      return errors;
    },
    user_emailErrors() {
      const errors = [];
      if (!this.$v.loginForm.user_email.$dirty) return errors;
      !this.$v.loginForm.user_email.email && errors.push("Must be valid e-mail");
      !this.$v.loginForm.user_email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
     
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("signInUser", this.loginForm).then((response) => {
         
          if (response.success) { 
            this.$router.push({ name: "userList" });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.message,
              icon: "error",
            });
          }
          // this.clear();
        });
      }
    },

    redirectToSignUp() {
      this.$router.push({ name: "signup" });
    },
    redirectToForgot() {
      this.$router.push({ name: "forgot" });
    },

    clear() {
      this.$v.$reset();
      this.loginForm = {
        userName: "jams",
        password: "123456",
      };
    },
  },
};
</script>
