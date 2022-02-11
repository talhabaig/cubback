import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    discount: null,
    singlediscount: null,
  },
  getters: {
    getdiscountList(state) {
     
      return state.discount;
    },
    getdiscountById(state) {
      return state.singlediscount;
    },
  },
  actions: {
    async discountsList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/discount`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          debugger
          if (response.data) {
            commit("setdiscountList", response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          commit("setdiscountList",null);
          console.log(error);
        });
    },

    async getdiscountById({ commit }, data) {
     
      commit("setSinglediscount", data);
    },

    async adddiscount({ commit }, payload) {
     
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/discount`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => { 
          debugger
          return response.data;
        })
        .catch((error) => {
          debugger
          console.log(error);
        });
    },

    async updatediscount({ commit }, payload) {
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/discount/${payload._id}`,
          {
            discount_name: payload.discount_name,  
            discount_startdate: payload.discount_startdate,
            discount_enddate: payload.discount_enddate,
            discount_type: payload.discount_type,
            discount_value: payload.discount_value,
            discount_productId: payload.discount_productId,
            discount_status: payload.discount_status,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removediscount({ commit }, discountId) {
     
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/v1/discount/${discountId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetdiscountState({ commit }) {
      commit("setSinglediscount", null);
    },
    resetdiscountListState({ commit }) {
      commit("emptydiscountList", null);
    },
  },
  mutations: {
    setdiscount(state, payload) {
      state.discount.unshift(payload);
    },
    setdiscountList(state, payload) {
     
      state.discount = payload;
    },
    setSinglediscount(state, payload) {
      state.singlediscount = payload;
    },
    emptydiscountList(state, payload) {
      state.discount = payload;
    },
  },
};
