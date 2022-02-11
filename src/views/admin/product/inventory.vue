<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-stream Orders mr-2 main_color"></i>
          Inventory
        </p>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on">
              <i class="fas fa-plus mr-2"></i>Add Inventory</v-btn
            >
          </template> -->
          <!-- <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-stream Orders mr-2"></i>Add Inventory</span
                >
                <span v-else
                  ><i class="fas fa-stream Orders mr-2"></i>Edit Inventory</span
                >
              </v-toolbar>
              <v-card-text>
                <addInventory @closeIt="closeModel"></addInventory>
              </v-card-text>
            </v-card>
          </template> -->
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Inventory List
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-select
          :items="getcanteenList"
          item-value="_id"
          :clearable="true"
          item-text="canteen_name"
          v-model="canteen_id"
          label="Canteen"
          @change="onChangeCanteen"
          color="blue darken-3"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
          :items="getmachineList"
          :clearable="true"
          item-value="_id"
          item-text="machine_name"
          v-model="machine_id"
          @change="onChangeMachine"
          label="Machine"
          color="blue darken-3"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
          :items="getproductList"
          :clearable="true"
          item-value="_id"
          item-text="product_name"
          v-model="product_id"
          label="Product"
          @change="onChangeProduct"
          color="blue darken-3"
        ></v-select>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          color="blue darken-3"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <!-- @click="" -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2 edit_btn" @click.stop="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="warningModel(item._id)" class="del_btn">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <template>
      <v-dialog v-model="delDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5 orange lighten-1 text-white">
            Warning
          </v-card-title>
          <v-card-text class="pt-10 text-h6">
            Do you want to delete entry?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeWarningModel()">
              Disagree
            </v-btn>

            <v-btn color="deep-orange darken-4" text @click="deleteItem()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<script>
import addInventory from "../../../components/product/addInventory.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    addInventory,
  },
  data() {
    return {
      machine_id: "",
      product_id: "",
      canteen_id: "",
      isEdit: false,
      dialog: false,
      delDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "productName",
        },
        {
          text: "Quantity",
          align: "start",
          sortable: true,
          value: "Quantity",
        },
      ],
      items: [],
    };
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("getcanteensList");
      await this.$store.dispatch("productsList");
      await this.$store.dispatch("machinesList", null);
      await this.$store.dispatch("inventoryList").then((res) => {
        if (res) {
          this.items = this.getinventoryList;
        }
      });
      this.isfetching = true;
      // await this.$store
      //   .dispatch("inventorysList")
      //   .then((response) => {
      //     console.log(response);
      //     this.isfetching = false;
      //     // this.items = this.getinventoryList;
      //   })
      //   .catch((ex) => {
      //     this.isfetching = false;
      //     console.log(ex);
      //   });
    },
    async onChangeCanteen(obj) {
      if (obj) {
        await this.$store.dispatch("machinesList", obj)
          .then((response) => { 
             this.getmachineList;
          }) 
        await this.$store
          .dispatch("inventoryList", "canteen/" + obj)
          .then((res) => {
            if (res) {
              this.items = this.getinventoryList;
            }
          });
      }else{
      await  this.fetchData()
      }
    },
    async onChangeMachine(obj) {
      if (obj) {

        await this.$store.dispatch("getProductByMachineId",obj)
        await this.$store
          .dispatch("inventoryList", "machine/" + obj)
          .then((res) => {
            if (res) {
              this.items = this.getinventoryList;
            }
          });
      }else{
      await  this.fetchData()
      }
    },
    async onChangeProduct(obj) {
      if (obj) {
        await this.$store
          .dispatch("inventoryList", "product/" + obj)
          .then((res) => {
            if (res) {
              this.items = this.getinventoryList;
            }
          });
      }else{
      await  this.fetchData()
      }
    },
    editItem(obj) {
      this.$store.dispatch("getinventoryById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    closeModel() {
      this.fetchData();
      this.dialog = false;
      this.isEdit = false;
    },

    warningModel(id) {
      console.log(id);
      this.delDialog = true;
      this.itemId = id;
    },

    closeWarningModel() {
      this.delDialog = false;
      this.itemId = "";
    },

    deleteItem() {
      this.$store.dispatch("removeinventory", this.itemId).then((response) => {
        Swal.fire({
          title: "",
          text: "success",
          icon: "success",
        });
      });
      this.delDialog = false;
      this.itemId = "";

      this.fetchData().catch((error) => {
        console.error(error);
      });
    },
  },
  destroyed() {
    this.$store.dispatch("resetinventoryListState");
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters([
      "getinventoryList",
      "getmachineList",
      "getproductList",
      "getcanteenList",
    ]),
  },
};
</script>
