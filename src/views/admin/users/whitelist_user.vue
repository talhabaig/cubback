<template>
  <div>
    <v-card class="d-flex justify-space-around align-center mb-10">
      <v-card-text>
        <p class="text-h4 text--primary mb-0">
          <i class="fas fa-users mr-2 main_color"></i>White List User
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
            <v-btn dark color="main_bg_color" v-bind="attrs" v-on="on"
              ><i class="fas fa-plus mr-2"></i>Add White List User</v-btn
            >
          </template> -->
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar color="main_bg_color" dark class="mb-2">
                <span v-if="isEdit == false"
                  ><i class="fas fa-user mr-2"></i>Add White List User
                </span>
                <span v-else><i class="fas fa-user mr-2"></i>Edit White List User</span>
              </v-toolbar>
              <v-card-text>
                <addUser @closeIt="closeModel"></addUser>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        User List
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
       
        <template v-slot:[`item.roleName`]="{ item }">
          {{ item.role.roleName }}
        </template>
     
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
import addUser from "../../../components/users/addWhiteUser.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    addUser,
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
          value: "user_name",
          text: "Name",
        },
        {
          value: "user_email",
          text: "Email",
        },
        {
          value: "user_phone",
          text: "PHONE.",
        },
        {
          value: "user_role",
          text: "Role",
        },
        {
          value: "user_status",
          text: "Status",
        },
        {
          value: "actions",
          text: "Action",
          sortable: false,
        },
        {
          value: "actions",
          text: "Action",
          sortable: false,
        },
      ],
      isApprovedOptions: [
        { text: "Approved", value: true },
        { text: "Not Approved", value: false },
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
    getuserList: {
      handler: function () {
        this.items = this.getuserList.filter((x) => {
          return x.user_role == "user";
        });
      },
    },
  },
  methods: {
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
           await this.$store.dispatch("getRoleList")
      await this.$store
        .dispatch("getUserList")
        .then((response) => {
          if (response.status) {
            this.isfetching = false;
            this.items = this.getuserList;
          }
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },

    editItem(obj) {
     
      this.$store.dispatch("getUserById", obj);
      this.dialog = true;
      this.isEdit = true;
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
     
      this.$store.dispatch("removeUser", this.itemId).then((r) => {
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

    getColor(value) {
      if (value == true) return "green";
      else return "orange";
    },
  },
  mounted() {
    this.fetchData().catch((error) => {
      console.error(error);
    });
  },
  computed: {
    ...mapGetters(["getuserList"]),
  },
};
</script>
