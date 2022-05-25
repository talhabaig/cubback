import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    machine: null,
    machineTotal: null,
    singlemachine: null,
    canteen_name: null,
  },
  getters: {
    getmachineList(state) {
      return state.machine;
    },
    getmachineListTotal(state) {
      return state.machineTotal;
    },
    getmachineById(state) {
      return state.singlemachine;
    },
    getCanteenName(state) {
      return state.canteen_name;
    },
  },
  actions: {
    async machinesList({ commit }, payload) {
      if (payload.pagination) {
        return await axios
          .get(
            `${process.env.VUE_APP_API_URL}api/v1/machine?pagination=false`,
            {
              headers: { Authorization: `Bearer ${JwtService.getToken()}` },
            }
          )
          .then((response) => {
            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.data.success) {
              commit("setmachineList", response.data.All_Machines);
              commit("setmachineListTotal", response.data.totalRecord);
              return response.data.All_Machines;
            }
          })
          .catch(function (error) {
            commit("setmachineList", null);
            if (error.response) {
              return error.response.data
            }
          });
      } else {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/machine?resultPerPage=${payload.resultPerPage}&currentPage=${payload.currentPage}&pagination=true`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.message == 'jwt malformed') {
              window.location.href = '/login'
            }
            if (response.data.success) {
              commit("setmachineList", response.data.machine);
              commit("setmachineListTotal", response.data.totalRecord);
              return response.data.machine;
            }
          })
          .catch(function (error) {
            commit("setmachineList", null);
            if (error.response) {
              return error.response.data
            }
          });
      }
    },
    async getmachinechannels({ commit }, payload) {
      commit("setCanteenName", payload.canteen_name);
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/channel/${payload._id}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.message == 'jwt malformed') {
            window.location.href = '/login'
          }
          if (response.data.success) {
            commit("setSinglemachine", response.data.channel);
          }
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async updateChannel({ commit }, payload) {
      var mergearay = []
      if (payload.merge_to != null) {

        mergearay.push(payload.merge_to)
      }
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/channel/${payload._id}`,
          {
            channel_name: payload.channel_name,
            channel_product_id: payload.channel_product_id,
            channel_product_threshold: payload.channel_product_threshold,
            channel_extraction_time: payload.channel_extraction_time,
            channel_status: payload.channel_status,
            channel_product_quantity: payload.channel_product_quantity,
            merge_to: mergearay,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },


    async ApplyMachneSettings({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/machine/update_temperature/machine_id/${payload.id}`,
          {
            machine_temperature: payload.machine_temperature
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async addChannel({ commit }, payload) {
      var mergearay = []
      mergearay.push(payload.merge_to)
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/v1/channel/machine_id/${payload.machine_id}`,
          {
            row_number: payload.row_number,
            channel_product_id: payload.channel_product_id,
            channel_extraction_time: payload.channel_extraction_time,
            channel_status: payload.channel_status,
            merge_to: mergearay,
            channel_product_threshold: payload.channel_product_threshold,
            channel_product_quantity: payload.channel_product_quantity,
            position: payload.position,
            channel_position: payload.channel_position,

          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {

          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async addRow({ commit }, payload) {
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/v1/channel/row/machine_id/${payload.machine_id}`,
          {
            row_position: payload.row_position,
            row_number: parseFloat(payload.row_number),
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async delRow({ commit }, payload) {
      return await axios
        .delete(
          `${process.env.VUE_APP_API_URL}api/v1/channel/machine_id/${payload.id}/row_number/${parseInt(payload.row)}?wastage=true`,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async delchanel({ commit }, payload) {
      return await axios
        .delete(
          `${process.env.VUE_APP_API_URL}api/v1/channel/${payload.channel_id}/machine_id/${payload.machine_id}/row_number/${parseInt(payload.row_number)}`,
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async addChannelQuantity({ commit }, payload) {
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/v1/inventory/add/channel_id/${payload.channel_id}/product_id/${payload.product_id}`,
          {
            channel_product_quantity: payload.channel_product_quantity,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {

          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async remChannelQuantity({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/inventory/remove/channel_id/${payload.channel_id}/product_id/${payload.product_id}`,
          {
            channel_product_quantity: payload.channel_product_quantity,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {

          return response.data;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },
    async getmachineById({ commit }, data) {
      commit("setSinglemachine", data);
    },

    async addmachine({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_API_URL}api/v1/machine`, payload, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.status) {
            commit("setmachine", response.data.machineModel);
          }
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return error.response.data
          }
        });
    },

    async updatemachine({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/machine/${payload._id}`,
          {
            canteen_id: payload.canteen_id,
            machine_name: payload.machine_name,
            machine_code: payload.machine_code,
            machine_location: payload.machine_location,
            machine_status: payload.machine_status,
            temperature: payload.temperature,
            voltage: payload.voltage
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

    async removemachine({ commit }, machineId) {
      return await axios
        .delete(`${process.env.VUE_APP_API_URL}api/v1/machine/${machineId}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          if (error.response) {
            return error.response.data
          }
        });
    },

    resetmachineState({ commit }) {
      commit("setSinglemachine", null);
    },
    resetmachineListState({ commit }) {
      commit("emptymachineList", null);
    },
  },
  mutations: {
    setmachine(state, payload) {
      state.machine.unshift(payload);
    },
    setmachineList(state, payload) {
      state.machine = payload;
    },
    setmachineListTotal(state, payload) {
      state.machineTotal = payload;
    },
    setSinglemachine(state, payload) {
      state.singlemachine = payload;
    },
    setCanteenName(state, payload) {
      state.canteen_name = payload;
    },
    emptymachineList(state, payload) {
      state.machine = payload;
    },
  },
};
