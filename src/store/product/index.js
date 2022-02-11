import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    product: null,
    inventory: [],
    singleproduct: null,
  },
  getters: {
    getproductList(state) {
      return state.product;
    },
    getinventoryList(state) {
      debugger;
      return state.inventory;
    },
    getproductById(state) {
      return state.singleproduct;
    },
  },
  actions: {
    async productsList({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/product`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.success) {
            commit("setproductList", response.data.product);
          }
          return response.data.product;
        })
        .catch(function (error) {
          commit("setproductList", null);
          console.log(error);
        });
    },

    getproductById({ commit }, data) {
      commit("setSingleproduct", data);
    },

    async addproduct({ commit }, payload) {
      var formData = new FormData();
      formData.append("product_name", payload.product_name);
      formData.append("product_price", payload.product_price);
      formData.append("product_description", payload.product_description);
      formData.append("product_recipe", payload.product_recipe);
      formData.append("prdouct_allergic", payload.prdouct_allergic);
      formData.append("product_VAT", payload.product_VAT);
      formData.append("product_image", payload.product_image);
      formData.append("product_catagory_id", payload.product_catagory_id);
      formData.append("expiry_date", new Date());
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
          console.log(error);
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
            product_recipe: payload.product_recipe,
            prdouct_allergic: payload.prdouct_allergic,
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
          console.log(error);
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
          console.log(error);
        });
    },
    async getProductByMachineId({ commit }, machineId) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/inventory/products/machine/${machineId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          commit("setproductList", response.data.Data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    resetproductState({ commit }) {
      commit("setSingleproduct", null);
    },

    async inventoryList({ commit }, payload) {
      if (payload) {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/inventory/` + payload, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.success) {
              commit("setInventoryList", response.data.Data);
            }
            return response.data.Data;
          })
          .catch(function (error) {
            commit("setInventoryList", null);
            console.log(error);
          });
      } else {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/inventory/`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.success) {
              commit("setInventoryList", response.data.Data);
            }
            return response.data.Data;
          })
          .catch(function (error) {
            console.log(error);
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
          if (response.data.success) {
            commit("setInventoryList", response.data.Data);
          }
          return response.data.Data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async inventoryListByMachine({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/inventory/${payload}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.success) {
            commit("setInventoryList", response.data.Data);
          }
          return response.data.Data;
        })
        .catch(function (error) {
          console.log(error);
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
    setInventoryList(state, payload) {
      if (payload) {
        state.inventory = [];
        Object.entries(payload).forEach((a) => {
          state.inventory.push({ Quantity: a[1].qty, productName: a[1].name });
        });
      }
    },
    setSingleproduct(state, payload) {
      state.singleproduct = payload;
    },
  },
};
