import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    canteen: null,
    singlecanteen: null,
  },
  getters: {
    getcanteenList(state) {
      return state.canteen;
    },
    getcanteenById(state) {
      return state.singlecanteen;
    },
  },
  actions: { 
    async getcanteensList({ commit }) {
        return await axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/canteen`, {
                headers: { Authorization: `Bearer ${JwtService.getToken()}` },
              })
      .then( (response)=> { 
         
        if (response.data.success) {
          commit("setcanteenList", response.data.allCanteen);
        }
        else{
          commit("setcanteenList", null);
        }
        return response.data.allCanteen;
      })
      .catch( (error) =>{
       
        commit("setcanteenList", null);
        console.log(error);
      });
    },

    async getcanteenById({ commit }, data) { 
      commit("setSinglecanteen", data);
    },

    async addcanteen({ commit }, payload) {
            
     return await axios.post(`${process.env.VUE_APP_API_URL}api/v1/canteen`,
          payload,         
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response)=> {
         debugger
          if (response.data.success) {
            commit("setcanteen",response.data.canteen);
          }
          return response.data;
        })
        .catch(  (error)=>  {
          console.log(error);
        });
    },

    async updateCanteen({ commit }, payload) {
      return await axios
      .put(
        `${process.env.VUE_APP_API_URL}api/v1/canteen/${payload._id}`,
        {
          canteen_name: payload.canteen_name,
          canteen_location: payload.canteen_location, 
          canteen_status: payload.canteen_status, 
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

    async removecanteen({ commit }, canteenId) {
     
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/canteen/${canteenId}`, {
        headers: { Authorization: `Bearer ${JwtService.getToken()}` },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    resetcanteenState({ commit }) {
      commit("setSinglecanteen", null);
    },
  },
  mutations: {
    setcanteen(state, payload) {
      state.canteen.unshift(payload);
    },
    setcanteenList(state, payload) {
     
      state.canteen = payload;
    },
    setSinglecanteen(state, payload) {
      state.singlecanteen = payload;
    },
  },
};
