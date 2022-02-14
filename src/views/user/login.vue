<template>
  <v-card class="mx-auto" max-width="344" style="background-color:rgb(248, 147, 45)">
    <v-card-text>
          <div class="father">
            <div class="child">
              <div class="text-center">
                <img
                  src="../../assets/logos/Frigg_Logo_F_Tekst_Vertikal_gul.png"
                  class="my-10 white"
                  alt="Symphony"
                  width="auto"
                  height="130px"
                />
                <router-view />
              </div>
            </div>
          </div>
    </v-card-text>
    <v-card-text class="login-card">
      <v-card-text>
        <div class="mb-3" style="color: #f8932d">
          <h4 class="text-center">WELCOME</h4>
        </div
        <div>
          <h5 class="text-center">Login to your Account</h5>
        </div>
      </v-card-text>
      <v-card-text>
        <form>
          <v-label>E-mail Address
          </v-label>
          <v-text-field class="login-field" 
            v-model="loginForm.user_email"
            :error-messages="user_emailErrors"
            placeholder="info@friggkantine.com"
            required
            color="blue darken-3"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @input="$v.loginForm.user_email.$touch()"
            @blur="$v.loginForm.user_email.$touch()"
          ></v-text-field>

          <v-label> Password
          </v-label>
          <v-text-field class="login-field"
            v-model="loginForm.user_password"
            :error-messages="user_passwordErrors"
            color="blue darken-3"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
            @input="$v.loginForm.user_password.$touch()"
            @blur="$v.loginForm.user_password.$touch()"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn block class="mt-4" color="main_bg_color" dark @click="submit">
            Login
          </v-btn>
         
        </form>
      </v-card-text>
    </v-card-text>
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
<style>
.login-card {
  border-top-left-radius: 34px; 
  border-top-right-radius:34px; 
  background-color:#fff;
}
.white{
  background-color:white;
}
.login-field {
  background-color: #ceedff66;
}

</style>