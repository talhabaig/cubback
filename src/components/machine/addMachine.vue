<template>
  <div>
    <form>
      <v-row>
        <v-col class="col-6">
          <v-select
            :items="getcanteenList"
            item-value="_id"
            item-text="canteen_name"
            v-model="machineModel.canteen_id"
            :error-messages="canteenErrors"
            label="Canteen"
            required
            color="blue darken-3"
            @input="$v.machineModel.canteen_id.$touch()"
            @blur="$v.machineModel.canteen_id.$touch()"
          ><template v-slot:label>
            <div>Canteen <small style="color: red">*</small></div>
          </template></v-select>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="machineModel.machine_name"
            :error-messages="machine_nameErrors"
            label="Name"
            required
            color="blue darken-3"
            @input="$v.machineModel.machine_name.$touch()"
            @blur="$v.machineModel.machine_name.$touch()"
          >
          <template v-slot:label>
            <div>Machine Name <small style="color: red">*</small></div>
          </template>
          </v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="machineModel.machine_code"
            :error-messages="machine_codeErrors"
            label="Machine_Code"
            required
            color="blue darken-3"
            @input="$v.machineModel.machine_code.$touch()"
            @blur="$v.machineModel.machine_code.$touch()"
          >
          <template v-slot:label>
            <div>Machine Code <small style="color: red">*</small></div>
          </template></v-text-field>
        </v-col>
        <v-col class="col-3">
          <v-text-field
            v-model="Row"
            label="Row"
            type="number"
            color="blue darken-3"
          ></v-text-field>
        </v-col>
        <v-col class="col-3">
          <v-text-field
            v-model="Column"
            label="Column"
            type="number"
            color="blue darken-3"
          ></v-text-field>
          <!-- <span><a @click="channel">View Machine</a> </span> -->
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="machineModel.machine_location"
            label="Location"
            color="blue darken-3"
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-select
            :items="PaymentMothodList"
            v-model="machineModel.payment_method"
            label="Payment Method"
            color="blue darken-3"
          ></v-select>
        </v-col>
        <v-col class="col-6">
          <strong>Status</strong>
          <v-radio-group v-model="machineModel.machine_status" row>
            <v-radio label="Active" value="active"></v-radio>
            <v-radio label="InActive" value="inactive"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            v-if="!isdisable"
            dark
            color="main_bg_color"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" v-if="!isdisable" @click="clear">
            Close
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    machineModel: {
      machine_name: { required },
      canteen_id: { required },
      machine_code: { required },
      // voltage: { required },
      // temperature: { required },
      machine_status: { required },
    },
  },
  data: () => ({
    modalShow: false,
    Column: 7,
    isdisable: false,
    Row: 5,
    chanelModel: null,
    machineModel: {
      machine_name: "",
      canteen_id: "",
      machine_code: "",
      Column: 7,
      Row: 5,
      machine_location: "",
      payment_method: "Both",
      // voltage: "",
      // temperature: "",
      machine_status: "active",
    },
    PaymentMothodList: ["Both", "Vipps", "Debit/Credit"],
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getproductList", "getmachineById"]),

    machine_nameErrors() {
      const errors = [];
      if (!this.$v.machineModel.machine_name.$dirty) return errors;
      !this.$v.machineModel.machine_name.required &&
        errors.push("Name is required.");
      return errors;
    },
    canteenErrors() {
      const errors = [];
      if (!this.$v.machineModel.canteen_id.$dirty) return errors;
      !this.$v.machineModel.canteen_id.required &&
        errors.push("canteen is required.");
      return errors;
    },
    machine_codeErrors() {
      const errors = [];
      if (!this.$v.machineModel.machine_code.$dirty) return errors;
      !this.$v.machineModel.machine_code.required &&
        errors.push("Machine_Code is required.");
      return errors;
    },
    voltageErrors() {
      const errors = [];
      if (!this.$v.machineModel.voltage.$dirty) return errors;
      !this.$v.machineModel.voltage.required &&
        errors.push("Voltage is required.");
      return errors;
    },
    temperatureErrors() {
      const errors = [];
      if (!this.$v.machineModel.temperature.$dirty) return errors;
      !this.$v.machineModel.temperature.required &&
        errors.push("Temperature is required.");
      return errors;
    },
  },
  watch: {
    Row: {
      handler: function () {
        // this.createTable();
      },
    },
    Column: {
      handler: function () {
        // this.createTable();
      },
    },
  },
  methods: {
    fetchData() {
      this.items = this.getcanteenList;
    },
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.machineModel.Row = this.Row;
        this.machineModel.Column = this.Column;
        if (this.machineModel._id == null) {
          await this.$store
            .dispatch("addmachine", this.machineModel)
            .then((res) => {
              debugger;
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
          this.$store
            .dispatch("updatemachine", this.machineModel)
            .then((res) => {
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
      }
    },
    clear() {
      this.$v.$reset();
      (this.machineModel = {
        machine_name: "",
        machine_code: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
    this.isdisable = false;
    if (this.getmachineById) {
      this.isdisable = true;
      this.machineModel = this.getmachineById;
    }
  },
  destroyed() {
    this.$store.dispatch("resetmachineState");
  },
};
</script>
<style scoped>
.channalDiv {
  border-style: solid;
  border-color: #f8932d;
}
#myTable {
  padding-left: 30%;
}
</style>
