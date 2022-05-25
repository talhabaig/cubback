<template>
  <div>
    <div class="d-flex justify-space-around align-center mb-2 mt-3">
      <v-card-text>
        <div class="pageHeadingIcon">
          <div class="pageName">
            <svg class="pageNameSvg userManagmentIcon">
              <use xlink:href="#productManagment"></use>
            </svg>
          </div>
          <h2>Product Management</h2>
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

      <v-card-actions class="pa-5">
        <!------------------------------------------------------------------->
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
              class="pr-5 pl-3 mr-3"
            >
              <i class="mr-2">
                <svg class="pageNameSvg productIcon">
                  <use xlink:href="#role-per-icon"></use></svg></i
              >Add bulk Product</v-btn
            >
          </template>
          
            <v-card>
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span
                 
                  class="text-center justify-center"
                  style="font-size: 26px !important"
                  >Add bulk Product
                </span>
                
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>
              <v-card-text >
                <bulkproduct @closeIt="closeModel"></bulkproduct> 
              </v-card-text>
              
            </v-card>
          
        </v-dialog>
        <!------------------------------------------------------------------->
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
              class="pr-5 pl-3"
            >
              <i class="mr-2">
                <svg class="pageNameSvg productIcon">
                  <use xlink:href="#role-per-icon"></use></svg></i
              >Add Product</v-btn
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
                  >Add Product
                </span>
                <span v-else>Edit Product</span>
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>
              <v-card-text v-if="isEdit == false">
                <addProduct @closeIt="closeModel"></addProduct>
                <!-- <addCanteen @closeIt="closeModel" :isEdit='isEdit'></addCanteen> -->
              </v-card-text>
              <v-card-text v-else>
                <addProduct @closeIt="closeModel"></addProduct>
                <!-- <editUser @closeIt="closeModel"></editUser> -->
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actions>
      <v-card-actions class="pa-5">
        <v-dialog
          v-model="viewdialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-if="viewdialog" v-slot:default="viewdialog">
            <v-card>
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span>View Product</span>
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>

              <v-card-text>
                <viewProduct @closeIt="closeModel"></viewProduct>
                <!-- <editUser @closeIt="closeModel"></editUser> -->
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
            <th class="name" style="width: 20%">Name</th>
            <th class="email" style="width: 20%">Price</th>
            <th class="email" style="width: 20%">VAT</th>
            <th class="status" style="width: 20%">Status</th>
            <th class="action" style="width: 20%">Action</th>
          </tr>
        </thead>
        <tbody class="px-0">
          <tr
            v-for="(data, index) in items"
            :key="index"
            class="px-0 tabledata"
          >
            <td class="namedata" style="width: 20%">{{ data.product_name }}</td>

            <td class="emaildata" style="width: 20%">
              {{ data.product_price }} NOK
            </td>
            <td class="emaildata" style="width: 20%">{{ data.product_VAT }}</td>
            <td class="statusdata" style="width: 20%">
              <button
                :class="
                  data.product_status == 'Active'
                    ? 'btnActive green'
                    : 'btnActive grey'
                "
              >
                {{ data.product_status == "Active" ? "Active" : "DeActive" }}
              </button>
            </td>
            <td class="actiondata actionIcons" style="width: 20%">
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
      <p v-if="getproductList">
        Showing {{ currentPage }}-{{ getproductList.length }} of
        {{ getproductListTotal }} results
      </p>
      <p v-else>Showing 0-0 of0 results</p>
      <ul class="pagiNation">
        <li @click="updateCurrentPage(currentPage - 1)" class="pagiNation-item">
          <a class="page-link">
            <svg class="svgIconLeft">
              <use xlink:href="#leftIcon"></use>
            </svg>
          </a>
        </li>
        <li @click="updateCurrentPage(currentPage)" class="pagiNation-item ">
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
              <span @click="closeModel" class="crossPossition">
                <img src="../../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              Do you want to delete this Product?

              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="mr-4 modal-btn"
                  dark
                  color="main_bg_color"
                  @click="YesModel"
                >
                  Yes
                </v-btn>
                <v-btn class="modal-btn" @click="closeWarningModel"> No </v-btn>
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
                <span>Product is deleted Successfully</span><br /><br />
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
import addProduct from "../../../components/product/addProduct.vue";
import viewProduct from "../../../components/product/viewProduct.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import Bulkproduct from '../../../components/product/bulkproduct.vue';
export default {
  components: {
    addProduct,
    viewProduct,
    Bulkproduct,
  },
  data() {
    return {
      bulkdialog:false,
      isEdit: false, 
      bulkdialog: false,
      dialog: false,
      deletedialog: false,
      viewdialog: false,
      currentPage: 1,
      delDialog: false,
      allowDel: false,
      successDialog: false,
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
        this.items = this.getproductList.filter((x) => {
          return x.product_name.includes(this.search);
        });
      },
    },
    getproductList: {
      handler: function () {
        this.items = this.getproductList;
      },
    },
  },
  methods: {
    imgProduct(obj) {
      if (obj.startsWith("http")) {
        return obj.replace("/public", "");
      }
    },
    async YesModel() {
      this.delDialog = false;
      await this.deleteItem();
    },
    hasPermission(obj) {
      return true;
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
    updateCurrentPage(obj) {
      if (obj >= 1) {
        this.currentPage = obj;
      }
    },
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store.dispatch("getRoleList", { pagination: true });
      await this.$store.dispatch("productsList", {
        resultPerPage: 10,
        currentPage: this.currentPage,
      });
    },
    closeSuccessModel() {
      this.successDialog = false;
    },
    editItem(obj) {
      this.$store.dispatch("getproductById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    viewItem(obj) {
      this.$store.dispatch("getproductById", obj);
      this.viewdialog = true;
    },

    async closeModel() {
      await this.fetchData();
      this.dialog = false;
      this.bulkdialog = false;
      this.viewdialog = false;
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
      var vm = this;
      this.$store.dispatch("removeproduct", this.itemId).then((r) => {
        if (r.success) {
          this.fetchData();
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
    clear() {
      this.bulkdialog = false;
    },
  },
  mounted() {
    this.fetchData();
    this.permissions = this.userDetails.permissions;
  },
  computed: {
    ...mapGetters([
      "getproductList",
      "getproductListTotal",
      "getroleList",
      "userDetails",
    ]),
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
  padding: 0 20px;
}
.theme--light.v-data-table thead {
  background-color: #747474 !important;
}
.b-border {
  border-bottom: 1px solid #f8932d;
}
</style>


   