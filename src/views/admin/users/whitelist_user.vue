<template>
  <div>
    <div class="d-flex justify-space-around align-center mb-2 mt-3">
      <v-card-text class="pl-0">
        <div class="pageHeadingIcon">
          <div>
            <img
              src="../../../assets/logos/user.svg"
              style="margin-top: -10px"
            />
          </div>
          <h2>White List User</h2>
        </div>
      </v-card-text>

      <div class="right-inner-addon2 input-container pb-0">
        <i
          ><img
            src="../../../assets/logos/Icon ionic-ios-search.svg"
            height="15px"
        /></i>

        <input
          class="left normal border-radius bg-clr mt-1 searchfield"
          type="text"
          placeholder="Search Here..."
          v-model="search"
        />
      </div>

      <v-card-actions class="pa-5 pr-1">
        <!------------------------------------------------------------------>
        <v-dialog
          v-model="bulkdialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="hasPermission('user_create')"
              dark
              color="main_bg_color"
              v-bind="attrs"
              v-on="on"
              class="mr-3"
              ><i class="mr-2"
                ><img
                  src="../../../assets/logos/Icon-metro-user-plus.svg"
                  height="18px" /></i
              >Add bulk User</v-btn
            >
          </template>
          <template>
            <v-card>
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span
                 
                  class="text-center justify-center"
                  style="font-size: 26px !important"
                  >Add bulk USER
                </span>
                
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>
              <v-card-text>
                <bulk-white-user @closeIt="closeModel"></bulk-white-user>
              </v-card-text>
             
            </v-card>
          </template>
        </v-dialog>
        <!------------------------------------------------------------------>
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="hasPermission('user_create')"
              dark
              color="main_bg_color"
              v-bind="attrs"
              v-on="on"
              ><i class="mr-2"
                ><img
                  src="../../../assets/logos/Icon-metro-user-plus.svg"
                  height="18px" /></i
              >Add User</v-btn
            >
          </template>
          <template v-if="dialog" v-slot:default="dialog">
            <v-card>
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span
                  v-if="isEdit == false"
                  class="text-center justify-center"
                  style="font-size: 26px !important"
                  >Add USER
                </span>
                <span v-else>Edit User</span>
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>
              <v-card-text v-if="isEdit == false">
                <addWhiteUser @closeIt="closeModel"></addWhiteUser>
              </v-card-text>
              <v-card-text v-else>
                <addWhiteUser @closeIt="closeModel"></addWhiteUser>
                <!-- <editUser @closeIt="closeModel"></editUser> -->
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
      <v-card-actions class="pa-5 pr-1">
        <v-dialog
          v-model="viewDialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-if="viewDialog" v-slot:default="viewDialog">
            <v-card>
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span
                  class="text-center justify-center"
                  style="font-size: 26px !important"
                  >View User
                </span>
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>

              <v-card-text>
                <editWhiteUser @closeIt="closeModel"></editWhiteUser>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
    </div>
    <div class="tableWrapper">
      <table class="row mx-0" id="myTable">
        <thead class="px-0">
          <tr class="tableHead">
            <th class="name">Name</th>
            <th class="email">Email</th>
            <th class="phone">Phone</th>
            <th class="canteen">Canteen</th>
            <th class="status">Status</th>
            <th class="action">Action</th>
          </tr>
        </thead>
        <tbody class="px-0">
          <tr
            class="px-0 tabledata"
            v-for="(data, index) in items"
            :key="index"
          >
            <td class="namedata">{{ data.user_name }}</td>
            <td class="emaildata">{{ data.user_email }}</td>
            <td class="phonedata">{{ data.user_phone }}</td>
            <td class="canteendata">{{ canteen(data.user_canteen_id) }}</td>
            <td class="statusdata">
              <button
                :class="
                  data.user_status == 'Active'
                    ? 'btnActive green'
                    : 'btnActive grey'
                "
              >
                {{ data.user_status == "Active" ? "Active" : "DeActive" }}
              </button>
            </td>
            <td class="actiondata actionIcons">
              <a @click="editItem(data)" class="actionIcon">
                <svg class="svgIcon">
                  <use xlink:href="#editIcon"></use>
                </svg>
              </a>
              <a @click="viewItem(data)" class="actionIcon">
                <svg class="svgIcon">
                  <use xlink:href="#openeyeIcon"></use>
                </svg>
              </a>
              <a @click="warningModel(data._id)" class="actionIcon">
                <svg class="svgIcon">
                  <use xlink:href="#deleteIcon"></use>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagiNationWrapper">
      <p v-if="gettotalRecordWhiteList">
        Showing {{currentPage}}-{{ getwhiteList.length }} of {{ gettotalRecordWhiteList}} results
      </p>
      <p v-else>Showing 0-0 of 0 results</p>
      <ul class="pagiNation">
        <li @click="updateCurrentPage(currentPage - 1)" class="pagiNation-item">
          <a class="page-link">
            <svg class="svgIconLeft">
              <use xlink:href="#leftIcon"></use>
            </svg>
          </a>
        </li>
        <li @click="updateCurrentPage(currentPage)" class="pagiNation-item">
          <span class="page-link activepage"> {{ currentPage }}</span>
        </li>
        <li @click="updateCurrentPage(currentPage + 1)" class="pagiNation-item">
          <span class="page-link"> {{ currentPage + 1 }}</span>
        </li>
        <li @click="updateCurrentPage(currentPage + 2)" class="pagiNation-item">
          <span class="page-link"> {{ currentPage + 2 }}</span>
        </li>
        <li @click="updateCurrentPage(currentPage + 1)" class="pagiNation-item">
          <a class="page-link">
            <svg class="svgIconNext">
              <use xlink:href="#rightIcon"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>

      <v-card-actions class="pa-5">
      <v-dialog
        v-model="delDialog"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="delDialog" v-slot:default="delDialog">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span
                style="font-size: 30px !important; font-weight: 800 !important"
                >Warning</span
              >
              <span @click="closeWarningModel" class="crossPossition">
                <img src="../../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <p>Do you want to delete this User?</p>
              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="mr-4 modal-btn"
                  dark
                  color="main_bg_color"
                  style="min-width: 100px !important"
                  @click="deleteItem()"
                >
                  Yes
                </v-btn>
                <v-btn
                  class="modal-btn"
                  style="min-width: 100px !important"
                  @click="closeWarningModel"
                >
                  No
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions style="width: 500px" class="pa-5">
      <v-dialog
        v-model="successDialog"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="successDialog" v-slot:default="successDialog">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span style="font-weight: bolder">Successful</span>
              <span @click="closeModel" class="crossPossition">
                <img src="../../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <center>
                <span>User is deleted Successfully</span><br /><br />
                <i
                  ><img
                    src="../../../assets/logos/Path 10980.svg"
                    height="100px"
                /></i>
              </center>
              <br /><br />
              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="modal-btn"
                  style="min-width: 100px !important"
                  @click="closeSuccessModel"
                >
                  Close
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </div>
</template>
<script>
import addWhiteUser from "../../../components/users/addWhiteUser.vue";
import editWhiteUser from "../../../components/users/editWhiteUser.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import BulkWhiteUser from '../../../components/users/bulkWhiteUser.vue';
export default {
  components: {
    addWhiteUser,
    editWhiteUser,
    BulkWhiteUser,
  },
  data() {
    return {
      bulkdialog: false,
      currentPage: 1,
      page: 1,
      pageCount: 10,
      itemsPerPage: 10,
      isEdit: false,
      dialog: false,
      viewDialog: false,
      deletedialog: false,
      delDialog: false,
      successDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      permissions: [],
      items: [],
    };
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchData();
      },
    },
    search: {
      handler: function () {
        this.items = this.getwhiteList.filter((x) => {
          return (
            x.user_name.includes(this.search) ||
            x.user_email.includes(this.search)
          );
        });
      },
    },
    getwhiteList: {
      handler: function () {
        this.items = this.getwhiteList;
      },
    },
  },
  methods: {
    updateCurrentPage(obj) {
      if (obj >= 1) {
        this.currentPage = obj;
      }
    },
    canteen(obj) {
      if (obj) {
        return obj.canteen_name;
      }
    },
    closeSuccessModel() {
      this.successDialog = false;
    },

    hasPermission(obj) {
      // if (
      //   this.userDetails &&
      //   this.userDetails.user &&
      //   this.userDetails.user.user_role == "super_admin"
      // ) {
      return true;
      // } else {
      //   return this.userDetails.permissions.permission_name.includes(obj);
      // }
    },
    roleName(obj) {
      if (obj) {
        let name = this.getroleList.filter((x) => x._id == obj);
        if (name.length > 0) {
          return name[0].name;
        }
      } else {
        return;
      }
    },
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store.dispatch("getRoleList", { pagination: true });
      await this.$store.dispatch("getcanteensList", { pagination: true });
      await this.$store.dispatch("getWhiteListUserList", {
        resultPerPage: 10,
        currentPage: this.currentPage,
      });
    },

    editItem(obj) {
      this.$store.dispatch("getUserById", obj);
      this.dialog = true;
      this.isEdit = true;
    },
    viewItem(obj) {
      this.$store.dispatch("getUserById", obj);
      this.viewDialog = true;
      // this.isEdit = true;
    },

    async closeModel() {
      this.isEdit = false;
      this.dialog = false;
      this.viewDialog = false;
      await this.fetchData();
      this.bulkdialog = false;
      this.delDialog = false;
      this.successDialog = false;
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
      var vm = this;
      this.$store.dispatch("removeUser", this.itemId).then((r) => {
        if (r.success) {
          this.fetchData();
          vm.delDialog = false;
          vm.successDialog = true;
          vm.itemId = "";
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
    this.fetchData();
    this.permissions = this.userDetails.permissions;
  },
  computed: {
    ...mapGetters(["getwhiteList", "gettotalRecordWhiteList","getroleList", "userDetails"]),
  },
};
</script>

<style scoped>
.bg-clr {
  background-color: #ecf5f7;
}
.v-input__slot:before {
  border: none;
}
.v-card__actions > .v-btn.v-btn {
  padding: 0 30px;
}
.theme--light.v-data-table thead {
  background-color: #747474 !important;
}
.b-border {
  border-bottom: 1px solid #f8932d;
}
.v-btn {
  text-transform: none;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 1.1px;
}
</style>