<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="promotionModel.promo_name"
          :error-messages="promo_nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.promotionModel.promo_name.$touch()"
          @blur="$v.promotionModel.promo_name.$touch()"
        >
        <template v-slot:label>
            <div>Name <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="promotionModel.promo_code"
          :error-messages="promo_codeErrors"
          label="Promo Code"
          required
          color="blue darken-3"
          @input="$v.promotionModel.promo_code.$touch()"
          @blur="$v.promotionModel.promo_code.$touch()"
        >
        <template v-slot:label>
            <div>Promo Code <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="promotionModel.promo_description"
          label="Description"
          color="blue darken-3"
        ></v-text-field>
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
              v-model="promotionModel.promo_start_date"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            > <template v-slot:label>
            <div>Start Date <small style="color: red">*</small></div>
          </template> </v-text-field>
          </template>
          <v-date-picker
            @input="menu = false"
            v-model="promotionModel.promo_start_date"
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
              v-model="promotionModel.promo_end_date"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ><template v-slot:label>
            <div>End Date <small style="color: red">*</small></div>
          </template></v-text-field>
          </template>
          <v-date-picker
            @input="menu1 = false"
            v-model="promotionModel.promo_end_date"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="col-3">
        <strong>Promo Type</strong>
        <v-radio-group v-model="promotionModel.promo_type" row>
          <v-radio label="Percentage" value="Percentage"></v-radio>
          <v-radio label="Flat" value="Flat"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="col-3">
        <v-text-field
          v-model="promotionModel.promo_value"
          :error-messages="promo_valueErrors"
          label="Value"
          required
          color="blue darken-3"
          @input="$v.promotionModel.promo_value.$touch()"
          @blur="$v.promotionModel.promo_value.$touch()"
        ><template v-slot:label>
            <div>Value <small style="color: red">*</small></div>
          </template></v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="getproductList"
          item-value="_id"
          item-text="product_name"
          v-model="promotionModel.promo_productid"
          label="Product"
          color="blue darken-3"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>

        <v-radio-group v-model="promotionModel.promo_status" row>
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
    promotionModel: {
      promo_name: { required },
      promo_code: { required },
      promo_start_date: { required },
      promo_end_date: { required },
      promo_type: { required },
      promo_value: { required },
    },
  },
  data: () => ({
    menu: false,
    menu1: false,
    promotionModel: {
      promo_name: "",
      promo_code: "",
      promo_description: "",
      promo_start_date: "",
      promo_end_date: "",
      promo_type: "Percentage",
      promo_value: "",
      promo_productid: "",
      promo_status: "active",
    },
  }),
  computed: {
    ...mapGetters(["getproductList", "getpromotionById"]),

    promo_nameErrors() {
      const errors = [];
      if (!this.$v.promotionModel.promo_name.$dirty) return errors;
      !this.$v.promotionModel.promo_name.required &&
        errors.push("Name is required.");
      return errors;
    },
    promo_codeErrors() {
      const errors = [];
      if (!this.$v.promotionModel.promo_code.$dirty) return errors;
      !this.$v.promotionModel.promo_code.required &&
        errors.push("Promo code is required.");
      return errors;
    },
    promo_valueErrors() {
      const errors = [];
      if (!this.$v.promotionModel.promo_value.$dirty) return errors;
      !this.$v.promotionModel.promo_value.required &&
        errors.push("Promo value is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
      this.items = this.getproductList;
    },
    async submit() {
     
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.promotionModel._id == null) {
          await this.$store
            .dispatch("addpromotion", this.promotionModel)
            .then((res) => {
             ;
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
            .dispatch("updatepromotion", this.promotionModel)
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
      (this.promotionModel = {
        quantity: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
   ;
    if (this.getpromotionById) {
      this.promotionModel = this.getpromotionById;
    }
  },
  destroyed() {
    //
    this.$store.dispatch("resetpromotionState");
  },
};
</script>
