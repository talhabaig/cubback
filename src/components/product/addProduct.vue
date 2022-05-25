<template>
  <v-row>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Product Name <small style="color: red">*</small></label
      > 
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="productModel.product_name"
          type="text"
          class="form-control login-field"
          placeholder=" Product Name"
        />
      </div>
         <div class="invalid-feedback" v-if="$v.productModel.product_name.$error">
        <span v-if="$v.productModel.product_name.$error">Product is required</span>
      </div>
      <!-- <v-text-field
          v-model="productModel.product_name"
          :error-messages="product_nameErrors"
          label="Name"
          required
          color="blue darken-3"
          @input="$v.productModel.product_name.$touch()"
          @blur="$v.productModel.product_name.$touch()"
        >
          <template v-slot:label>
            <div>Product Name <small style="color: red">*</small></div>
          </template>
        </v-text-field> -->
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Price <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="productModel.product_price"
          :error-messages="product_priceErrors"
          label="Price"
          required
          type="number"
          class="form-control login-field"
          placeholder="Price"
        />
      </div>
        <div class="invalid-feedback" v-if="$v.productModel.product_price.$error">
        <span v-if="$v.productModel.product_price.$error">Price is required</span>
      </div>
      <!-- <v-text-field
          v-model="productModel.product_price"
          :error-messages="product_priceErrors"
          label="Price"
          required
          type="number"
          color="blue darken-3"
          @input="$v.productModel.product_price.$touch()"
          @blur="$v.productModel.product_price.$touch()"
        >
          <template v-slot:label>
            <div>Price <small style="color: red">*</small></div>
          </template>
        </v-text-field> -->
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >VAT <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="productModel.product_VAT"
          :error-messages="product_priceErrors"
          label="VAT"
          type="number"
          required
          class="form-control login-field" 
        />
      </div>
        <div class="invalid-feedback" v-if="$v.productModel.product_VAT.$error">
        <span v-if="$v.productModel.product_VAT.$error">VAT is required</span>
      </div>
      <!-- <v-text-field
          v-model="productModel.product_VAT"
          :error-messages="product_VATErrors"
          label="VAT"
          required
          color="blue darken-3"
          @input="$v.productModel.product_VAT.$touch()"
          @blur="$v.productModel.product_VAT.$touch()"
        >
          <template v-slot:label>
            <div>VAT <small style="color: red">*</small></div>
          </template>
        </v-text-field> -->
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Category Name <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <i
          ><img
            src="../../assets/logos/bxs-down-arrow.svg"
            height="7px"
        /></i>
        <select
          v-model="productModel.product_catagory_id"
          class="form-control login-field"
        >
          <option v-for="(d, i) in getcategoryList" :key="i" :value="d._id">
            {{ d.catagories_name }}
          </option>
        </select>
      </div>
       <div class="invalid-feedback" v-if="$v.productModel.product_catagory_id.$error">
        <span v-if="$v.productModel.product_catagory_id.$error">Category is required</span>
      </div>
      <!-- <v-select 
          item-text="catagories_name"
          v-model="productModel.product_catagory_id"
          label="Category"
          color="blue darken-3"
        >
          <template v-slot:label>
            <div>Category Name <small style="color: red">*</small></div>
          </template>
        </v-select> -->
    </v-col>
    <v-col class="col-6">
      <label>Select Image </label> <small style="color: red">*</small>
      <br />
      <img :src="productModel.product_image" alt="" />
      <input
        type="file"
        id="file"
        ref="file"
        accept="image/jpg, image/jpeg, image/png"
        @change="handleFileUpload()"
      />
       <div class="invalid-feedback" v-if="$v.productModel.product_image.$error">
        <span v-if="$v.productModel.product_image.$error">Image is required</span>
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Status <small style="color: red">*</small></label
      >

      <v-radio-group v-model="productModel.product_status" row>
        <v-radio label="Active" value="Active"></v-radio>
        <v-radio label="InActive" value="InActive"></v-radio>
      </v-radio-group>
    </v-col>

    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Description <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="productModel.product_description"
          label="Description"
          required
          class="form-control login-field"
          placeholder="Description"
        />
      </div>
        <div class="invalid-feedback" v-if="$v.productModel.product_description.$error">
        <span v-if="$v.productModel.product_description.$error">Description is required</span>
      </div>
      <!-- <v-text-field
          v-model="productModel.product_description"
          :error-messages="product_descriptionErrors"
          label="Description"
          required
          color="blue darken-3"
          @input="$v.productModel.product_description.$touch()"
          @blur="$v.productModel.product_description.$touch()"
        >
          <template v-slot:label>
            <div>Description <small style="color: red">*</small></div>
          </template></v-text-field
        > -->
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Ingredients (e.g Soy,Nuts,Eggs)
      </label>
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="productModel.ingradients"
          required
          class="form-control login-field"
          placeholder="Description"
        />
      </div>
      <!-- <v-text-field
          v-model="productModel.ingradients"
          label="Ingredients (e.g Soy,Nuts,Eggs)"
          required
          color="blue darken-3"
        ></v-text-field> -->
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
      product_name: { required },
      product_price: { required },
      product_description: { required, maxLength: maxLength(50) },
      product_VAT: { required },
      product_status: { required },
      product_image: { required },
      product_catagory_id: { required },
    },
  },
  data: () => ({
    menu: false,
    image: null,
    productModel: {
      product_name: "",
      product_price: "",
      product_VAT: "",
      product_description: "",
      ingradients: "",
      product_catagory_id: "",

      // category: "",
      product_status: "Active",
      product_image: "",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getcategoryList", "getproductById"]),

    product_nameErrors() {
      const errors = [];
      if (!this.$v.productModel.product_name.$dirty) return errors;
      !this.$v.productModel.product_name.required &&
        errors.push("Name is required.");
      return errors;
    },
    product_priceErrors() {
      const errors = [];
      if (!this.$v.productModel.product_price.$dirty) return errors;
      !this.$v.productModel.product_price.required &&
        errors.push("price is required.");
      return errors;
    },

    product_VATErrors() {
      const errors = [];
      if (!this.$v.productModel.product_VAT.$dirty) return errors;
      !this.$v.productModel.product_VAT.required &&
        errors.push("VAT is required.");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.productModel.product_catagory_id.$dirty) return errors;
      !this.$v.productModel.product_catagory_id.required &&
        errors.push("category is required.");
      return errors;
    },
    product_descriptionErrors() {
      const errors = [];
      if (!this.$v.productModel.product_description.$dirty) return errors;
      !this.$v.productModel.product_description.required &&
        errors.push("Decription is required.");
      return errors;
    },
  },

  methods: {
    handleFileUpload() {
      this.productModel.product_image = this.$refs.file.files[0];
    },

    async submit() {
      this.$v.$touch();
      
        if (!this.$v.$invalid) {
          if (this.productModel._id == null) {
            await this.$store
              .dispatch("addproduct", this.productModel)
              .then((res) => {
                this.$emit("closeIt");
                if (res.success) {
                  Swal.fire({
                    title: "",
                    text: res.message,
                    icon: "success",
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
            await this.$store
              .dispatch("updateproduct", this.productModel)
              .then((res) => {
                
                this.$emit("closeIt");
                if (res.success) {
                  Swal.fire({
                    title: "",
                    text: res.message,
                    icon: "success",
                  });
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

      this.$emit("closeIt");
    },
  },
  mounted() {
    if (this.getproductById) {
      this.productModel = this.getproductById;
     this.productModel.product_catagory_id = this.productModel.product_catagory_id._id;
      this.productModel.ingradients =
        this.productModel.product_gradient.toString();
    }
  },
  destroyed() {
    this.$store.dispatch("resetproductState");
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