<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
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
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
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
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.product_recipe"
          :error-messages="product_recipeErrors"
          label="Recipe"
          required
          color="blue darken-3"
          @input="$v.productModel.product_recipe.$touch()"
          @blur="$v.productModel.product_recipe.$touch()"
        >
         <template v-slot:label>
            <div>Recipe <small style="color: red">*</small></div>
          </template>
        
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
          v-model="productModel.prdouct_allergic"
          :error-messages="prdouct_allergicErrors"
          label="Allergic"
          required
          color="blue darken-3"
          @input="$v.productModel.prdouct_allergic.$touch()"
          @blur="$v.productModel.prdouct_allergic.$touch()"
        >
          <template v-slot:label>
            <div>Allergic <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-text-field
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
        </v-text-field>
      </v-col>
      <!-- <v-col class="col-6">
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
              v-model="productModel.expiry_date"
              label="Expiry Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="productModel.expiry_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="menu = false"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col> -->
      <!-- <v-col class="col-6">
        <v-text-field
          v-model="productModel.category"
          :error-messages="categoryErrors"
          label="Category"
          required
          color="blue darken-3"
          @input="$v.productModel.category.$touch()"
          @blur="$v.productModel.category.$touch()"
        ></v-text-field>
      </v-col> -->

      <v-col class="col-6">
        <v-select
          :items="getcategoryList"
          item-value="_id"
          item-text="catagories_name"
          v-model="productModel.product_catagory_id"
          label="Category"
          color="blue darken-3"
        >
          <template v-slot:label>
            <div>Category Name <small style="color: red">*</small></div>
          </template>
        </v-select>
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
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>

        <v-radio-group v-model="productModel.product_status" row>
          <v-radio label="Active" value="active"></v-radio>
          <v-radio label="InActive" value="inactive"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col class="col-6">
        <v-text-field
          v-model="productModel.product_description"
          :error-messages="product_descriptionErrors"
          label="Description"
          required
          color="blue darken-3"
          @input="$v.productModel.product_description.$touch()"
          @blur="$v.productModel.product_description.$touch()"
        ></v-text-field>
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
import { required ,maxLength} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    productModel: {
      product_name: { required },
      product_price: { required },
      product_recipe: { required },
      prdouct_allergic: { required },
      product_description: { maxLength: maxLength(50) },
      product_VAT: { required },
      product_status: { required },
    },
  },
  data: () => ({
    menu: false,
    image: null,
    productModel: {
      product_name: "",
      product_price: "",
      product_recipe: "",
      prdouct_allergic: "",
      product_VAT: "",
      product_description: "",
      // category: "",
      product_status: "active",
      product_image: "",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getcategoryList", "getproductById"]),

    product_nameErrors() {
      const errors = [];
      if (!this.$v.productModel.product_name.$dirty) return errors;
      !this.$v.productModel.product_name.required && errors.push("Name is required.");
      return errors;
    },
    product_priceErrors() {
      const errors = [];
      if (!this.$v.productModel.product_price.$dirty) return errors;
      !this.$v.productModel.product_price.required && errors.push("price is required.");
      return errors;
    },
    prdouct_allergicErrors() {
      const errors = [];
      if (!this.$v.productModel.prdouct_allergic.$dirty) return errors;
      !this.$v.productModel.prdouct_allergic.required &&
        errors.push("prdouct_allergic is required.");
      return errors;
    },
    product_recipeErrors() {
      const errors = [];
      if (!this.$v.productModel.product_recipe.$dirty) return errors;
      !this.$v.productModel.product_recipe.required &&
        errors.push("product_recipe is required.");
      return errors;
    },
    product_VATErrors() {
      const errors = [];
      if (!this.$v.productModel.product_VAT.$dirty) return errors;
      !this.$v.productModel.product_VAT.required && errors.push("VAT is required.");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.productModel.category.$dirty) return errors;
      !this.$v.productModel.category.required &&
        errors.push("category is required.");
      return errors;
    },
    product_descriptionErrors() {
      const errors = [];
      if (!this.$v.productModel.product_description.$dirty) return errors;
      !this.$v.productModel.product_description.maxLength &&
        errors.push("Description must be at most 50 characters long");
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
       await   this.$store
            .dispatch("updateproduct", this.productModel)
            .then((res) => {
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
        this.$emit("closeIt");
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
    }
  },
  destroyed() {
    this.$store.dispatch("resetproductState");
  },
};
</script>
