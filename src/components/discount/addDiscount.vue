<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="discountModel.discount_name"
          :error-messages="discount_nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.discountModel.discount_name.$touch()"
          @blur="$v.discountModel.discount_name.$touch()"
        >
        <template v-slot:label>
            <div>Name <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>

      <v-col class="col-6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="discountModel.discount_startdate"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="menu = false"
            v-model="discountModel.discount_startdate"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="col-6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="discountModel.discount_enddate"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="menu1 = false"
            v-model="discountModel.discount_enddate"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="col-3">
        <strong>Discount Type</strong>
        <v-radio-group v-model="discountModel.discount_type" row>
          <v-radio label="Percentage" value="Percentage"></v-radio>
          <v-radio label="Flat" value="Flat"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="col-3">
        <v-text-field
          v-model="discountModel.discount_value"
          :error-messages="discount_valueErrors"
          label="Value"
          required
          color="blue darken-3"
          @input="$v.discountModel.discount_value.$touch()"
          @blur="$v.discountModel.discount_value.$touch()"
        >
        <template v-slot:label>
            <div>Value <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="getproductList"
          item-value="_id"
          item-text="product_name"
          v-model="discount_productId"
          label="Product"
          color="blue darken-3"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="getmachineList"
          item-value="_id"
          item-text="machine_name"
          v-model="discountModel.discount_machineId"
          label="Machine"
          color="blue darken-3"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>

        <v-radio-group v-model="discountModel.discount_status" row>
          <v-radio label="Active" value="Active"></v-radio>
          <v-radio label="InActive" value="InActive"></v-radio>
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
    discountModel: {
      discount_name: { required },
      discount_startdate: { required },
      discount_enddate: { required },
      discount_type: { required },
      discount_value: { required },
    },
  },
  data: () => ({
    menu: false,
    menu1: false,
    discount_productId:'',
    discountModel: {
      discount_name: "",
      discount_startdate: "",
      discount_enddate: "",
      discount_type: "Percentage",
      discount_value: "",
      discount_productId: "",
      discount_status: "Active",
    },
  }),
  computed: {
    ...mapGetters(["getproductList", "getmachineList", "getdiscountById"]),

    discount_nameErrors() {
      const errors = [];
      if (!this.$v.discountModel.discount_name.$dirty) return errors;
      !this.$v.discountModel.discount_name.required &&
        errors.push("Name is required.");
      return errors;
    },

    discount_valueErrors() {
      const errors = [];
      if (!this.$v.discountModel.discount_value.$dirty) return errors;
      !this.$v.discountModel.discount_value.required &&
        errors.push("Discount value is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
      this.items = this.getproductList;
    },
    dateConvert(obj) {
      debugger;
      var date = new Date(obj);
      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    },
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if(this.discount_productId){
          this.discountModel.discount_productId = this.discount_productId;
        }
        if (this.discountModel._id == null) {
          await this.$store
            .dispatch("adddiscount", this.discountModel)
            .then((res) => {
              debugger
              if (res.success) {
                Swal.fire({
                  title: "",
                  text: res.message,
                  icon: "success",
                });
                this.$emit("closeIt");
              } else {
                Swal.fire({
                  title: "",
                  text: res.message,
                  icon: "error",
                });
              }
            });
        } else {
          this.$store
            .dispatch("updatediscount", this.discountModel)
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
      (this.discountModel = {
        quantity: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
    if (this.getdiscountById) {
      this.discountModel = this.getdiscountById;
      this.discount_productId = this.discountModel.discount_productId;
      this.discountModel.discount_startdate = this.dateConvert(
        this.discountModel.discount_startdate
      );
      this.discountModel.discount_enddate = this.dateConvert(
        this.discountModel.discount_enddate
      );
    }
  },
  destroyed() {
    this.$store.dispatch("resetdiscountState");
  },
};
</script>
