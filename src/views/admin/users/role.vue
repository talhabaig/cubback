<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-users mr-2 main_color"></i>Roles
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
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on"
              ><i class="fas fa-plus mr-2"></i>Add Role</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-user mr-2"></i>Add Role
                </span>
                <!-- <span v-else><i class="fas fa-user mr-2"></i>Edit Role</span> -->
              </v-toolbar>
              <v-card-text>
                <addRole @closeIt="closeModel"></addRole>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Role List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          color="blue darken-3"
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="fields" :items="items" :search="search">
        <template v-slot:[`item.role_permission_names`]="{ item }">
          {{ permissionName(item) }}
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
import addRole from "../../../components/users/addRole.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    addRole,
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
      items: [],
      fields: [
        {
          value: "role_name",
          text: "Name",
        },
        {
          value: "role_permission_names",
          text: "Permission",
          width: "40%",
        },
        {
          value: "role_status",
          text: "Status",
        },
        {
          value: "actions",
          text: "Action",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchData().catch((error) => {
          console.error(error);
        });
      },
    },
  },
  methods: {
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store.dispatch("getPermissionList");
      await this.$store.dispatch("getRoleList")
        .then((response) => {
          debugger;
          if (response) {
            debugger;
            this.isfetching = false;
            this.items = this.getroleList;
          }
        })
        .catch((ex) => {
          this.isfetching = false;
        });
    },
    editItem(obj) {
      console.log(obj);

      this.$store.dispatch("getRoleById", obj);
      this.dialog = true;
      this.isEdit = true;
    },
    permissionName(obj) {
      if(obj.role_permission_names){
      return obj.role_permission_names.toString().replaceAll(",", " ");}
      else{return null}
    },
    async closeModel() {
      await this.fetchData();
      this.dialog = false;
      this.isEdit = false;
    },

    warningModel(id) {
      this.delDialog = true;
      this.itemId = id;
    },

    closeWarningModel() {
      this.delDialog = false;
      this.itemId = "";
    },

    deleteItem() {
      this.$store.dispatch("removeRole", this.itemId).then((r) => {
        if (r.success) {
          this.fetchData();
          Swal.fire({
            title: "",
            text: r.message,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: r.message,
            icon: "error",
          });
        }
      });
      this.delDialog = false;
      this.itemId = "";
    },
  },
  mounted() {
    this.fetchData().catch((error) => {
      console.error(error);
    });
  },
  computed: {
    ...mapGetters(["getroleList"]),
  },
};
</script>
