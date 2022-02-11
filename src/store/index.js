import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import users from "./user";
import account from "./account";
import orderType from "./orderType";
import order from "./order";
import patient from "./patient";
import role from "./role";
import canteen from "./canteen";
import machine from "./machine";
import product from "./product";
import category from "./category";
import inventory from "./inventory";
import promotion from "./promotion";
import discount from "./discount";
import rolePermission from "./rolePermission";
import banner from "./banner";
import cms from "./cms";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    account,
    orderType,
    order,
    patient,
    role,
    canteen,
    machine,
    product,
    category,
    inventory,
    rolePermission, 
    banner,
    promotion,
    discount,
    cms
  },
  plugins: [createPersistedState("account")],
});
