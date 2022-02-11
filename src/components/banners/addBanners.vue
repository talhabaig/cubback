<template>
  <form>
    <v-row>
      <v-col class="col-6">
        <v-text-field
          v-model="bannerModel.banner_title"
          :error-messages="titleErrors"
          label="title"
          required
          color="blue darken-3"
          @input="$v.bannerModel.banner_title.$touch()"
          @blur="$v.bannerModel.banner_title.$touch()"
        >
               <template v-slot:label>
            <div>Title <small style="color: red">*</small></div>
          </template>
        </v-text-field>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="getcanteenList"
          item-value="_id"
          item-text="canteen_name"
          v-model="canteenId"
          @change="changeRoute"
          label="Canteen"
          color="blue darken-3"
        ></v-select>
      </v-col>
      <v-col class="col-6">
        <v-select
          :items="item"
          item-value="_id"
          item-text="machine_name"
          v-model="machineIds"
          multiple
          label="Machine"
          color="blue darken-3"
        ></v-select>
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
              v-model="bannerModel.banner_start_date"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="menu = false"
            v-model="bannerModel.banner_start_date"
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
              v-model="bannerModel.banner_end_date"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="menu1 = false"
            v-model="bannerModel.banner_end_date"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="col-6">
        <label>Select image</label> <small style="color: red">*</small>
        <br />
        <img :src="bannerModel.image" alt="" />
        <input
          type="file"
          id="file"
          ref="file"
          accept="image/jpg, image/jpeg, image/png"
          @change="handleFileUpload()"
        />
        <!-- <v-file-input
          @change="Preview_image"
          v-model="image"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
        ></v-file-input> -->
      </v-col>
      <v-col class="col-6">
        <strong>Status</strong>

        <v-radio-group v-model="bannerModel.banner_status" row>
          <v-radio label="Active" value="active"></v-radio>
          <v-radio label="InActive" value="inactive"></v-radio>
        </v-radio-group>
      </v-col>
      <!-- <v-col class="col-6">
        <v-text-field
          v-model="bannerModel.banner_description"
          label="Description"
          color="blue darken-3"
        ></v-text-field>
      </v-col> -->
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
    bannerModel: {
      banner_title: { required },
      banner_status: { required },
    },
  },
  data: () => ({
    menu: false,
    menu1: false,
    item: null,
    image: null,
    machineIds: null,
    canteenId: null,
    bannerModel: {
      banner_title: "",
      machine_id: [],
      banner_description: "",
      banner_status: "active",
      image: "",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getmachineList", "bannerById"]),

    titleErrors() {
      const errors = [];
      if (!this.$v.bannerModel.banner_title.$dirty) return errors;
      !this.$v.bannerModel.banner_title.required && errors.push("title is required.");
      return errors;
    },
  },

  methods: {
    handleFileUpload() {
      this.bannerModel.image = this.$refs.file.files[0];
    },

    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.bannerModel.banner_machine_ids = this.machineIds;
        if (this.bannerModel._id == null) {
          await this.$store
            .dispatch("addbanner", this.bannerModel)
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
          this.$store.dispatch("updatebanner", this.bannerModel).then((res) => {
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
    async changeRoute(id) {
      await this.$store.dispatch("machinesList", id).then((res) => {
        this.item = this.getmachineList;
        this.machineIds = this.getmachineList.map(function (a) {
          return a._id;
        });
      });
    },
  },
  mounted() {
    this.item = this.getmachineList;
    if (this.bannerById) {
      this.bannerModel = this.bannerById;  
      this.machineIds = this.bannerModel.machine.map((e) => {
        return e.machines._id;
      });
    }
  },
  destroyed() {
    this.$store.dispatch("resetbannerState");
  },
};
</script>
