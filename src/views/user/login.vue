<template>
  <v-card class="mx-auto" style="background-image: 'url(../../assets/logos/bgcopy.jpg)'">
    <v-card-text>
      <div class="father">
        <div class="child">
          <div class="text-center">
            <img
              src="../../assets/logos/Frigg_Logo_F_Tekst_Vertikal_hvit.png"
              class="my-10"
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
        <div class="mb-3" style="color: #F19B28">
          <h4 class="text-center" style="font-weight:bold">WELCOME</h4>
        </div>
        <div>
          <h5 class="text-center regularFont" >Login to your Account</h5>
        </div>
      </v-card-text>
      <v-card-text>
        <form>
          <h5 class="regularFont"> E-mail Address </h5>
          <v-text-field
            v-model="loginForm.user_email"
            :error-messages="user_emailErrors"
            placeholder=" info@friggkantine.com"
            required
            color="blue darken-3"
            @input="$v.loginForm.user_email.$touch()"
            @blur="$v.loginForm.user_email.$touch()"
          >
            <template slot="append">
              <img
                src="../../assets/logos/Icon material-email.png"
                height="15px"
              />
            </template>
          </v-text-field>

          <h5> Password </h5>
          <v-text-field
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
      !this.$v.loginForm.user_email.email &&
        errors.push("Must be valid e-mail");
      !this.$v.loginForm.user_email.required &&
        errors.push("E-mail is required");
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
  border-top-right-radius: 34px;
  background-color: #fff;
}
.login-field {
  background-color: #ceedff66;
}
.regularFont{
font-weight:regular
}
</style>
