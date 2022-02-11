import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    banner: null,
    singlebanner: null,
  },
  getters: {
    getbannerList(state) {
     
      return state.banner;
    },
     bannerById(state) {
     ;
      return state.singlebanner;
    },
  },
  actions: {
    async bannersList({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/banner`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.success) {
            commit("setbannerList", response.data.banner);
          }
          return response.data.banner;
        })
        .catch(function (error) {
          commit("setbannerList", null);
          console.log(error);
        });
    },

    getbannerById({ commit }, data) {
     
      commit("setSinglebanner", data);
    },

    async addbanner({ commit }, payload) {
     

      var formData = new FormData();
      formData.append("banner_title", payload.banner_title);
      if(payload.banner_machine_ids){

        payload.banner_machine_ids.forEach((x) => {
          formData.append("banner_machine_ids", x);
        });
      }
      // formData.append("machine_id", payload.machine_id)
      formData.append("banner_description", payload.banner_description);
      formData.append("banner_status", payload.banner_status);
      formData.append("banner_end_date", payload.banner_end_date);
      formData.append("banner_start_date", payload.banner_start_date);
      formData.append("banner_image", payload.image);
      return await axios.post(`${process.env.VUE_APP_API_URL}api/v1/banner`, formData, {headers: { Authorization: `Bearer ${JwtService.getToken()}`}})
        .then((response) => {
          return response.data;
          if (response.status) {
            // commit("setbanner", payload.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updatebanner({ commit }, payload) {
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/banner/${payload._id}`,
          {
            name: payload.name,
            location: payload.location,
            status: payload.status,
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

    async removebanner({ commit }, bannerId) {
     
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/v1/banner/${bannerId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetbannerState({ commit }) {
      commit("setSinglebanner", null);
    },
  },
  mutations: {
    setbanner(state, payload) {
      state.banner.unshift(payload);
    },
    setbannerList(state, payload) {
      state.banner = payload;
    },
    setSinglebanner(state, payload) {
     
      state.singlebanner = payload;
    },
  },
};
