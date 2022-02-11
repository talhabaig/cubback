import JwtService from "../jwt";
import { apiCall } from "../request";
const axios = require("axios");

export default {
  state: {
    machine: null,
    singlemachine: null,
  },
  getters: {
    getmachineList(state) {
      return state.machine;
    },
    getmachineById(state) {
      return state.singlemachine;
    },
  },
  actions: {
    async machinesList({ commit }, payload) {
      if (payload) {
        return await axios
          .get(
            `${process.env.VUE_APP_API_URL}api/v1/canteen/machine_canteen/${payload}`,
            {
              headers: { Authorization: `Bearer ${JwtService.getToken()}` },
            }
          )
          .then((response) => {
            if (response.data.success) {
              commit("setmachineList", response.data.All_Machines);
              return response.data.All_Machines;
            }
          })
          .catch(function (error) {
            commit("setmachineList", null);
            console.log(error);
          });
      } else {
        return await axios
          .get(`${process.env.VUE_APP_API_URL}api/v1/machine`, {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          })
          .then((response) => {
            if (response.data.success) {
              commit("setmachineList", response.data.machine);
              return response.data.machine;
            }
          })
          .catch(function (error) {
            commit("setmachineList", null);
            console.log(error);
          });
      }
    },
    async getmachinechannels({ commit }, payload) {
      return await axios
        .get(`${process.env.VUE_APP_API_URL}api/v1/channel/${payload}`, {
          headers: { Authorization: `Bearer ${JwtService.getToken()}` },
        })
        .then((response) => {
          if (response.data.success) {
            debugger
            commit("setSinglemachine", response.data.channel);
          }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async updateChannel({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/channel/${payload._id}`,
          {
            channel_name: payload.channel_name,
            channel_product_id: payload.channel_product_id,
            channel_channel_temperature: payload.channel_temperature,
            channel_extraction_time: payload.channel_extraction_time,
            channel_status: payload.channel_status,
            channel_voltage: payload.channel_voltage,
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => { 
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async mergeChannal({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/channel/machine_id/${payload.mergeChannal.machine_id}/merge_with/${payload.mergeChannal._id}`,
          {
            merge_to:payload.arrayData
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => { 
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async unmergeChannal({ commit }, payload) {
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/channel/unmerge/channel_id/${payload._id}`,
          {
            merge_to:payload.arrayData
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => { 
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async addChannel({ commit }, payload) {
      return await axios
        .post(
          `${process.env.VUE_APP_API_URL}api/v1/channel/machine_id/${payload.machine_id}`,
          {
            row_number: payload.row_number,
            channel_name: payload.channel_name,
            channel_product_id: payload.channel_product_id,
            channel_temperature: payload.channel_temperature,
            channel_extraction_time: payload.channel_extraction_time,
            channel_status: payload.channel_status,
            channel_voltage: payload.channel_voltage,
            column_number: parseFloat(payload.column_number),
          },
          {
            headers: { Authorization: `Bearer ${JwtService.getToken()}` },
          }
        )
        .then((response) => {
          //  if (response.data.success) {
          //    commit("setSinglemachine", response.data.channel[0]);
          //  }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
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
          //  if (response.data.success) {
          //    commit("setSinglemachine", response.data.channel[0]);
          //  }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
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
          //  if (response.data.success) {
          //    commit("setSinglemachine", response.data.channel[0]);
          //  }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
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
          console.log(error);
        });
    },

    async updatemachine({ commit }, payload) {
      debugger
      return await axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/machine/${payload.machine_id}`,
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
          console.log(error);
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
          console.log(error);
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
    setSinglemachine(state, payload) {
      state.singlemachine = payload;
    },
    emptymachineList(state, payload) {
      state.machine = payload;
    },
  },
};
