<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="categoryModel.catagories_name"
          :error-messages="catagories_nameErrors"
          label="Category Name"
          required
          color="blue darken-3"
          @input="$v.categoryModel.catagories_name.$touch()"
          @blur="$v.categoryModel.catagories_name.$touch()"
        >  <template v-slot:label>
            <div>Category Name <small style="color: red">*</small></div>
          </template></v-text-field>
      </v-col>
       <v-col class="col-6">
          <strong>Status</strong>
          <v-radio-group v-model="categoryModel.catagories_status" row>
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
    categoryModel: {
      catagories_name: { required }, 
    },
  },
  data: () => ({
    categoryModel: {
      catagories_name: "", 
      catagories_status:"active"
    },
  }),

  computed: {
    ...mapGetters(["getcategoryById"]), 
    catagories_nameErrors() {
      const errors = [];
      if (!this.$v.categoryModel.catagories_name.$dirty) return errors;
      !this.$v.categoryModel.catagories_name.required && errors.push("Catagory name is required.");
      return errors;
    }, 
  },

  methods: {
   async submit() {
      this.$v.$touch();
      if (this.categoryModel._id == null) {
      await  this.$store.dispatch("addcategory", this.categoryModel).then((res) => {
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
             this.$emit("closeIt");
        });
      } else {
      await  this.$store.dispatch("updatecategory", this.categoryModel).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "",
              text: res.data.success,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res.data.success,
              icon: "error",
            });
          }
        });
           this.$emit("closeIt");
      }
   
    },
    clear() {
      this.$v.$reset();
      (this.categoryModel = {
        catagories_name: "",
        location: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
   
    if (this.getcategoryById) {
      this.categoryModel = this.getcategoryById;     }
  },
  destroyed() {
    this.$store.dispatch("resetcategoryState");
  },
};
</script>
