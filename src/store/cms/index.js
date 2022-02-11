import JwtService from "../jwt"; 
const axios = require("axios");

export default {
  state: {
    cms: null,
    singlecms: null,
  },
  getters: {
    getcmsList(state) { 
      return state.cms;
    },
    getcmsById(state) {
      return state.singlecms;
    },
  },
  actions: {
    async getcmssList({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/page`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => { 
          if (response.data.success) {
            commit("setcmsList", response.data.allPages);
          }
          return response.data.cmsData;
        })
        .catch(function (error) {
          commit("setcmsList", null);
          console.log(error);
        });
    },

    async getcmsById({ commit }, data) { 
      commit("setSinglecms", data);
    },

    async addcms({ commit }, payload) {
     

      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/page`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) { 
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async updatecms({ commit }, payload) { 
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/page/${payload._id}`,
          {
            title: payload.title,
            description: payload.description,
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

    async removecms({ commit }, cmsId) { 
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/page/${cmsId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetcmsState({ commit }) {
      commit("setSinglecms", null);
    },
  },
  mutations: {
    setcms(state, payload) {
      state.cms.unshift(payload);
    },
    setcmsList(state, payload) {
     
      state.cms = payload;
    },
    setSinglecms(state, payload) {
      state.singlecms = payload;
    },
  },
};
