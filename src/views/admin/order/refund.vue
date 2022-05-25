<template>
  <div>
    <div class="d-flex justify-space-around align-center mb-2 mt-3">
      <v-card-text>
        <div class="pageHeadingIcon">
          <div class="pageName">
            <svg class="pageNameSvg userManagmentIcon">
              <use xlink:href="#orderManagment"></use>
            </svg>
          </div>
          <h2>Refund List</h2>
        </div>
      </v-card-text>

      <!-- <div class="right-inner-addon2 input-container pb-0">
        <i
          ><img
            src="../../../assets/logos/Icon ionic-ios-search.svg"
            height="15px"
        /></i>

        <input
          class="left normal border-radius bg-clr mt-1 searchfield"
          type="text"
          placeholder="Search Here..."
        
        />
      </div> -->
    </div>
    <div class="tableWrapper">
      <table class="row mx-0" id="myTable">
        <thead class="px-0">
          <tr class="tableHead">
            <th class="name" style="width: 12%">Order ID #</th>
            <th class="email" style="width: 15%">Date</th>
            <th class="email" style="width: 15%">Price</th>
            <th class="status" style="width: 15%">Delivery status</th>
            <th class="email" style="width: 15%">Discount</th>
            <th class="email" style="width: 15%">Promotion</th>
            <th class="action" style="width: 13%">Action</th>
          </tr>
        </thead>
        <tbody class="px-0">
          <tr v-for="(d, i) in getOrderList" :key="i" class="px-0 tabledata">
            <td class="namedata" style="width: 12%">{{ d._id }}</td>
            <td class="emaildata" style="width: 15%">
              {{ dateConvert(d.createdAt) }}
            </td>
            <td class="emaildata" style="width: 15%">
              NOK {{ d.total_price }}
            </td>
            <td class="statusdata" style="width: 15%">
              <button
                class="btnActive"
                :class="
                  d.order_status == 'pending'
                    ? 'yellow'
                    : d.order_status == 'Canceled'
                    ? 'grey'
                    : 'green'
                "
              >
                {{ d.order_status }}
              </button>
            </td>
            <td class="emaildata" style="width: 15%">{{ d.discount }}</td>
            <td class="emaildata" style="width: 15%">{{ d.promotion }}</td>
            <td class="actiondata" style="width: 13%">
              <img
                src="../../../assets/logos/Icon-ionic-ios-eye.svg"
                alt="eye"
                width="18px"
                height="18px"
                @click="viewOrderSummary(d)"
              />
            </td>
          </tr>
          <!-- <tr class="px-0 tabledata">
            <td class="namedata"  style="width: 12%;">0001</td>
            <td class="emaildata"  style="width: 20%;">David</td>
            <td class="emaildata"  style="width: 15%;">20/03/2022</td>
            <td class="emaildata"  style="width: 15%;">NOK 10.00</td>
            <td class="statusdata"  style="width: 15%;">
              <button
                class="btnActive green"
              >
                Active
              </button>
            </td>
            <td class="statusdata"  style="width: 15%;">Credit card</td>
            <td class="actiondata"  style="width: 13%;"><img src="../../../assets/logos/Icon-ionic-ios-eye.svg" alt="eye" width="18px" height="18px" /> / refund</td>
          </tr>  
          <tr class="px-0 tabledata">
            <td class="namedata"  style="width: 12%;">0001</td>
            <td class="emaildata"  style="width: 20%;">David</td>
            <td class="emaildata"  style="width: 15%;">20/03/2022</td>
            <td class="emaildata"  style="width: 15%;">NOK 10.00</td>
            <td class="statusdata"  style="width: 15%;">
              <button
                class="btnActive yellow"
              >
                Pending
              </button>
            </td>
            <td class="statusdata"  style="width: 15%;">Credit card</td>
            <td class="actiondata"  style="width: 13%;"><img src="../../../assets/logos/Icon-ionic-ios-eye.svg" alt="eye" width="18px" height="18px" /> / refund</td>
          </tr>
          <tr class="px-0 tabledata">
            <td class="namedata"  style="width: 12%;">0001</td>
            <td class="emaildata"  style="width: 20%;">David</td>
            <td class="emaildata"  style="width: 15%;">20/03/2022</td>
            <td class="emaildata"  style="width: 15%;">NOK 10.00</td>
            <td class="statusdata"  style="width: 15%;">
              <button
                class="btnActive grey"
              >
                Canceled
              </button>
            </td>
            <td class="statusdata"  style="width: 15%;">Credit card</td>
            <td class="actiondata"  style="width: 13%;"><img src="../../../assets/logos/Icon-ionic-ios-eye.svg" alt="eye" width="18px" height="18px" /> / refund</td>
          </tr>
          <tr class="px-0 tabledata">
            <td class="namedata"  style="width: 12%;">0001</td>
            <td class="emaildata"  style="width: 20%;">David</td>
            <td class="emaildata"  style="width: 15%;">20/03/2022</td>
            <td class="emaildata"  style="width: 15%;">NOK 10.00</td>
            <td class="statusdata"  style="width: 15%;">
              <button
                class="btnActive green"
              >
                Active
              </button>
            </td>
            <td class="statusdata"  style="width: 15%;">Credit card</td>
            <td class="actiondata"  style="width: 13%;"><img src="../../../assets/logos/Icon-ionic-ios-eye.svg" alt="eye" width="18px" height="18px" /> / refund</td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <div class="pagiNationWrapper">
      <p v-if="getOrderList">
        Showing {{ currentPage }}-{{ getOrderList.length }} of
        {{ getOrderListTotal }} results
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
    <v-card-actiondatas class="pa-5">
      <v-dialog
        v-model="viewDialog2"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="viewDialog2" v-slot:default="viewDialog2">
          <v-card class="pl-5 pr-5">
            <v-toolbar
              class="mb-2 pt-1 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <h2>ORDER SUMMARY</h2>
              <span @click="closeModel" class="crossPossition">
                <img
                  class="mb-5"
                  src="../../../assets/logos/Icon metro-cross.svg"
                />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <table class="orderModal mr-0">
                <tr>
                  <td class="pb-3 pl-5 pr-5">
                    <span class="text-orange mr-1"> 2x </span> Baguette
                  </td>
                  <td class="pb-3 pl-5 pr-5">50.00 NOK</td>
                </tr>
                <tr>
                  <td class="pb-3 pl-5 pr-5">
                    <span class="text-orange mr-1"> 3x </span> Baguette
                  </td>
                  <td class="pb-3 pl-5 pr-5">50.00 NOK</td>
                </tr>
                <tr>
                  <td class="pb-3 pl-5 pr-5">
                    <span class="text-orange mr-1"> 4x </span> Drinks
                  </td>
                  <td class="pb-3 pl-5 pr-5">50.00 NOK</td>
                </tr>

                <tr class="b-border"></tr>

                <tr>
                  <td class="pt-3 pl-5 pr-5">Item Total</td>
                  <td class="pt-3 pl-5 pr-5 text-orange">50.00 NOK</td>
                </tr>
                <tr>
                  <td class="pl-5 pr-5">Discount</td>
                  <td class="pl-5 pr-5 text-orange">0.0</td>
                </tr>
                <tr>
                  <td class="pl-5 pr-5">Subtotal</td>
                  <td class="pl-5 pr-5 text-orange">100. NOK</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actiondatas>
  </div>
