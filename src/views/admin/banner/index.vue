<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-stream Orders mr-2 main_color"></i>
          Banner
        </p>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on">
              <i class="fas fa-plus mr-2"></i>Add Banner</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-stream Orders mr-2"></i>Add Banner</span
                >
                <span v-else
                  ><i class="fas fa-stream Orders mr-2"></i>Edit Banner</span
                >
              </v-toolbar>
              <v-card-text>
                <addBanner @closeIt="closeModel"></addBanner>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Banner List
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
        <template v-slot:[`item.machine`]="{ item }">
          {{ machineName(item) }}
        </template>
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
import addBanner from "../../../components/banners/addBanners.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    addBanner,
  },
  data() {
    return {
      isEdit: false,
      dialog: false,
      delDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: true,
          value: "banner_title",
        },
        {
          text: "Start Date",
          align: "start",
          sortable: true,
          value: "banner_start_date",
        },
        {
          text: "End Date",
          align: "start",
          sortable: true,
          value: "banner_end_date",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "banner_status",
        },
        // {
        //   text: "Machine Name (If Any)",
        //   align: "start",
        //   sortable: true,
        //   value: "machine",
        // },

        {
          value: "actions",
          text: "Action",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  methods: {
    async fetchData() {
     
      this.isfetching = true;
      await this.$store.dispatch("getcanteensList");
      await this.$store.dispatch("machinesList");
      await this.$store
        .dispatch("bannersList")
        .then((response) => { 
          this.isfetching = false; 
          var array = [];
          this.getbannerList.forEach((i) => {
            var data = {
              banner_description: i._id.banner_description,
              banner_end_date: i._id.banner_end_date,
              banner_id: i._id.banner_id,
              banner_image: i._id.banner_image,
              banner_start_date: i._id.banner_start_date,
              banner_status: i._id.banner_status,
              banner_title: i._id.banner_title,
              id: i._id.id,
              machine: i.Machine,
            };
            array.push(data);
          });
          this.items =  this.getbannerList;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },
    machineName(obj) {
      return obj.machine
        .map((e) => {
          return e.machines.machine_name;
        })
        .toString();
    },
    editItem(obj) {
      this.$store.dispatch("getbannerById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    async closeModel() {
      await this.fetchData();
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

    async deleteItem() {
     
      this.$store.dispatch("removebanner", this.itemId).then((response) => {
        Swal.fire({
          title: "",
          text: "success",
          icon: "success",
        });
        this.fetchData().catch((error) => {
          console.error(error);
        });
      });
      await this.fetchData();
      this.delDialog = false;
      this.itemId = "";
    },
  },
  destroyed() {
    this.$store.dispatch("resetbannerListState");
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["getbannerList"]),
  },
};
</script>
