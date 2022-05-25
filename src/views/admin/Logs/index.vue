<template>
  <div>
    <div class="d-flex justify-space-around align-center mb-2 mt-3">
      <v-card-text>
        <div class="pageHeadingIcon">
          <div class="pageName">
            <svg class="pageNameSvg userManagmentIcon">
              <use xlink:href="#report"></use>
            </svg>
          </div>
          <h2>Logs</h2>
        </div>
      </v-card-text>
    </div>
    <div class="tableWrapper">
      <table class="row mx-0" id="myTable">
        <thead class="px-0">
          <tr class="tableHead">
            <th class="name" style="width: 20%">Canteen</th>
            <th class="name" style="width: 35%">Machine Number</th>
            <th class="name" style="width: 25%">Status</th>
            <th class="name" style="width: 25%">Events</th>
          </tr>
        </thead>
        <tbody class="px-0">
          <tr
            v-for="(data, index) in geteventList"
            :key="index"
            class="px-0 tabledata"
          >
            <td class="namedata" style="width: 20%">
              {{ data.canteen_id ?data.canteen_id.canteen_name : '' }}
            </td>
            <td class="namedata" style="width: 35%">
              {{ data.machine_number }}
            </td>
            <td class="namedata" style="width: 25%">
              {{ data.status_of_event }}
            </td>
            <td class="namedata" style="width: 25%">{{ data.event }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagiNationWrapper">
      <p v-if="geteventListTotal">
        Showing {{ currentPage }}-{{ geteventListTotal.length }} of
        {{ geteventListTotal }} results
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
  </div>
</template>
<script>
import addUser from "../../../components/users/addUser.vue";
import addCanteen from "../../../components/canteen/addCanteen.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    addUser,
    addCanteen,
  },
  data() {
    return {
      isEdit: false,
      currentPage: 1,
      dialog: false,
      deletedialog: false,
      delDialog: false,
      allowDel: false,
      itemId: "",
      isfetching: false,
      search: "",
      permissions: [],
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
      ],
    };
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchData();
      },
    },
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
    updateCurrentPage(obj) {
      if (obj >= 1) {
        this.currentPage = obj;
      }
    },
    async fetchData() {
      this.isfetching = true;
      this.search = this.search == null ? "" : this.search;
      await this.$store.dispatch("getRoleList", { pagination: true });
      await this.$store.dispatch("getEventsList", {
        resultPerPage: 10,
        currentPage: this.currentPage,
      });
    },

    async closeModel() {
      // await this.fetchData();
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
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["geteventList", "geteventListTotal"]),
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


   