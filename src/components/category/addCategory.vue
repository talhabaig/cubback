<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <label class="regularFont login-font" style=""
          >Category Name <small style="color: red">*</small></label
        >
        <div class="right-inner-addon input-container pb-0">
          <input
            v-model="categoryModel.catagories_name"
            type="text"
            class="form-control login-field"
            placeholder=" Category Name"
          />
        </div>
        <div
          class="invalid-feedback"
          v-if="$v.categoryModel.catagories_name.$error"
        >
          <span v-if="$v.categoryModel.catagories_name.$error"
            >Category Name is required</span
          >
        </div>
      </v-col>
      <v-col class="col-6">
        <label class="regularFont login-font" style=""
          >Status<small style="color: red">*</small></label
        >
        <v-radio-group v-model="categoryModel.catagories_status" row>
          <v-radio label="Active" value="Active"></v-radio>
          <v-radio label="InActive" value="InActive"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="col-6">
        <label class="regularFont login-font" style=""
          >Select Image <small style="color: red">*</small></label
        >
        <br />
        <img :src="categoryModel.category_image" alt="" />
        <input
          type="file"
          id="file"
          ref="file"
          accept="image/jpg, image/jpeg, image/png"
          @change="handleFileUpload()"
        />
        <div
          class="invalid-feedback"
          v-if="$v.categoryModel.category_image.$error"
        >
          <span v-if="$v.categoryModel.category_image.$error"
            >Category Image is required</span
          >
        </div>
      </v-col>
      <v-col class="col-12 d-flex justify-center">
        <v-btn class="mr-4 modal-btn btnn" @click="clear"> Close </v-btn>

        <v-btn class="modal-btn" dark color="main_bg_color" @click="submit">
          Submit
        </v-btn>
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
      category_image: { required },
    },
  },
  data: () => ({
    categoryModel: {
      catagories_name: "",
      category_image: "",
      catagories_status: "Active",
    },
  }),

  computed: {
    ...mapGetters(["getcategoryById"]),
    catagories_nameErrors() {
      const errors = [];
      if (!this.$v.categoryModel.catagories_name.$dirty) return errors;
      !this.$v.categoryModel.catagories_name.required &&
        errors.push("Catagory name is required.");
      return errors;
    },
  },

  methods: {
    handleFileUpload() {
      this.categoryModel.category_image = this.$refs.file.files[0];
    },
    async submit() {
      this.$v.$touch();
      if (this.categoryModel._id == null) {
        if (!this.$v.$invalid) {
          await this.$store
            .dispatch("addcategory", this.categoryModel)
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
              this.$emit("closeIt");
            });
        }
        // else {
        //   Swal.fire({
        //     title: "",
        //     text: "Image is Required",
        //     icon: "error",
        //   });
        // }
      } else {
        await this.$store
          .dispatch("updatecategory", this.categoryModel)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "",
                text: res.data.message,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: res.data.message,
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
      this.categoryModel = this.getcategoryById;
    }
  },
  destroyed() {
    this.$store.dispatch("resetcategoryState");
  },
};
</script>
