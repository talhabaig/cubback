import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/userList",
      component: () => import("../views/Layouts/admin"),
      children: [
        {
          path: "/userList",
          name: "userList",
          component: () => import("../views/admin/users"),
        },
        {
          path: "/whitelist_user",
          name: "whitelist_user",
          component: () => import("../views/admin/users/whitelist_user"),
        },
        {
          path: "/role",
          name: "role",
          component: () => import("../views/admin/users/role"),
        },
        {
          path: "/permission",
          name: "permission",
          component: () => import("../views/admin/users/permission.vue"),
        },
        {
          path: "/rolePermission",
          name: "rolePermission",
          component: () => import("../views/admin/users/rolePermission.vue"),
        },
        {
          path: "/viewRolePermisson",
          name: "viewRolePermisson",
          component: () => import("../views/admin/users/viewRolePermisson.vue"),
        },
        {
          path: "/canteenList",
          name: "canteenList",
          component: () => import("../views/admin/canteen"),
        },
        {
          path: "/machineList",
          name: "machineList",
          component: () => import("../views/admin/machine"),
        },
        {
          path: "/channelView",
          name: "channelView",
          component: () => import("../components/machine/channelView"),
        },
        {
          path: "/orderList",
          name: "orderList",
          component: () => import("../views/admin/order"),
        },
        {
          path: "/refundList",
          name: "refundList",
          component: () => import("../views/admin/order/refund"),
        },
        {
          path: "/productList",
          name: "productList",
          component: () => import("../views/admin/product"),
        },

        {
          path: "/waste",
          name: "wasteList",
          component: () => import("../views/admin/waste_registration"),
        },

        {
          path: "/inventoryList",
          name: "inventoryList",
          component: () => import("../views/admin/product/inventory"),
        },
        {
          path: "/categoryList",
          name: "categoryList",
          component: () => import("../views/admin/category"),
        },
        {
          path: "/promotionList",
          name: "promotionList",
          component: () => import("../views/admin/promotion"),
        },
        {
          path: "/discountList",
          name: "discountList",
          component: () => import("../views/admin/discount"),
        },
        {
          path: "/subsidyList",
          name: "subsidyList",
          component: () => import("../views/admin/subsidy"),
        },
        {
          path: "/bannerList",
          name: "bannerList",
          component: () => import("../views/admin/banner"),
        },
        {
          path: "/vendLimitList",
          name: "vendLimitList",
          component: () => import("../views/admin/product/vend.vue"),
        },
        {
          path: "/cmsList",
          name: "cmsList",
          component: () => import("../views/admin/cms"),
        },
        {
          path: "/assignProduct",
          name: "assignProduct",
          component: () => import("../views/admin/product/assignProducts"),
        },
        {
          path: "/orderList",
          name: "orderList",
          component: () => import("../views/admin/order"),
        },
        {
          path: "/reportList",
          name: "reportList",
          component: () => import("../views/admin/reports"),
        },
        {
          path: "/logList",
          name: "logList",
          component: () => import("../views/admin/Logs"),
        },

      ],
    },
    {
      path: "/login",
      redirect: "/login",
      component: () => import("../views/Layouts/account"),

      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/Layouts/account/login.vue"),
        },
        {
          path: "/signup",
          name: "signup",
          component: () => import("../views/Layouts/account/signup.vue"),
        },
        {
          path: "/forgot",
          name: "forgot",
          component: () => import("../views/Layouts/account/forgot.vue"),
        },
      ],
    },
    // {
    //   path: "/loginUser",
    //   redirect: "/loginUser",
    //   component: () => import("../views/Layouts/user"),
    //   children: [
    //     {
    //       path: "/loginUser",
    //       name: "loginUser",
    //       component: () => import("../views/user/login.vue"),
    //     },
    //     {
    //       path: "/menuUser",
    //       name: "menuUser",
    //       component: () => import("../views/user/menuUser.vue"),
    //     },
    //   ],
    // },
  ],
});

// router.beforeEach((to, from, next) => {
//   var status = store.getters["isUserAuthenticated"];
//   if (to.name === "login" && status) {
//     next(from.path);
//   } else if (to.name !== "login" && status) {
//     next();
//   } else if (to.name === "login" && !status) {
//     next();
//   } else if (to.name === "forgot" && !status) {
//     next();
//   } else if (to.name === "loginUser" && !status) {
//     next();
//   } else {
//     next({ name: "login" });
//   }
// });

export default router;
