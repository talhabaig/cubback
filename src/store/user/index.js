import JwtService from "../jwt";
const axios = require("axios");

export default {
  state: {
    users: [],
    roles: [],
    permissions: [],
    singleUser: null,
    singleRole: null,
  },
  getters: {
    getuserList(state) {
      return state.users;
    },
    getroleList(state) { 
      return state.roles;
    },
    getpermissionList(state) { 
      return state.permissions;
    },
    getUserById(state) {
      return state.singleUser;
    },
    getRoleById(state) {
      return state.singleRole;
    },
  },
  actions: {
    async getUserList({ commit }) { 
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/users`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) { 
          console.log(response);
          if (response.status) {
            commit("setUserList", response.data.allUser);
          }
        })
        .catch(function (error) { 
          commit("setUserList", null);
          console.log(error);
        });
    },
    async getRoleList({ commit }) { 
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/roles`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {  
          if (response.status) {
            commit("setRoleList", response.data.Data);
          }
          return response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async getPermissionList({ commit }) { 
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/permissions`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {  
          if (response.status) {
            commit("setPermissionList", response.data.Data);
          }
          return response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    async getUserById({ commit }, data) {
      commit("setSingleUser", data);
    },
    async getRoleById({ commit }, data) {
      commit("setSingleRole", data);
    },

    async addUser({ commit }, payload) {
     
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/users/`, payload,
        {
          headers: { Authorization: `Bearer ${JwtService.getToken()}`},
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
         
          return error;
        });
    },
    async addRole({ commit }, payload) { 
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/roles/`, payload,
        {
          headers: { Authorization: `Bearer ${JwtService.getToken()}`},
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
         
          return error;
        });
    },

    async updateUser({ commit }, payload) {
     debugger
      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/v1/users/${payload._id}`,
          {
            user_name: payload.user_name,
            user_role_id: payload.user_role_id,
            user_phone: payload.user_phone, 
            user_status: payload.user_status, 
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async updateRole({ commit }, payload) {
     
      return await axios
        .put(`${process.env.VUE_APP_API_URL}api/v1/roles/${payload._id}`,
          {
            role_name: payload.role_name,
            role_status: payload.role_status, 
            user_permission: payload.user_permission, 
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async removeUser({ commit }, userId) {
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async removeRole({ commit }, userId) {
      return await axios.delete(`${process.env.VUE_APP_API_URL}api/v1/roles/${userId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetUserState({ commit }) {
      commit("setSingleUser", null);
    },
    resetRoleState({ commit }) {
      commit("setSingleRole", null);
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.user.unshift(payload);
    },
    setUserList(state, payload) {
      state.users = payload.filter((x) => {
        return x.user_role == "food_supplier";
      });;
    },
    setRoleList(state, payload) {
      state.roles = payload;
    },
    setPermissionList(state, payload) {
      state.permissions = payload;
    },
    setSingleUser(state, payload) {
      state.singleUser = payload;
    },
    setSingleRole(state, payload) {
      state.singleRole = payload;
    },
  },
};
