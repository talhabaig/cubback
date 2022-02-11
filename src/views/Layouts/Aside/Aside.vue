<template>
  <div>
    <v-list-item class="px-2" style="background-color: white; height: 64px">
      <v-img
        v-if="this.drawerValue"
        src="../../../assets/logos/Frigg_Logo_F_Tekst_Horisontal_gul (1).png"
        alt="FRIGG KANTINE"
        width="auto"
        height="50px"
      ></v-img>
      <video autoplay loop  v-else width="50" height="50">
        <source
          src="../../../assets/logos/3D_BuildSpinYellowDouble_5.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
        <!-- Text to be shown incase browser doesnt support html5 -->
      </video>
      <!-- <v-img
      v-else
        src="../../../assets/logos/Frigg_Logo_F_gul.jpg"
        alt="FRIGG KANTINE"
        width="auto"
        height="40px"
      ></v-img> -->
    </v-list-item> 

    <v-list rounded>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
        color="white"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          class="menu-item-active" 
         color="white"
        >
          <router-link
            :to="child.route"
            style="text-decoration: none; color: inherit"
          >
            <v-list-item-content  color="white"> 
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    drawerValue: Boolean,
  },
  data() {
    return {
      items: [
        {
          icon: "fas fa-users",
          items: [
            { title: "Users", route: "userList" },
            { title: "White List Users", route: "whitelist_user" },
             { title: "Role List", route: "role" }
          ],                         
          title: "Users",
          route: "userList",
        },
        {
          icon: "fas fa-store-alt",
          items: [{ title: "Canteens", route: "canteenList" }],
          title: "Canteen",
          route: "canteenList",
        },
        {
          icon: "fas fa-tram",
          items: [{ title: "Machines", route: "machineList" }],
          title: "Machine",
          route: "machineList",
        },
        {
          icon: "fas fa-store-alt",
          items: [{ title: "Categories", route: "categoryList" }],
          title: "Category",
          route: "categoryList",
        },
        {
          icon: "fab fa-product-hunt",
          items: [
            { title: "Products", route: "productList" },
           { title: "Inventory List", route: "inventoryList" },
          ],
          title: "Product",
          route: "productList",
        },
        {
          icon: "fab fa-first-order",
          items: [
            { title: "Orders", route: "orderList" }, 
          ],
          title: "Order",
          route: "orderList",
        },
        {
          icon: "fab fa-first-order",
          items: [
            { title: "Page Builder", route: "cmsList" }, 
          ],
          title: "Page Builder",
          route: "cmsList",
        },
        {
          icon: "fab fa-first-order",
          items: [
            { title: "Banners", route: "bannerList" }, 
          ],
          title: "Banner",
          route: "bannerList",
        },
        {
          icon: "fab fa-first-order",
          items: [
            { title: "Report", route: "reportList" }, 
            { title: "Logs", route: "logList" }, 
          ],
          title: "Report",
          route: "reportList",
        },
        {
          icon: "fab fa-product-hunt",
          items: [
            { title: "Promotion", route: "promotionList" },
            { title: "Discount", route: "discountList" }, 
          ],
          title: "Promotion",
          route: "promotionList",
        },
      ],
    };
  },
     
};
</script> 
<style scoped>
.v-list-item .router-link-active{
color:white !important
}
</style>