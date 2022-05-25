<template>
  <v-row>
    <v-col class="col-6">
      <label class="regularFont login-font" style=""
        >Title <small style="color: red">*</small></label
      >
      <div class="right-inner-addon input-container pb-0">
        <input
          v-model="bannerModel.banner_title"
          type="text"
          class="form-control login-field"
        />
      </div>
      <div class="invalid-feedback" v-if="$v.bannerModel.banner_title.$error">
        <span v-if="$v.bannerModel.banner_title.$error">Title is required</span>
      </div>
    </v-col>
    <v-col class="col-6">
      <label class="regularFont login-font" style="">Select Canteen </label>
      <div class="right-inner-addon input-container pb-0">
        <select v-model="canteenId" class="form-control login-field">
          <option v-for="(d, i) in getcanteenList" :key="i" :value="d._id">
            {{ d.canteen_name }}
          </option>
        </select>
      </div>
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
          :min="nowDate"
          @input="menu = false"
          v-model="bannerModel.banner_start_date"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      <div
        class="invalid-feedback"
        v-if="$v.bannerModel.banner_start_date.$error"
      >
        <span v-if="$v.bannerModel.banner_start_date.$error"
          >Start Date is required</span
        >
      </div>
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
          :min="nowDate"
          @input="menu1 = false"
          v-model="bannerModel.banner_end_date"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      <div
        class="invalid-feedback"
        v-if="$v.bannerModel.banner_end_date.$error"
      >
        <span v-if="$v.bannerModel.banner_end_date.$error"
          >End Date is required</span
        >
      </div>
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
      <div class="invalid-feedback" v-if="$v.bannerModel.image.$error">
        <span v-if="$v.bannerModel.image.$error">Image is required</span>
      </div>
    </v-col>
    <v-col class="col-6">
      <strong>Status</strong>

      <v-radio-group v-model="bannerModel.banner_status" row>
        <v-radio label="Active" value="Active"></v-radio>
        <v-radio label="InActive" value="InActive"></v-radio>
      </v-radio-group>
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
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {
    bannerModel: {
      banner_title: { required },
      banner_start_date: { required },
      banner_end_date: { required },
      image: { required },
    },
  },
  data: () => ({
    menu: false,
    nowDate: new Date().toISOString().slice(0, 10),
    menu1: false,
    item: null,
    image: null,
    machineIds: null,
    canteenId: null,
    bannerModel: {
      banner_title: "",
      machine_id: [],
      banner_description: "",
      banner_status: "Active",
      image: "",
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getmachineList", "bannerById"]),

    titleErrors() {
      const errors = [];
      if (!this.$v.bannerModel.banner_title.$dirty) return errors;
      !this.$v.bannerModel.banner_title.required &&
        errors.push("Title is required.");
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
        this.bannerModel.banner_canteen_ids = [];
        this.bannerModel.banner_canteen_ids.push(this.canteenId);
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
              } else if (res.errors) {
                Swal.fire({
                  title: "",
                  text: res.errors[0].msg,
                  icon: "error",
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
            if (res.errors) {
              Swal.fire({
                title: "",
                text: res.errors[0].msg,
                icon: "error",
              });
            }
            if (res.data.success) {
              Swal.fire({
                title: "",
                text: res.data.message,
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
      this.canteenId = this.bannerModel.machine.map((e) => {
        return e.machines._id;
      });
    }
  },
  destroyed() {
    this.$store.dispatch("resetbannerState");
  },
};
</script>
