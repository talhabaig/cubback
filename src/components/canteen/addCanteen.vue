<template>
  <v-row>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Machine Filler <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <i
          ><img
            src="../../assets/logos/bxs-down-arrow.svg"
            height="7px"
        /></i>
        <select
          v-model="canteenModel.machine_filler_id"
          class="form-control login-field"
        >
          <option
            v-for="(d, i) in getmachinefillerList"
            :key="i"
            :value="d._id"
          >
            {{ d.user_name }}
          </option>
        </select>
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Canteen Admin <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <i
          ><img
            src="../../assets/logos/bxs-down-arrow.svg"
            height="7px"
        /></i>
        <select
          v-model="canteenModel.canteen_admin_id"
          class="form-control login-field"
        >
          <option v-for="(d, i) in getcanteenAdminList" :key="i" :value="d._id">
            {{ d.user_name }}
          </option>
        </select>
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Name <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="canteenModel.canteen_name"
          type="text"
          class="form-control login-field"
        />
      </div>
      <div class="invalid-feedback" v-if="$v.canteenModel.canteen_name.$error">
        <span v-if="$v.canteenModel.canteen_name.$error">Name is required</span>
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Location <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="canteenModel.canteen_location"
          type="text"
          class="form-control login-field"
        />
      </div>
      <div
        class="invalid-feedback"
        v-if="$v.canteenModel.canteen_location.$error"
      >
        <span v-if="$v.canteenModel.canteen_location.$error"
          >Location is required</span
        >
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Status <small style="color: red">*</small></label
      >

      <v-radio-group v-model="canteenModel.canteen_status" row>
        <v-radio label="Active" value="Active"></v-radio>
        <v-radio label="InActive" value="InActive"></v-radio>
      </v-radio-group>
    </v-col>
    <v-col class="col-12 d-flex justify-center">
      <v-btn class="mr-4 modal-btn btnn" @click="clear"> Close </v-btn>

      <v-btn class="modal-btn" dark color="main_bg_color" @click="submit">
        {{canteenModel._id ? 'Update':'Submit'}}
      </v-btn>
    </v-col>
  </v-row>
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
    },
  },
  props: ["isEdit"],
  data: () => ({
    canteenModel: {
      canteen_name: "",
      canteen_admin_id: "",
      machine_filler_id: "",
      canteen_location: "",
      canteen_status: "Active",
    },
  }),

  computed: {
    ...mapGetters([
      "getcanteenById",
      "getfoodSupplierList",
      "getmachinefillerList",
      "getcanteenAdminList",
    ]),
    foodSupplierErrors() {
      const errors = [];
      if (!this.$v.canteenModel.machine_filler_id.$dirty) return errors;
      !this.$v.canteenModel.machine_filler_id.required &&
        errors.push("Food Supplier is required");
      return errors;
    },
    canteen_admin_Errors() {
      const errors = [];
      if (!this.$v.canteenModel.canteen_admin_id.$dirty) return errors;
      !this.$v.canteenModel.canteen_admin_id.required &&
        errors.push("Canteen Admin_id is required");
      return errors;
    },
    canteen_locationErrors() {
      const errors = [];
      if (!this.$v.canteenModel.canteen_location.$dirty) return errors;
      !this.$v.canteenModel.canteen_location.required &&
        errors.push("Canteen_Location is required");
      return errors;
    },
    canteen_nameErrors() {
      const errors = [];
      if (!this.$v.canteenModel.canteen_name.$dirty) return errors;
      !this.$v.canteenModel.canteen_name.required &&
        errors.push("canteen name is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {},
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.canteenModel._id == null) {
          this.$store.dispatch("addcanteen", this.canteenModel).then((res) => {
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
  watch: {},
  mounted() {
    if (this.isEdit && this.getcanteenById) {
      this.canteenModel = this.getcanteenById;
      this.canteenModel.machine_filler_id =
        this.getcanteenById.machine_filler_id._id;
      this.canteenModel.canteen_admin_id =
        this.getcanteenById.canteen_admin_id._id;
    }
  },
  destroyed() {
    this.$store.dispatch("resetcanteenState");
  },
};
</script>
<style>
.right-inner-addon i {
    position: absolute;
    right: 0px;
    padding: 8px 12px;
    pointer-events: none;
}
</style>
