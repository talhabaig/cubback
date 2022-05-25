<template>
  <v-row>
   
     <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Select Canteen <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <select
          v-model="subsidyModel.canteen_id"
          class="form-control login-field" disabled
        >
          <option v-for="(d, i) in getcanteenList" :key="i" :value="d._id">
            {{ d.canteen_name }}
          </option>
        </select>
      </div>
      </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Subsidy <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="subsidyModel.subsidy"
          class="form-control login-field" disabled
          placeholder="Value"
        />
      </div>
       
     </v-col>
   
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Status <small style="color: red">*</small></label
      >

      <v-radio-group disabled v-model="subsidyModel.status" row>
        <v-radio label="Active" value="Active"></v-radio>
        <v-radio label="InActive" value="InActive"></v-radio>
      </v-radio-group>
    </v-col>

    <v-col class="col-12 d-flex justify-center">
      <v-btn class="mr-4 modal-btn btnn" @click="clear"> Close </v-btn>
      <!-- <v-btn class="modal-btn" dark color="main_bg_color" @click="submit">
        {{subsidyModel._id ? 'Update':'Submit'}}
      </v-btn> -->
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
   
  },
  data: () => ({
    menu: false,
    menu1: false,
    nowDate: new Date().toISOString().slice(0, 10),
    discount_product_id: "",
    subsidyModel: {
      canteen_id:'',
      status:'Active',subsidy:null
    },
  }),
  computed: {
    ...mapGetters([
      "getproductList",
      "getmachineList",
      "getcanteenList",
      "getsubsidyById",
    ]),
    
    discount_nameErrors() {
      const errors = [];
      if (!this.$v.subsidyModel.discount_name.$dirty) return errors;
      !this.$v.subsidyModel.discount_name.required &&
        errors.push("Name is required.");
      return errors;
    },

    discount_valueErrors() {
      const errors = [];
      if (!this.$v.subsidyModel.discount_value.$dirty) return errors;
      !this.$v.subsidyModel.discount_value.required &&
        errors.push("Discount value is required.");
      return errors;
    },
  },

  methods: {
    fetchData() {
      this.items = this.getproductList;
    },
    dateConvert(obj) {
      var date = new Date(obj);
      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    },
    async submit() {
      this.$v.$touch();
      // if (!this.$v.$invalid) {
         
        if (this.subsidyModel._id == null) {
   
          await this.$store
            .dispatch("addsubsidy", this.subsidyModel)
            .then((res) => {
              if (res.success) {
                Swal.fire({
                  title: "",
                  text: res.message,
                  icon: "success",
                });
                this.$emit("closeIt");
              } else if (res.errors) {
                Swal.fire({
                  title: "",
                  text: res.errors[0].msg,
                  icon: "error",
                });
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
            .dispatch("updatesubsidy", this.subsidyModel)
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
        // }
      }
    },
    clear() {
      this.$v.$reset();
      (this.subsidyModel = {
        quantity: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    this.fetchData();
    if (this.getsubsidyById) {
      this.subsidyModel = this.getsubsidyById;
    
      
    }
  },
  destroyed() {
    this.$store.dispatch("getdiscountById", null);
  },
};
</script>
