import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    order: null,
    orderTotal: null,
    singleOrder: null,
    event: null,
    eventTotal: null,
  },
  getters: {
    getOrderList(state) {

      return state.order;
    },
    getOrderListTotal(state) {

      return state.orderTotal;
    },
    getOrderById(state) {
      return state.singleOrder;
    },
    geteventList(state) {
      return state.ve;
    },
    geteventListTotal(state) {
      return state.eventTotal;
    },
  },
  actions: {
    async getOrdersList({ commit }, payload) {
      if (payload.pagination) {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/order?pagination=false`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }).then(function (response) {
            // handle success 

            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.status) {

              commit("setOrderList", response.data.data);
              commit("setOrderListTotal", response.data.totalRecord);
            }
          })
          .catch(function (error) {
            if (error.response) {
              return error.response.data
            }
          });
      }
      else {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/order?resultPerPage=${payload.resultPerPage}&currentPage=${payload.currentPage}&pagination=true`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }).then(function (response) {
            // handle success 

            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.status) {

              commit("setOrderList", response.data.data);
              commit("setOrderListTotal", response.data.totalRecord);
            }
          })
          .catch(function (error) {
            if (error.response) {
              return error.response.data
            }
          });
      }

    },
    async getEventsList({ commit },payload) {
      if (payload.pagination) {
        return await axios.get(`${process.env.VUE_APP_API_URL}api/v1/event?pagination=true`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        }).then(function (response) {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.status) {
            commit("setEventList", response.data.data);
            commit("setEventListTotal", response.data.totalRecord);
          }
        })
          .catch(function (error) {
            if (error.response) {
              return error.response.data
            }
          });
      } else {
        return await axios.get(`${process.env.VUE_APP_API_URL}api/v1/event?resultPerPage=${payload.resultPerPage}&currentPage=${payload.currentPage}&pagination=true`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        }).then(function (response) {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.status) {
            commit("setEventList", response.data.data);
            commit("setEventListTotal", response.data.totalRecord);
          }
        })
          .catch(function (error) {
            if (error.response) {
              return error.response.data
            }
          });
      }
    },
    setOrder({ commit }, payload) {
      commit("setSingleOrder", payload);
    },
    getOrderById({ commit }, data) {

      commit("setSingleOrder", data);
    },

    async addOrder({ commit }, payload) {

      // return await apiCall("post", "api/Order/AddOrder", JSON.stringify(payload), '')

      await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/Order/AddOrder`,
          payload,

          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          if (response.status) {
            commit("setOrder", payload.data.data);
          }
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async addrefund({ commit }, payload) {

      await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/v1/order/refund`,
          payload,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {

        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    async updateOrder({ commit }, payload) {


      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/Order/UpdateOrder`,
          payload,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    async removeOrder({ commit }, orderId) {

      return await axios
        .post(
          `https://localhost:44341/api/Order/RemoveOrder?Id=${orderId}`,
          {},
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    resetOrderState({ commit }) {
      commit("setSingleOrder", null);
    },
  },
  mutations: {
    setOrder(state, payload) {
      state.order.unshift(payload);
    },
    setOrderList(state, payload) {

      state.order = payload;
    },
    setOrderListTotal(state, payload) {
      state.orderTotal = payload;
    },
    setEventList(state, payload) {

      state.event = payload;
    },
    setEventListTotal(state, payload) {

      state.eventTotal = payload;
    },
    setSingleOrder(state, payload) {
      state.singleOrder = payload;
    },
  },
};
