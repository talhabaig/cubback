<template>
  <div>
    <div id="myTable">
      <!-- <div class="col-md-10">
        <h2 style="color: #f8932d">Fridge Canteen</h2>
      </div> -->
      <!-- <div :class="'R' + r" class="row" v-for="r in Row"> -->
      <div :class="'R' + r" class="row" v-for="(r, i) in row" :key="i">
        <div
          :class="'col-md-' + data.channel_width"
          v-for="(data, index) in getmachineById.filter(
            (x) => x.row_number == r
          )"
          :key="index"
          class="channalDiv"
          v-if="data.row_number == r"
        >
        <center>
          <div
            @click="
              mergeChanal(
                data,
                getmachineById.filter((x) => x.row_number == r)
              )
            "
          >
            <i color="#f8932d" class="fas fa-object-ungroup">Merge</i>
          </div>
          <div v-if="data.channel_width > 1" @click="unmergeChanal(data)">
            <i color="#f8932d" class="far fa-object-ungroup">Un Merge</i>
          </div>
          <div>
            <div style="font-size: 12px" @click="chanalclick(data)">
              <a>{{ data.channel_name }}</a>
            </div>
          </div>
          <span v-if="data.channel_product_quantity">{{
            data.channel_product_quantity
          }}</span>

          <span v-if="data.products">
            {{ data.products.product_name }} <br />
            <span
              @click="RemoveQunatity(data)"
              v-if="data.channel_product_quantity"
              ><i class="fas fa-trash-alt">Qunatity</i>
            </span>
            <span @click="AddQunatity(data)"
              ><i class="fa fa-plus" aria-hidden="true">Qunatity</i></span
            ></span
          >
          </center>
        </div>
        <div class="col-md-1">
          <v-btn
            dark
            color="main_bg_color"
            v-if="getmachineById.filter((x) => x.row_number == r).length < 10"
            @click="addChanal(r)"
          >
            <i class="fas fa-plus mr-2"></i
          ></v-btn>
        </div>

        <!-- <div
          class="col-md-1 channalDiv"
          v-for="(c, ndx) in machineModel.channel"
          :key="ndx"
          v-if="channalname(c.channel.channel_name) == 'R' + r"
          @click="chanalclick(c)"
        >
          <center style="font-size: 12px">{{ c.channel.channel_name }}</center>
          <span v-if="c.channel.channel_product_quantity">{{
            c.channel.channel_product_quantity
          }}</span>
          <span v-if="c.product"> {{ c.product.product_name }}</span>
        </div> -->
      </div>
    </div>
    <b-modal
      size="xl"
      id="addChannel"
      hide-footer
      centered
      style="height: 500px"
      no-close-on-backdrop
    >
      <template slot="modal-title">
        <span>Add Channel in Machine</span>
      </template>
      <v-row v-if="chanelModel">
        <v-col class="col-6">
          <v-text-field
            :value="chanelModel.row_number"
            label="Row # "
            disabled
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_name"
            label="Channel : "
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-select
            :items="getproductList"
            item-value="_id"
            item-text="product_name"
            v-model="chanelModel.channel_product_id"
            label="Product"
            color="blue darken-3"
          ></v-select>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_extraction_time"
            label="Extraction Time"
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.column_number"
            type="number"
            label="Possition"
          ></v-text-field>
        </v-col>
        <!-- <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_product_quantity"
            label="Quantity"
          ></v-text-field>
        </v-col> -->

        <v-col class="col-6">
          <strong>Status</strong>
          <v-radio-group v-model="chanelModel.channel_status" row>
            <v-radio label="Active" value="active"></v-radio>
            <v-radio label="InActive" value="inactive"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_temperature"
            label="Temperature"
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_voltage"
            label="voltage"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            dark
            color="main_bg_color"
            @click="addChannelinrow"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" @click="clearAssociate"> Close </v-btn>
        </v-col>
      </v-row>
    </b-modal>
    <b-modal
      size="xl"
      id="updateChannel"
      hide-footer
      centered
      style="height: 500px"
      no-close-on-backdrop
    >
      <template slot="modal-title">
        <span>Associate Products with Channels</span>
      </template>
      <v-row v-if="chanelModel">
        <v-col class="col-6">
          <v-text-field
            :value="chanelModel.channel_name"
            label="Channel : "
            disabled
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-select
            :items="getproductList"
            item-value="_id"
            item-text="product_name"
            v-model="chanelModel.channel_product_id"
            label="Product"
            color="blue darken-3"
          ></v-select>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_extraction_time"
            label="Extraction Time"
          ></v-text-field>
        </v-col>
        <!-- <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_product_quantity"
            label="Quantity"
          ></v-text-field>
        </v-col> -->

        <v-col class="col-6">
          <strong>Status</strong>
          <v-radio-group v-model="chanelModel.channel_status" row>
            <v-radio label="Active" value="active"></v-radio>
            <v-radio label="InActive" value="inactive"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_temperature"
            label="Temperature"
          ></v-text-field>
        </v-col>
        <v-col class="col-6">
          <v-text-field
            v-model="chanelModel.channel_voltage"
            label="voltage"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            dark
            color="main_bg_color"
            @click="submitAssociate"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" @click="clearAssociate"> Close </v-btn>
        </v-col>
      </v-row>
    </b-modal>
    <b-modal
      size="SM"
      id="addQuantity"
      hide-footer
      centered
      style="height: 500px"
      no-close-on-backdrop
    >
      <template slot="modal-title">
        <span>Add Quantity</span>
      </template>
      <v-row>
        <v-col class="col-6">
          <v-text-field
            type="number"
            v-model="quantityModel.channel_product_quantity"
            label="Quantity"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            dark
            color="main_bg_color"
            @click="submitQuantity"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" @click="clear"> Close </v-btn>
        </v-col>
      </v-row>
    </b-modal>
    <b-modal
      size="sm"
      id="removeQuantity"
      hide-footer
      centered
      style="height: 500px"
      no-close-on-backdrop
    >
      <template slot="modal-title">
        <span>Remove Quantity</span>
      </template>
      <v-row>
        <v-col class="col-6">
          <v-text-field
            type="number"
            v-model="quantityModel.channel_product_quantity"
            label="Quantity"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            dark
            color="main_bg_color"
            @click="remQuantity"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" @click="clear"> Close </v-btn>
        </v-col>
      </v-row>
    </b-modal>

    <b-modal
      size="sm"
      id="mergeChannal"
      hide-footer
      centered
      style="height: 500px"
      no-close-on-backdrop
    >
      <template slot="modal-title">
        <span>Merge Chanal</span>
      </template>
      <v-row>
        <v-col class="col-6">
          <v-select
            :items="mergeRow"
            item-value="_id"
            item-text="channel_name"
            v-model="selectedChanalForMerge"
            multiple
            label="Channals"
            color="blue darken-3"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn
            class="mr-4"
            style="margin: 10px"
            dark
            color="main_bg_color"
            @click="submit_mergChannal"
          >
            submit
          </v-btn>
          <v-btn style="margin: 10px" @click="clear"> Close </v-btn>
        </v-col>
      </v-row>
    </b-modal>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],
  validations: {},
  data: () => ({
    row: null,
    mergeWith: null,
    mergeRow: null,
    selectedChanalForMerge: null,
    quantityModel: {
      channel_product_quantity: 0,
      channel_id: "",
      product_id: "",
    },
    chanelModel: {
      channel_name: "",
      channel_product_id: "",
      channel_extraction_time: "",
      channel_status: "",
      row_number: 0,
    },
  }),
  computed: {
    ...mapGetters(["getcanteenList", "getproductList", "getmachineById"]),
  },
  watch: {},
  methods: {
    channalname(obj) {
      debugger;
      return obj.substring(0, 2);
    },
    addChanal(obj) {
      this.chanelModel.row_number = obj;
      this.$bvModal.show("addChannel");
    },
    mergeChanal(obj, array) {
      debugger;
      this.selectedChanalForMerge = null
      this.mergeWith = obj;
      var index = array.findIndex((e) => e._id == obj._id);
      var prev = array[index - 1];
      var after = array[index + 1];
      this.mergeRow = array.filter((e) => {
        if (prev && after) {
          return e._id == prev._id || e._id == after._id;
        } else if (prev) {
          return e._id == prev._id;
        } else if (after) {
          return e._id == after._id;
        }
      });
      this.$bvModal.show("mergeChannal");
    },
    async unmergeChanal(obj) {
      await this.$store.dispatch("unmergeChannal", obj);
      await this.$store.dispatch(
        "getmachinechannels",
        this.getmachineById[0].machine_id
      );
    },
    AddQunatity(obj) {
      this.quantityModel.channel_id = obj._id;
      this.quantityModel.product_id = obj.channel_product_id;
      this.$bvModal.show("addQuantity");
    },
    RemoveQunatity(obj) {
      this.quantityModel.channel_id = obj._id;
      this.quantityModel.channel_product_quantity =
        obj.channel_product_quantity;
      this.quantityModel.product_id = obj.channel_product_id;
      this.$bvModal.show("removeQuantity");
    },
    clear() {
      this.$bvModal.hide("addQuantity");
      this.$bvModal.hide("mergeChannal");
    },
    async submitAssociate() {
      await this.$store.dispatch("updateChannel", this.chanelModel);
      await this.$store.dispatch(
        "getmachinechannels",
        this.chanelModel.machine_id
      );
      this.machineModel = this.getmachineById;
      this.$bvModal.hide("updateChannel");
    },
    async addChannelinrow() {
      debugger;
      this.chanelModel.machine_id = this.getmachineById[0].machine_id;
      await this.$store.dispatch("addChannel", this.chanelModel);
      await this.$store.dispatch(
        "getmachinechannels",
        this.chanelModel.machine_id
      );
      this.$bvModal.hide("addChannel");
    },
    // async RemoveQunatity(obj) {
    //   debugger;

    //   await this.$store.dispatch("addChannel", this.chanelModel);
    //   await this.$store.dispatch(
    //     "getmachinechannels",
    //     this.chanelModel.machineId
    //   );
    //   this.$bvModal.hide("addChannel");
    // },
    async submitQuantity() {
      this.quantityModel.channel_product_quantity = parseInt(
        this.quantityModel.channel_product_quantity
      );
      await this.$store.dispatch("addChannelQuantity", this.quantityModel);
      await this.$store.dispatch(
        "getmachinechannels",
        this.getmachineById[0].machine_id
      );
      this.$bvModal.hide("addQuantity");
    },
    async submit_mergChannal() {
      await this.$store.dispatch("mergeChannal", {
        mergeChannal: this.mergeWith,
        arrayData: this.selectedChanalForMerge,
      });
      await this.$store.dispatch(
        "getmachinechannels",
        this.getmachineById[0].machine_id
      );
      this.$bvModal.hide("mergeChannal");
    },
    async remQuantity() {
      this.quantityModel.channel_product_quantity = parseInt(
        this.quantityModel.channel_product_quantity
      );
      await this.$store.dispatch("remChannelQuantity", this.quantityModel);
      await this.$store.dispatch(
        "getmachinechannels",
        this.getmachineById[0].machine_id
      );
      this.$bvModal.hide("removeQuantity");
    },

    clearAssociate() {
      this.$bvModal.hide("updateChannel");
    },

    chanalclick(obj) {
      this.chanelModel = obj;
      this.$bvModal.show("updateChannel");
    },
  },
  mounted() {
    this.row = this.getmachineById.filter(
      (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
    ).length;
    // if (this.getmachineById) {
    //   debugger;
    //   this.machineModel = this.getmachineById;
    // }
  },
  destroyed() {
    this.$store.dispatch("resetmachineState");
  },
};
</script>
<style scoped>
.channalDiv {
  border-style: solid;
  border-color: #f8932d;
  transition: 1s all;
}
/* #myTable {
  padding-left: 30%;
} */
</style>
