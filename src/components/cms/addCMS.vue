<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="cmsModel.title"
          :error-messages="titleErrors"
          label="Title"
          required
          color="blue darken-3"
          @input="$v.cmsModel.title.$touch()"
          @blur="$v.cmsModel.title.$touch()"
        >
        
        <template v-slot:label>
            <div>Title <small style="color: red">*</small></div>
          </template>
          </v-text-field>
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>
        <v-radio-group v-model="cmsModel.status" row>
          <v-radio label="Active" value="active"></v-radio>
          <v-radio label="InActive" value="inactive"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col class="col-12">
        <quill-editor v-model="cmsModel.description" ref="quillEditorA"  >
        </quill-editor>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  mixins: [validationMixin],
  components: {
    quillEditor,
  },
  validations: {
    cmsModel: {
      title: { required },
      location: { required },
    },
  },
  data: () => ({
    cmsModel: {
      title: "",
      description: "",
      status: "active",
    },
  }),

  computed: {
    ...mapGetters(["getcmsById"]),

    titleErrors() {
      const errors = [];
      if (!this.$v.cmsModel.title.$dirty) return errors;
      !this.$v.cmsModel.title.required && errors.push("title is required.");
      return errors;
    },
    locationErrors() {
      const errors = [];
      if (!this.$v.cmsModel.location.$dirty) return errors;
      !this.$v.cmsModel.location.required &&
        errors.push("Location is required.");
      return errors;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      if (this.cmsModel._id == null) {
        await this.$store.dispatch("addcms", this.cmsModel).then((res) => {
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
        await this.$store.dispatch("updatecms", this.cmsModel).then((res) => {
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
      }
      this.$emit("closeIt");
    },
    clear() {
      this.$v.$reset();
      (this.cmsModel = {
        title: "",
        location: "",
      }),
        this.$emit("closeIt");
    },
  },
  mounted() {
    debugger
    if (this.getcmsById) {
      this.cmsModel = this.getcmsById;
    }
  },
  destroyed() {
    this.$store.dispatch("resetcmsState");
  },
};
</script> 