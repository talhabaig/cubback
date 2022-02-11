import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    inventory: null,
    singleinventory: null,
  },
  getters: {
    // getinventoryList(state) {
     
    //   return state.inventory;
    // },
    getinventoryById(state) {
      return state.singleinventory;
    },
  },
  actions: {
   
    async inventorysList({ commit }) {
        return await axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/inventory`, {
                headers: { Authorization: `Bearer ${JwtService.getToken()}` },
              })
      .then( (response)=> { 
         
        if (response.data.success) {
          commit("setinventoryList", response.data.inventory);
        }
      })
      .catch(function (error) {
        commit("setinventoryList",null);
        console.log(error);
      });
    },

    async getinventoryById({ commit }, data) {
     
      commit("setSingleinventory", data);
    },

    async addinventory({ commit }, payload) {
            
      await axios.post(`${process.env.VUE_APP_API_URL}api/v1/inventory`,
          payload,         
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response)=> {
         
          if (response.status) {
            commit("setinventory", payload.data);
          }
        })
        .catch(  (error)=>  {
          console.log(error);
        });
    },

    async updateinventory({ commit }, payload) {
      return await axios
      .put(
        `${process.env.VUE_APP_API_URL}api/v1/inventory/${payload._id}`,
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
          return response ;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeinventory({ commit }, inventoryId) {
     
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/inventory/${inventoryId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetinventoryState({ commit }) {
      commit("setSingleinventory", null);
    },
    resetinventoryListState({ commit }) {
      commit("emptyinventoryList", null);
    },
  },
  mutations: {
    setinventory(state, payload) {
      state.inventory.unshift(payload);
    },
    setinventoryList(state, payload) {
     
      state.inventory = payload;
    },
    setSingleinventory(state, payload) {
      state.singleinventory = payload;
    },
    emptyinventoryList(state, payload) {
      state.inventory = payload;
    },
  },
};
