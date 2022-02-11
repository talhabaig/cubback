<template>
  <form>
    <v-row>
   
      <v-col class="col-6">
        <v-select
          :items="getuserList"
          item-value="_id"
          item-text="user_name"
          v-model="canteenModel.food_supplier_id"
          label="Food Supplier"
          color="blue darken-3"
        >
         <template v-slot:label>
            <div>Food Supplier <small style="color: red">*</small></div>
          </template>
        </v-select>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="canteenModel.canteen_name"
          :error-messages="canteen_nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.canteenModel.canteen_name.$touch()"
          @blur="$v.canteenModel.canteen_name.$touch()"
        >   <template v-slot:label>
            <div>Name <small style="color: red">*</small></div>
          </template></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="canteenModel.canteen_location"
          :error-messages="canteen_locationErrors"
          label="Location"
          required
          color="blue darken-3"
          @input="$v.canteenModel.canteen_location.$touch()"
          @blur="$v.canteenModel.canteen_location.$touch()"
        >
        <template v-slot:label>
            <div>Location <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>
        <v-radio-group v-model="canteenModel.canteen_status" row>
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
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    canteenModel: {
      canteen_name: { required },
      canteen_location: { required },
      canteen_status: { required },
    },
  },
   props: ["isEdit"],
  data: () => ({
    canteenModel: {
      canteen_name: "",
      canteen_location: "",
      canteen_status: "active",
    },
  }),

  computed: {
    ...mapGetters(["getcanteenById", "getuserList"]),

    canteen_nameErrors() {
      const errors = [];
      if (!this.$v.canteenModel.canteen_name.$dirty) return errors;
      !this.$v.canteenModel.canteen_name.required && errors.push("canteen name is required.");
      return errors;
    },
    canteen_locationErrors() {
      const errors = [];
      if (!this.$v.canteenModel.canteen_location.$dirty) return errors;
      !this.$v.canteenModel.canteen_location.required &&
        errors.push("canteen location is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.canteenModel._id == null) {
          this.$store.dispatch("addcanteen", this.canteenModel).then((res) => {
            debugger;
            if (res.success) {
              Swal.fire({
                text:
                  "2 Machines have been added associated with the Canteen: " +
                  res.canteen.canteen_name,
                showCancelButton: true,
                confirmButtonText: "Show Machine",
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  await this.$store.dispatch("getcanteenById", res.canteen);
                  this.$router.push({
                    name: "machineList",
                  });
                }
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: res.message,
                icon: "error",
              });
            }
          });
        } else {
          this.$store
            .dispatch("updateCanteen", this.canteenModel)
            .then((res) => {
              Swal.fire({
                title: "",
                text: res.data.message,
                icon: "success",
              });
              // if (res.success) {

              // } else {
              //   Swal.fire({
              //     title: "Error!",
              //     text: res.message,
              //     icon: "error",
              //   });
              // }
            });
        }
        this.$emit("closeIt");
      }
    },
    clear() {
      this.$v.$reset();
      (this.canteenModel = {
        canteen_name: "",
        canteen_location: "",
      }),
        this.$emit("closeIt");
    },
  },
   watch: { 
    getuserList: {
      handler: function () {
        this.items = this.getuserList.filter((x) => {
          return x.user_role == "user";
        });
      },
    },
  },
  mounted() {
    debugger
    if (this.isEdit && this.getcanteenById) {
      this.canteenModel = this.getcanteenById;
    }
  },
  destroyed() {
    this.$store.dispatch("resetcanteenState");
  },
};
</script>
