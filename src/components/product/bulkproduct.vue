<template>
  <v-row>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Upload CSV<small style="color: red">*</small></label
      >
      <input type="file" id="fileUpload" />
      <hr />
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Category Name <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <i><img src="../../assets/logos/bxs-down-arrow.svg" height="7px" /></i>
        <select
          v-model="productModel.product_catagory_id"
          class="form-control login-field"
        >
          <option v-for="(d, i) in getcategoryList" :key="i" :value="d._id">
            {{ d.catagories_name }}
          </option>
        </select>
      </div>
      <div
        class="invalid-feedback"
        v-if="$v.productModel.product_catagory_id.$error"
      >
        <span v-if="$v.productModel.product_catagory_id.$error"
          >Category is required</span
        >
      </div>
    </v-col>
    <v-col class="col-12 my-9">
      <div id="dvCSV"></div>
    </v-col>

    <v-col class="col-12 d-flex justify-center">
      <v-btn class="mr-4 modal-btn btnn" @click="clear"> Close </v-btn>
      <v-btn class="modal-btn" dark color="main_bg_color" @click="submit">
        Submit
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    productModel: {
      product_catagory_id: { required },
    },
  },
  data: () => ({
    csvTable: {},
    menu: false,
    image: null,
    productModel: {
      product_catagory_id: "",
    },
    csvFile: "",
  }),
  computed: {
    ...mapGetters(["getcategoryList"]),
    categoryErrors() {
      const errors = [];
      if (!this.$v.productModel.product_catagory_id.$dirty) return errors;
      !this.$v.productModel.product_catagory_id.required &&
        errors.push("category is required.");
      return errors;
    },
  },

  methods: {
    submit() { 
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var vm = this;
        var cat_id = this.productModel.product_catagory_id;
        var fileUpload = document.getElementById("fileUpload");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof FileReader != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
              debugger
              var rows = e.target.result.split("\n");
              var arrayData = [];
              rows.forEach((e, x) => {  

                var dataval = e.split(",");
                debugger
                if (x >= 1 && e) {
                  arrayData.push({
                    product_name: dataval[0],
                    product_price: dataval[1],
                    product_description: dataval[2],
                    product_VAT: dataval[3],
                    product_expiry_date: dataval[4],
                    product_status: dataval[5],
                    product_gradient:dataval[6].replaceAll('-',','),
                    product_image:dataval[7].replace('\r','')
                  });
                }
              });

              vm.sendData(cat_id, arrayData);
            };
            reader.readAsText(fileUpload.files[0]);
          } else {
            alert("This browser does not support HTML5.");
          }
        } else {
          Swal.fire({
            title: "Please upload a valid CSV file.",
            icon: "error",
          });
        }
      } else {
        console.log("error");
      }
    },
    async sendData(cat_id, data) {
      debugger;
      await this.$store
        .dispatch("bulkproduct", { product_catagory_id: cat_id, data: data })
        .then((res) => {
          this.$emit("closeIt");
          if (res.success) {
            Swal.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Sucess",
              text: res.message,
              icon: "success",
            });
          }
        });
    },
    // async submit() {
    //   this.$v.$touch();

    //   if (!this.$v.$invalid) {
    //     if (this.productModel._id == null) {
    //       await this.$store
    //         .dispatch("addproduct", this.productModel)
    //         .then((res) => {
    //           this.$emit("closeIt");
    //           if (res.success) {
    //             Swal.fire({
    //               title: "",
    //               text: res.message,
    //               icon: "success",
    //             });
    //           } else {
    //             Swal.fire({
    //               title: "Error!",
    //               text: res.message,
    //               icon: "error",
    //             });
    //           }
    //         });
    //     } else {
    //       await this.$store
    //         .dispatch("updateproduct", this.productModel)
    //         .then((res) => {
    //           this.$emit("closeIt");
    //           if (res.success) {
    //             Swal.fire({
    //               title: "",
    //               text: res.message,
    //               icon: "success",
    //             });
    //           } else {
    //             Swal.fire({
    //               title: "Error!",
    //               text: res.message,
    //               icon: "error",
    //             });
    //           }
    //         });
    //     }
    //   }
    // },
    clear() {
      this.$v.$reset();
      this.$emit("closeIt");
    },
  },
  mounted() {
    if (this.getproductById) {
      this.productModel = this.getproductById;
      this.productModel.product_catagory_id =
        this.productModel.product_catagory_id._id;
      this.productModel.ingradients =
        this.productModel.product_gradient.toString();
    }
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