</template>
<script>
import addUser from "../../../components/users/addUser.vue";
import addCanteen from "../../../components/canteen/addCanteen.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    addUser,
    addCanteen,
  },
  data() {
    return {
      currentPage: 1,
      isEdit: false,
      dialog: false,
      deletedialog: false,
      delDialog: false,
      viewDialog2: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      permissions: [],
      items: [],
      fields: [
        {
          value: "user_namedata",
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
          value: "action",
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
        this.fetchData();
      },
    },
    getuserList: {
      handler: function () {
        this.items = this.getuserList.filter((x) => {
          return x.white_list_user != "true";
        });
      },
    },
  },
  methods: {
    dateConvert(obj) {
      var date = new Date(obj);
      var mS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      return (
        date.getDate() + "-" + mS[date.getMonth()] + "-" + date.getFullYear()
      );
    },
    hasPermission(obj) {
      // if (
      //   this.userDetails &&
      //   this.userDetails.user &&
      //   this.userDetails.user.user_role == "super_admin"
      // ) {
      return true;
      // } else {
      //   return this.userDetails.permissions.permission_namedatadata.includes(obj);
      // }
    },
    rolenamedata(obj) {
      if (obj) {
        let namedata = this.getroleList.filter((x) => x._id == obj);
        if (namedata.length > 0) {
          return namedata[0].namedata;
        }
      } else {
        return;
      }
    },
    currentPage: {
      handler: function () {
        this.fetchData();
      },
    },
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store.dispatch("getRoleList", { pagination: true });
      await this.$store.dispatch("getOrdersList", {
        resultPerPage: 10,
        currentPage: this.currentPage,
      });
    },

    editItem(obj) {
      // this.$store.dispatch("getUserById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    viewItem(obj) {
      this.$store.dispatch("getUserById", obj);
      this.viewDialog2 = true;
      // this.isEdit = true;
    },

    async closeModel() {
      // await this.fetchData();
      this.viewDialog2 = false;
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
    this.fetchData();
    this.permissions = this.userDetails.permissions;
  },
  computed: {
    ...mapGetters(["getOrderList", "getOrderListTotal"]),
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
.v-card__actiondatas > .v-btn.v-btn {
  padding: 0 20px;
}
.theme--light.v-data-table thead {
  background-color: #747474 !important;
}
.b-border {
  border-bottom: 1px solid #f8932d;
}
.orderModal {
  color: black;
}
</style>


   