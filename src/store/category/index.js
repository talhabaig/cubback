import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    category: null,
    singlecategory: null,
  },
  getters: {
    getcategoryList(state) {
     
      return state.category;
    },
    getcategoryById(state) {
      return state.singlecategory;
    },
  },
  actions: {
    async getcategorysList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/catagories`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
         ;
          if (response.data.success) {
            commit("setcategoryList", response.data.allCatagory);
          }
          return response.data.allCatagory;
        })
        .catch(function (error) {
          commit("setcategoryList", null);
          console.log(error);
        });
    },

    async getcategoryById({ commit }, data) {
     
      commit("setSinglecategory", data);
    },

    async addcategory({ commit }, payload) {
     
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/catagories`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
         ;
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updatecategory({ commit }, payload) {
     
      return await axios.put(
          `${process.env.VUE_APP_API_URL}api/v1/catagories/${payload._id}`,
          {
            catagories_status: payload.catagories_status, 
            catagories_name: payload.catagories_name, 
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removecategory({ commit }, categoryId) {
     
      return await axios
        .delete(
          `${process.env.VUE_APP_API_URL}api/v1/catagories/${categoryId}`,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetcategoryState({ commit }) {
      commit("setSinglecategory", null);
    },
  },
  mutations: {
    setcategory(state, payload) {
      state.category.unshift(payload);
    },
    setcategoryList(state, payload) {
     
      state.category = payload;
    },
    setSinglecategory(state, payload) {
      state.singlecategory = payload;
    },
  },
};
