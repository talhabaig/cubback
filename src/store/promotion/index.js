import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    promotion: null,
    singlepromotion: null,
  },
  getters: {
    getpromotionList(state) {
     
      return state.promotion;
    },
    getpromotionById(state) {
      return state.singlepromotion;
    },
  },
  actions: {
    async promotionsList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/promotion`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data) {
            commit("setpromotionList", response.data.allPromotions);
          }
        })
        .catch(function (error) {
          commit("setpromotionList", null);
          console.log(error);
        });
    },

    async getpromotionById({ commit }, data) {
     
      commit("setSinglepromotion", data);
    },

    async addpromotion({ commit }, payload) {
     
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/promotion`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
         ;
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updatepromotion({ commit }, payload) {
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/promotion/${payload._id}`,
          {
            promo_name: payload.promo_name,
            promo_code: payload.promo_code,
            promo_description: payload.promo_description,
            promo_start_date: payload.promo_start_date,
            promo_end_date: payload.promo_end_date,
            promo_type: payload.promo_type,
            promo_value: payload.promo_value,
            promo_productid: payload.promo_productid,
            promo_status: payload.promo_status,
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

    async removepromotion({ commit }, promotionId) {
     
      return await axios
        .delete(
          `${process.env.VUE_APP_API_URL}api/v1/promotion/${promotionId}`,
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

    resetpromotionState({ commit }) {
      commit("setSinglepromotion", null);
    },
    resetpromotionListState({ commit }) {
      commit("emptypromotionList", null);
    },
  },
  mutations: {
    setpromotion(state, payload) {
      state.promotion.unshift(payload);
    },
    setpromotionList(state, payload) {
     
      state.promotion = payload;
    },
    setSinglepromotion(state, payload) {
      state.singlepromotion = payload;
    },
    emptypromotionList(state, payload) {
      state.promotion = payload;
    },
  },
};
