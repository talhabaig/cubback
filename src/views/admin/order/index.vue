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
          <h2>Order Management</h2>
        </div>
      </v-card-text>

   
    </div>
    <div class="tableWrapper">
    
      <table class="row mx-0" id="myTable">
        <thead class="px-0">
          <tr  class="tableHead">
            <th class="name"  style="width: 12%;">Order ID #</th> 
            <th class="email"  style="width: 15%;">Date</th>
            <th class="email"  style="width: 15%;">Price</th>
            <th class="status"  style="width: 15%;">Delivery status</th>
            <th class="email"  style="width: 15%;">Discount</th>
            <th class="email"  style="width: 15%;">Promotion</th> 
            <th class="action"  style="width: 13%;">Action</th>
          </tr>
        </thead>
        <tbody class="px-0">
          <tr v-for="(d,i) in getOrderList" :key="i" class="px-0 tabledata">
            <td class="namedata"  style="width: 12%;">{{d._id}}</td> 
            <td class="emaildata"  style="width: 15%;">{{dateConvert(d.createdAt)}}</td>
            <td class="emaildata"  style="width: 15%;">NOK {{d.total_price}}</td>
            <td class="statusdata"  style="width: 15%;">
              <button
                class="btnActive"
                :class="d.order_status == 'pending' ? 'yellow' : d.order_status == 'Canceled'?'grey': 'green'"
              >
                {{d.order_status}}
              </button>
            </td>
            <td class="emaildata"  style="width: 15%;"> {{d.discount}}</td>
            <td class="emaildata"  style="width: 15%;"> {{d.promotion}}</td>
            <td class="actiondata"  style="width: 13%;"><img src="../../../assets/logos/Icon-ionic-ios-eye.svg" alt="eye" width="18px" height="18px" @click="viewOrderSummary(d)" /> / <span @click="viewRefund(d)" > refund </span></td>
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
      <!-- <p>Showing {{currentPage}}-{{getcanteenList.length}} of {{getcanteenList.length}} results</p> -->
      <!-- <ul class="pagiNation">
          <li class="pagiNation-item">
            <a class="pageLinkNext Next" href="#">
              <svg class="svgIconLeft">
                <use xlink:href="#leftIcon"></use>
              </svg>
            </a>
          </li>
            <li class="pagiNation-item"><span class="page-link"> 1</span></li>
        <li class="pagiNation-item"><span class="page-link"> 2</span></li>
        <li class="pagiNation-item"><span class="page-link"> 3</span></li>
          <li class="pagiNation-item">
            <a class="pageLinkBefore Before" href="#">
              <svg class="svgIconNext">
                <use xlink:href="#rightIcon"></use>
              </svg>
            </a>
          </li>
        </ul> -->
    </div>
    <v-card-actiondatas class="pa-5">
      <v-dialog
        v-model="viewDialog"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="viewDialog" v-slot:default="viewDialog">
          <v-card class="pl-5 pr-5"> 
            <v-toolbar
              class="mb-2 pt-1 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <h2>ORDER SUMMARY</h2>
              <span @click="closeModel" class="crossPossition">
                  <img class="mb-5" src="../../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              
             <table class="orderModal mr-0">
                <tr v-for="data in order.products">
                  <td class="pb-3 pl-5 pr-5"> <span class="text-orange mr-1"> {{data.product_quantity}}x </span> {{data.product_name}} </td>
                  <td class="pb-3 pl-5 pr-5"> {{data.product_price}} NOK </td>
                </tr> 
                  
                 <tr class="b-border"> </tr>

                <tr>
                  <td class="pt-3 pl-5 pr-5"> Item Total </td>
                  <td class="pt-3 pl-5 pr-5 text-orange"> {{order.total_price}} NOK </td>
                </tr>
                <tr>
                  <td class="pl-5 pr-5"> Discount </td>
                  <td class="pl-5 pr-5 text-orange"> {{order.discount}}  </td>
                </tr>
                <tr>
                  <td class="pl-5 pr-5"> Subtotal </td>
                  <td class="pl-5 pr-5 text-orange"> {{order.promotions}} NOK </td>
                </tr>
             </table> 
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actiondatas>
    <v-card-actiondatas class="pa-5">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
        >
          <template v-if="dialog" v-slot:default="dialog">
            <v-card class="pl-5 pr-5">
              <v-toolbar
                class="mb-2 text-center justify-center b-border m-2"
                style="box-shadow: none"
              >
                <span
                  class="text-center justify-center"
                  style="font-size: 30px !important;font-weight:800 !important"
                  > <strong>REFUND </strong>
                </span>
                <span @click="closeModel" class="crossPossition">
                  <img src="../../../assets/logos/Icon metro-cross.svg" />
                </span>
              </v-toolbar>
              <v-card-text>
                <refund @closeIt="closeModel"></refund>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-card-actiondatas>
  </div>
</template>
<script>
import refund from "../../../components/order/refund.vue";
import addCanteen from "../../../components/canteen/addCanteen.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    refund,
    addCanteen,
  },
  data() {
    return {
      isEdit: false,
      dialog: false,
      deletedialog: false,
      order:null,
      viewDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      permissions: [],
      items: [],
      fields: [
        {
          value: "user_name",
          text: "name",
        },
        {
          value: "user_email",
          text: "email",
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
          text: "status",
        },
        {
          value: "action",
          text: "action",
          sortable: false,
        },
      ],
      isApprovedOptions: [
        { text: "Approved", value: true },
        { text: "Not Approved", value: false },
      ],
    };
  },
  
  methods: {
    hasPermission(obj) {
      // if (
      //   this.userDetails &&
      //   this.userDetails.user &&
      //   this.userDetails.user.user_role == "super_admin"
      // ) {
      return true;
      // } else {
      //   return this.userDetails.permissions.permission_namedata.includes(obj);
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
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      // await this.$store.dispatch("getRoleList");
      // await this.$store.dispatch("getUserList")
      await this.$store.dispatch("getOrdersList", {
        resultPerPage: 10,
        currentPage: this.currentPage,
      }) 
    },

    editItem(obj) {
      // this.$store.dispatch("getUserById", obj);
      this.dialog = true;
      this.isEdit = true;
    },

    viewOrderSummary(obj) {
      this.order=obj 
      this.viewDialog = true;
    
    }, 
    viewRefund(obj) { 
      this.$store.dispatch("setOrder", obj);
      this.dialog = true;
      // this.isEdit = true;
    },

    async closeModel() {
      // await this.fetchData();
      this.viewDialog = false;
      this.dialog = false;
      this.isEdit = false;
    },

    warningModel(id) {
      this.viewDialog = true;
      this.itemId = id;
    },

    closeWarningModel() {
      this.viewDialog = false;
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
      this.viewDialog = false;
      this.itemId = "";
    },

    getColor(value) {
      if (value == true) return "green";
      else return "orange";
    },
  },
  mounted() {
    this.fetchData();
    // this.permissions = this.userDetails.permissions;
  },
  computed: {
    ...mapGetters(["getOrderList"]),
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
  color:black
}
v-card-actions{
    margin: 0 auto;
    width: 50%;
}
</style>


   