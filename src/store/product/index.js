import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    product: null,
    vend: null,
    productTotal: null,
    inventory: [],
    inventoryTotal: 0,
    singleproduct: null,
  },
  getters: {
    getproductList(state) {
      return state.product;
    },
    getproductListTotal(state) {
      return state.productTotal;
    },
    getvendList(state) {
      return state.vend;
    },
    getinventoryList(state) {
      return state.inventory;
    },
    getinventoryListTotal(state) {
      return state.inventoryTotal;
    },
    getproductById(state) {
      return state.singleproduct;
    },
  },
  actions: {
  async  bulkproduct({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/product/add`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          return response

        })
        .catch((error) => {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async addproduct({ commit }, payload) {
      var ingradients = payload.ingradients.split(",");
      var formData = new FormData();
      formData.append("product_name", payload.product_name);
      formData.append("product_price", payload.product_price);
      formData.append("product_description", payload.product_description);
      formData.append("product_VAT", payload.product_VAT);
      formData.append("product_image", payload.product_image);
      formData.append("product_catagory_id", payload.product_catagory_id);

      ingradients.forEach((x) => {
        formData.append("product_gradient", x);
      });

      formData.append("product_expiry_date", new Date());
      // formData.append("quantity", payload.quantity);
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/product`, formData, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          return response.data;
          if (response.status) {
            // commit("setproduct", payload.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async productsList({ commit }, payload) {
      if (payload.pagination) {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/product?pagination=false`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.data.success) {
              commit("setproductList", response.data.product);
              commit("setproductListTotal", response.data.totalRecord);
            }
            return response.data.product;
          })
          .catch(function (error) {
            commit("setproductList", null);
            if (error.response) {
              return error.response.data
            }
          });
      } else {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/product?resultPerPage=${payload.resultPerPage}&currentPage=${payload.currentPage}&pagination=true`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.data.success) {
              commit("setproductList", response.data.product);
              commit("setproductListTotal", response.data.totalRecord);
            }
            return response.data.product;
          })
          .catch(function (error) {
            commit("setproductList", null);
            if (error.response) {
              return error.response.data
            }
          });
      }

    },
    async getvendList({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/vend`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.data.success) {
            commit("setVendList", response.data.data);
          }
          return response.data.product;
        })
        .catch(function (error) {
          commit("setVendList", null);
          if (error.response) {
            return error.response.data
          }
        });
    },

    getproductById({ commit }, data) {
      commit("setSingleproduct", data);
    },


    async addvendLimit({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/vend`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return error.response.data
          }
        });
    },

    async updateproduct({ commit }, payload) {
      return await axios
        .put(
          `${process.env.VUE_APP_API_URL}api/v1/product/${payload._id}`,
          {
            product_name: payload.product_name,
            product_price: payload.product_price,
            product_description: payload.product_description,
            product_status: payload.product_status,
            product_VAT: payload.product_VAT,
            product_image: payload.product_image,
            expiry_date: payload.expiry_date,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    async removeproduct({ commit }, productId) {
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/v1/product/${productId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async getProductByMachineId({ commit }, machineId) {
      return await axios
        .get(
          `${process.env.VUE_APP_API_URL}api/v1/inventory/products/machine/${machineId}`,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then(function (response) {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          commit("setproductList", response.data.Data);
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    resetproductState({ commit }) {
      commit("setSingleproduct", null);
    },

    async inventoryList({ commit }, payload) {
      if (payload.pagination) {
        return await axios
          .post(`${process.env.VUE_APP_API_URL}api/v1/inventory/all?pagination=false`, payload, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.success) { 
              commit("setInventoryList", response.data.data);
              commit("setInventoryListTotal", response.data.totalRecord);
            }
            return response.data.data;
          })
          .catch(function (error) {
            commit("setInventoryList", null);
            if (error.response) {
              return error.response.data
            }
          });
      } else {
        return await axios
          .post(`${process.env.VUE_APP_API_URL}api/v1/inventory/all?resultPerPage=${payload.resultPerPage}&currentPage=${payload.currentPage}&pagination=true`, payload, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.success) { 
              commit("setInventoryList", response.data.data);
              commit("setInventoryListTotal", response.data.totalRecord);
            }
            return response.data.data;
          })
          .catch(function (error) {
            commit("setInventoryList", null);
            if (error.response) {
              return error.response.data
            }
          });
      }


    },
    async inventoryListByCanteen({ commit }, payload) {
      return await axios
        .get(
          `${process.env.VUE_APP_API_URL}api/v1/inventory/canteen/${payload}`,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.data.success) {
            commit("setInventoryList", response.data.Data);
          }
          return response.data.Data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async inventoryListByMachine({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/inventory/${payload}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.data.success) {
            commit("setInventoryList", response.data.Data);
          }
          return response.data.Data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
  },
  mutations: {
    setproduct(state, payload) {
      state.product.unshift(payload);
    },
    setproductList(state, payload) {
      state.product = payload;
    },
    setVendList(state, payload) {
      state.vend = payload;
    },
    setproductListTotal(state, payload) {
      state.productTotal = payload;
    },
    setInventoryList(state, payload) {
      if (payload) {
        state.inventory = payload;
      }
    },
    setInventoryListTotal(state, payload) { 
      if (payload) {
        state.inventoryTotal = payload;
      }
    },
    setSingleproduct(state, payload) {
      state.singleproduct = payload;
    },
  },
};
