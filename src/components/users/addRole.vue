<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="roleModel.role_name"
          :error-messages="NameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.roleModel.role_name.$touch()"
          @blur="$v.roleModel.role_name.$touch()"
        >
          <template v-slot:label>
            <div>Name <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          v-model="roleModel.role_permission_names"
          :items="getpermissionList"
          item-value="name"
          item-text="name"
          multiple
          label="Select Permission"
          required
          color="blue darken-3"
        ></v-select>
      </v-col>

      <v-col class="col-6">
        <strong>Status</strong>
        <v-radio-group v-model="roleModel.role_status" row>
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
    roleModel: {
      role_name: { required },
    },
  },

  data: () => ({
    roleModel: {
      role_name: "",
      role_status: "active",
    },
  }),

  computed: {
    ...mapGetters(["getRoleById", "getpermissionList"]),

    NameErrors() {
      const errors = [];
      if (!this.$v.roleModel.role_name.$dirty) return errors;

      !this.$v.roleModel.role_name.required && errors.push("Name is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();

      if (!this.roleModel._id) {
        if (!this.$v.$invalid) {
          this.$store.dispatch("addRole", this.roleModel).then((res) => {
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
      } else {
        this.$store.dispatch("updateRole", this.roleModel).then((res) => {
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
      this.roleModel = {
        name: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      };
      this.$emit("closeIt");
    },
  },

  destroyed() {
    this.$store.dispatch("resetUserState");
  },

  mounted() {
    if (this.getRoleById) {
      this.roleModel = this.getRoleById;
    }
  },
};
</script>
