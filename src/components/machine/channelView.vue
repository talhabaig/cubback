<template>
  <div>
    <div class="d-flex justify-space-around align-center mb-2 mt-3">
      <v-card-text>
        <div class="pageHeadingIcon">
          <div class="pageName">
            <svg class="pageNameSvg userManagmentIcon">
              <use xlink:href="#userManagment"></use>
            </svg>
          </div>
          <h2 class="mb-1">
            Vending Machine : {{ getmachineById[0].machine.machine_name }}
          </h2>
        </div>

        <span class="head-title ml-55">Canteen: {{ getCanteenName }}  </span>
      </v-card-text>

      <v-card-actions class="pa-5 pt-0">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          scrollable
          width="1024px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="hasPermission('user_create')"
              class="mr-4"
              style="background-color: #ecf5f7"
              @click="machinesettings()"
              ><i class="mr-2"
                ><img
                  src="../../assets/logos/setting-icon.svg"
                  style="margin-top: -4px; width: 18px; height: 18px"
                /> </i
              >Machine Setting</v-btn
            >
            <v-btn
              v-if="row < 7"
              dark
              color="main_bg_color"
              @click="addrowinmachine()"
              ><i class="mr-2">
                <img
                  src="../../assets/logos/Icon-awesome-arrow-alt-circle-right.svg"
                  style="margin-top: -4px; width: 18px; height: 18px"
                /> </i
              >Add Row</v-btn
            >
          </template>
        </v-dialog>
      </v-card-actions>
    </div>

    <div class="main-bg-clr">
      <div :class="'R' + r" v-for="(r, i) in row" :key="i">
        <div class="machine-row d-flex w-100">
          <div class="d-flex w-90">
            <div
              v-for="(data, index) in getmachineById.filter(
                (x) => x.row_number == r
              )"
              :key="index"
              v-if="data.row_number == r"
              class="w-100 text-center right-border"
            >
              <div class="machine-box">
                <img
                  @click="
                    editChannel(
                      data,
                      getmachineById.filter((x) => x.row_number == r)
                    )
                  "
                  class="edit-icon"
                  src="../../assets/logos/edit-icon-bg.svg"
                />
                <img src="../../assets/logos/machine-img.svg" />
              </div>
              <span
                v-b-tooltip.hover
                title="Product Quantity"
                v-if="data.channel_product_quantity"
                >{{ data.channel_product_quantity }}</span
              >

              <span v-b-tooltip.hover title="Product Name" v-if="data.products">
                {{ data.products.product_name }} <br />
              </span>
            </div>
          </div>
          <div class="r-icon">
            <div class="d-flex justify-center m-45">
              <img
                @click="
                  addnewchannel(
                    r,
                    getmachineById.filter((x) => x.row_number == r)
                  )
                "
                v-if="
                  getmachineById.filter((x) => x.row_number == r).length < 10
                "
                src="../../assets/logos/add-icon.svg"
                alt="add"
                class="pr-0 mt-1 actionIcons"
                style="height: 52px"
              />
              <img
                @click="removeRow(r)"
                src="../../assets/logos/sub-icon.svg"
                alt="sub"
                class="actionIcons"
              />
            </div>
          </div>
        </div>
        <div class="d-flex w-90">
          <div
            v-for="(data, index) in getmachineById.filter(
              (x) => x.row_number == r
            )"
            :key="index"
            v-if="data.row_number == r"
            class="d-flex pt-1 pb-1"
            style="width: 90%"
          >
            <div class="w-100 text-center">
              <span class="font-weight-bold text-black">
                <span
                  v-b-tooltip.hover
                  title="Channel Name"
                  v-if="data.channel_name"
                >
                  {{ data.channel_name }} <br /> </span
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-card-actions class="pa-5">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        scrollable
        width="1024px"
      >
        <template v-if="dialog" v-slot:default="dialog">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span>Edit Channel</span>

              <span class="crossPossition" @click="clear">
                <img src="../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Channel No <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="text"
                      v-model="chanelModel.channel_name"
                      disabled
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Merge Channel
                  </label>
                  <div class="right-inner-addon input-container pb-0">
                    <select
                      v-model="chanelModel.merge_to"
                      class="form-control login-field"
                    >
                      <option
                        v-for="(data, index) in mergeRow"
                        :key="index"
                        :value="data._id"
                      >
                        {{ data.channel_name }}
                      </option>
                    </select>
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Thresh Hold
                  </label>
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="text"
                      v-model="chanelModel.channel_product_threshold"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_product_threshold.$error"
                  >
                    <span v-if="$v.chanelModel.channel_product_threshold.$error"
                      >Threshold is required</span
                    >
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Product <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <select
                      v-model="chanelModel.channel_product_id"
                      class="form-control login-field"
                    >
                      <option
                        v-for="(d, i) in getproductList"
                        :key="i"
                        :value="d._id"
                      >
                        {{ d.product_name }}
                      </option>
                    </select>
                    <div
                      class="invalid-feedback"
                      v-if="$v.chanelModel.channel_product_id.$error"
                    >
                      <span v-if="$v.chanelModel.channel_product_id.$error"
                        >Product is required</span
                      >
                    </div>
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Quantity <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="number"
                      v-model="chanelModel.channel_product_quantity"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_product_quantity.$error"
                  >
                    <span
                      v-if="!$v.chanelModel.channel_product_quantity.minValue"
                    >
                      Quantity should be greater than Thresh hold</span
                    >
                    <span
                      v-else-if="
                        $v.chanelModel.channel_product_quantity.$error &&
                        $v.chanelModel.channel_product_quantity.minValue
                      "
                    >
                      Quantity is required</span
                    >
                  </div>
                </v-col>

                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Extraction Time <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="text"
                      v-model="chanelModel.channel_extraction_time + sec"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_extraction_time.$error"
                  >
                    <span v-if="$v.chanelModel.channel_extraction_time.$error"
                      >Extraction Time is required</span
                    >
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Status <small style="color: red">*</small></label
                  >
                  <v-radio-group v-model="chanelModel.channel_status" row>
                    <v-radio label="Active" value="Active"></v-radio>
                    <v-radio label="InActive" value="InActive"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <v-btn
                    class="mr-4 modal-btn"
                    dark
                    color="main_bg_color"
                    @click="submitAssociate"
                  >
                    Apply Changes
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions class="pa-5">
      <v-dialog
        v-model="addnewchanneldialog"
        transition="dialog-top-transition"
        scrollable
        width="1024px"
      >
        <template
          v-if="addnewchanneldialog"
          v-slot:default="addnewchanneldialog"
        >
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <b><h1>Add Channel</h1></b>
              <span class="crossPossition" @click="clear">
                <img src="../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Row No <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      disabled
                      v-model="chanelModel.row_number"
                      type="text"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Thresh Hold
                  </label>
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="text"
                      v-model="chanelModel.channel_product_threshold"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_product_threshold.$error"
                  >
                    <span v-if="$v.chanelModel.channel_product_threshold.$error"
                      >Threshold is required</span
                    >
                  </div>
                </v-col>

                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Product <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <select
                      v-model="chanelModel.channel_product_id"
                      class="form-control login-field"
                    >
                      <option
                        v-for="(d, i) in getproductList"
                        :key="i"
                        :value="d._id"
                      >
                        {{ d.product_name }}
                      </option>
                    </select>
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_product_id.$error"
                  >
                    <span v-if="$v.chanelModel.channel_product_id.$error"
                      >Product is required</span
                    >
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Quantity <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      v-model="chanelModel.channel_product_quantity"
                      type="number"
                      class="form-control login-field"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_product_quantity.$error"
                  >
                    <span
                      v-if="!$v.chanelModel.channel_product_quantity.minValue"
                    >
                      Quantity should be greater than Thresh hold</span
                    >
                    <span
                      v-else-if="
                        $v.chanelModel.channel_product_quantity.$error &&
                        $v.chanelModel.channel_product_quantity.minValue
                      "
                    >
                      Quantity is required</span
                    >
                  </div>
                </v-col>

                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Extraction Time <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      v-model="chanelModel.channel_extraction_time"
                      type="text"
                      class="form-control login-field"
                      placeholder="1 sec"
                    />
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="$v.chanelModel.channel_extraction_time.$error"
                  >
                    <span v-if="$v.chanelModel.channel_extraction_time.$error"
                      >Extraction time is required</span
                    >
                  </div>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Posittion <small style="color: red">*</small></label
                  >
                  <select
                    v-model="chanelModel.position"
                    class="form-control login-field"
                  >
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="random">Random</option>
                  </select>
                </v-col>
                <v-col v-if="chanelModel.position == 'random'" class="col-6">
                  <label class="regularFont login-font" style=""
                    >Position After Channel<small style="color: red"
                      >*</small
                    ></label
                  >
                  <select
                    v-model="chanelModel.channel_position"
                    class="form-control login-field"
                  >
                    <option
                      v-for="(data, index) in mergeRow"
                      :key="index"
                      :value="data._id"
                    >
                      {{ data.channel_name }}
                    </option>
                  </select>
                </v-col>
                <v-col class="col-6">
                  <label class="regularFont login-font" style=""
                    >Status <small style="color: red">*</small></label
                  >
                  <v-radio-group v-model="chanelModel.channel_status" row>
                    <v-radio label="Active" value="Active"></v-radio>
                    <v-radio label="InActive" value="InActive"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <v-btn
                    class="mr-4 modal-btn"
                    dark
                    color="main_bg_color"
                    @click="addChannelinrow"
                  >
                    Apply Changes
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions class="pa-5">
      <v-dialog
        v-model="addRowDialoge"
        transition="dialog-top-transition"
        scrollable
        width="1024px"
      >
        <template v-if="addRowDialoge" v-slot:default="addRowDialoge">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span> Add Row </span>
              <span class="crossPossition" @click="clear">
                <img src="../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col class="col-6">
                  <strong>Position</strong>
                  <select
                    v-model="rowModel.row_position"
                    class="form-control login-field"
                  >
                    <option value="start">Start</option>
                    <option value="end">End</option>
                    <option value="Random">Random</option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="$v.rowModel.row_position.$error"
                  >
                    <span v-if="$v.rowModel.row_position.$error"
                      >Position is required</span
                    >
                  </div>
                </v-col>
                <v-col v-if="rowModel.row_position == 'Random'" class="col-6">
                  <strong>Add Row After *</strong>
                  <select
                    v-model="rowModel.row_number"
                    class="form-control login-field"
                  >
                    <option v-for="(r, i) in row" :key="i" :value="r">
                      Row {{ r }}
                    </option>
                  </select>
                </v-col>

                <v-col class="col-12 d-flex justify-center">
                  <v-btn
                    class="mr-4 modal-btn"
                    dark
                    color="main_bg_color"
                    @click="submit_NewRow"
                  >
                    Apply Changes
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions class="pa-5">
      <v-dialog
        v-model="machineSetting"
        transition="dialog-top-transition"
        scrollable
        width="426px"
      >
        <template v-if="machineSetting" v-slot:default="machineSetting">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span>Machine Settings </span>
              <span class="crossPossition" @click="clear">
                <img src="../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col class="col-12 justify-center">
                  <label class="regularFont login-font" style=""
                    >Set Temperature <small style="color: red">*</small></label
                  >
                  <div class="right-inner-addon input-container pb-0">
                    <input
                      type="text"
                      v-model="temperature"
                      class="form-control login-field"
                    />
                  </div>
                  <div class="invalid-feedback" v-if="$v.temperature.$error">
                    <span v-if="$v.temperature.$error"
                      >Temperature is required</span
                    >
                  </div>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <v-btn
                    class="mr-4 modal-btn"
                    dark
                    color="main_bg_color"
                    @click="ApplyMachneSettings()"
                  >
                    Apply Changes
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions class="pa-5">
      <v-dialog
        v-model="removeRowDialoge"
        transition="dialog-top-transition"
        scrollable
        width="360px"
      >
        <template v-if="removeRowDialoge" v-slot:default="removeRowDialoge">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span
                style="font-size: 30px !important; font-weight: 800 !important"
                >Warning
              </span>
              <span class="crossPossition" @click="clear">
                <img src="../../assets/logos/Icon metro-cross.svg" />
              </span>
            </v-toolbar>
            <v-card-text>
              <v-col class="col-12 d-flex justify-center">
                <div class="justify-center" style="color: orange;font-size:22px">
                  Are You Sure?
                </div>
              </v-col>
              <v-col class="col-12 justify-center text-center" style="font-size:20px">
                <div class="justify-center">
                  You Want to delete {{ rowsNumber }} row?
                </div>
                <br />
                <div class="justify-center">
                  On Deletion All products will be added in Waste (If Any)
                </div>
              </v-col>
              <br />
              <v-row>
                <v-col class="col-12 d-flex justify-center">
                  <v-btn
                    class="mr-4 modal-btn"
                    dark
                    color="main_bg_color"
                    @click="removeRowfromMachine"
                  >
                    Submit
                  </v-btn>
                  <v-btn class="modal-btn" @click="clear"> Close </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions style="width: 900px" class="pa-5">
      <v-dialog
        v-model="successDialog"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="successDialog" v-slot:default="successDialog">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span style="font-weight: bolder">Successful</span>
              <span class="crossPossition" @click="clear">
                <img
                  src="../../assets/logos/Icon metro-cross.svg"
                  @click="closeSuccessModel"
                />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <center>
                <span>Machine row is updated successfully</span><br /><br />
                <i
                  ><img src="../../assets/logos/Path 10980.svg" height="100px"
                /></i>
              </center>
              <br /><br />
              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="modal-btn"
                  style="min-width: 100px !important"
                  @click="closeSuccessModel"
                >
                  Close
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
    <v-card-actions style="width: 900px" class="pa-5">
      <v-dialog
        v-model="successDialog2"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="successDialog2" v-slot:default="successDialog2">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span style="font-weight: bolder">Successful</span>
              <span class="crossPossition" @click="clear">
                <img
                  src="../../assets/logos/Icon metro-cross.svg"
                  @click="closeSuccessModel"
                />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <center>
                <span>Machine temperature is updated successfully</span
                ><br /><br />
                <i
                  ><img src="../../assets/logos/Path 10980.svg" height="100px"
                /></i>
              </center>
              <br /><br />
              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="modal-btn"
                  style="min-width: 100px !important"
                  @click="closeSuccessModel"
                >
                  Close
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
     <v-card-actions style="width: 900px" class="pa-5">
      <v-dialog
        v-model="successDialog3"
        transition="dialog-top-transition"
        scrollable
      >
        <template v-if="successDialog3" v-slot:default="successDialog3">
          <v-card>
            <v-toolbar
              class="mb-2 text-center justify-center b-border m-2"
              style="box-shadow: none"
            >
              <span style="font-weight: bolder">Successful</span>
              <span class="crossPossition" @click="clear">
                <img
                  src="../../assets/logos/Icon metro-cross.svg"
                  @click="closeSuccessModel"
                />
              </span>
            </v-toolbar>

            <v-card-text class="pt-10 text-h6">
              <center>
                <span>Machine Channel is updated successfully</span><br /><br />
                <i
                  ><img src="../../assets/logos/Path 10980.svg" height="100px"
                /></i>
              </center>
              <br /><br />
              <v-col class="col-12 d-flex justify-space-around">
                <v-btn
                  class="modal-btn"
                  style="min-width: 100px !important"
                  @click="closeSuccessModel"
                >
                  Close
                </v-btn>
              </v-col>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  mixins: [validationMixin],
  validations() {
    return {
      temperature: { required },
      rowModel: { row_position: { required } },
      chanelModel: {
        channel_product_quantity: {
          required,
          minValue: minValue(
            parseInt(this.chanelModel.channel_product_threshold)
          ),
        },
        channel_product_id: { required },
        channel_product_threshold: { required },
        channel_extraction_time: { required },
      },
    };
  },
  data: () => ({
    sec: " sec",
    row: null,
    temperature: null,
    permissions: [],
    dialog: false,
    addnewchanneldialog: false,
    addRowDialoge: false,
    successDialog2: false,
    successDialog3: false,
    removeRowDialoge: false,
    successDialog: false,
    machineSetting: false,
    delDialog: false,
    allowDel: false,
    mergeWith: null,
    mergeRow: null,
    selectedChanalForMerge: null,
    quantityModel: {
      channel_product_quantity: 0,
      channel_id: "",
      product_id: "",
    },
    chanelModel: {
      row_number: 0,
      channel_product_id: "",
      channel_extraction_time: 0,
      channel_status: "Active",
      channel_product_threshold: 0,
      channel_product_quantity: 0,
      position: "",
      channel_position: "",
    },
    remchanel: {
      channel_id: "",
      machine_id: "",
      row_number: 0,
    },
    rowsNumber: null,
    rowModel: {
      row_position: "",
      row_number: "",
    },
  }),
  computed: {
    ...mapGetters([
      "getcanteenList",
      "getproductList",
      "userDetails",
      "getmachineById",
      "getCanteenName"
    ]),
  },
  watch: {},
  methods: {
    closeSuccessModel() {
      this.successDialog = false;
      this.successDialog2 = false;
      this.successDialog3 = false;
    },
    editChannel(data, array) {
      console.log(data)
      this.chanelModel = [];

      this.chanelModel = data;
      this.selectedChanalForMerge = null;
      this.mergeWith = data;
      var index = array.findIndex((e) => e._id == data._id);
      var prev = array[index - 1];
      var after = array[index + 1];
      this.mergeRow = array.filter((e) => {
        if (prev && after) {
          return e._id == prev._id || e._id == after._id;
        } else if (prev) {
          return e._id == prev._id;
        } else if (after) {
          return e._id == after._id;
        }
      });
      this.dialog = true;
      this.isEdit = true;
    },
    addnewchannel(obj, array) {
      this.chanelModel = [];
      this.mergeRow = array;
      this.chanelModel.row_number = obj;
      this.addnewchanneldialog = true;
      this.isEdit = true;
    },
    async ApplyMachneSettings() {
      this.$v.temperature.$touch();
      if (!this.$v.temperature.$invalid) {
        var vm = this;
        var data = {
          id: this.getmachineById[0].machine_id,
          machine_temperature: this.temperature,
        };
        await this.$store.dispatch("ApplyMachneSettings", data).then((r) => {
          if (r.success) {
            vm.successDialog2 = true;
            vm.machineSetting = false;
            vm.isEdit = false;
          }
        });
      }
    },
    async removeRowfromMachine() {
      var vm = this;
      var data = {
        id: this.getmachineById[0].machine_id,
        row: this.rowsNumber,
      };
      await this.$store.dispatch("delRow", data).then((r) => {
        if (r.success) {
          vm.successDialog = true;
          vm.removeRowDialoge = false;
          vm.isEdit = false;
        }
      });
      await this.$store.dispatch(
        "getmachinechannels",
        this.getmachineById[0].machine_id
      );
      this.row = this.getmachineById.filter(
        (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
      ).length;
    },
    removeRow(obj) {
      this.rowsNumber = obj;
      this.removeRowDialoge = true;
      this.isEdit = true;
    },
    addrowinmachine() {
      this.addRowDialoge = true;
      this.isEdit = true;
    },
    hasPermission(obj) {
      // if (
      //   this.userDetails &&
      //   this.userDetails.user &&
      //   this.userDetails.user.user_role == "super_admin"
      // ) {
      return true;
      // } else {
      //   return this.userDetails.permissions.permission_name.includes(obj);
      // }
    },
    channalname(obj) {
      return obj.substring(0, 2);
    },
    addChanal(obj, array) {
      this.chanelModel.row_number = obj;
      this.mergeRow = array;
      this.$bvModal.show("addChannel");
    },

    mergeChanal(obj, array) {
      this.selectedChanalForMerge = null;
      this.mergeWith = obj;
      var index = array.findIndex((e) => e._id == obj._id);
      var prev = array[index - 1];
      var after = array[index + 1];
      this.mergeRow = array.filter((e) => {
        if (prev && after) {
          return e._id == prev._id || e._id == after._id;
        } else if (prev) {
          return e._id == prev._id;
        } else if (after) {
          return e._id == after._id;
        }
      });
      this.$bvModal.show("mergeChannal");
    },

    clear() {
      (this.dialog = false),
        (this.addnewchanneldialog = false),
        (this.addRowDialoge = false),
        (this.removeRowDialoge = false),
        (this.machineSetting = false),
        (this.delDialog = false),
        (this.allowDel = false);
    },
    async submitAssociate() {
      this.$v.chanelModel.$touch();
      if (!this.$v.chanelModel.$invalid) {
        await this.$store.dispatch("updateChannel", this.chanelModel);
        await this.$store.dispatch(
          "getmachinechannels",
          this.chanelModel.machine_id
        );
        this.row = this.getmachineById.filter(
          (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
        ).length;
        this.machineModel = this.getmachineById;
        this.successDialog3 = true;
        this.dialog = false;
        this.isEdit = false;
      }
    },
    async addChannelinrow() {
      this.$v.chanelModel.$touch();
      console.log(this.$v.chanelModel);
      if (!this.$v.chanelModel.$invalid) {
        this.chanelModel.machine_id = this.getmachineById[0].machine_id;
        await this.$store.dispatch("addChannel", this.chanelModel);
        await this.$store.dispatch(
          "getmachinechannels",
          this.chanelModel.machine_id
        );
        this.row = this.getmachineById.filter(
          (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
        ).length;
        this.addnewchanneldialog = false;
        this.successDialog = true;
        this.isEdit = false;
      }
    },

    machinesettings() {
      this.machineSetting = true;
      this.isEdit = true;
    },
    async submit_NewRow() {
      this.$v.rowModel.$touch();
      if (!this.$v.rowModel.$invalid) {
        this.rowModel.machine_id = this.getmachineById[0].machine_id;
        await this.$store.dispatch("addRow", this.rowModel);
        await this.$store.dispatch(
          "getmachinechannels",
          this.rowModel.machine_id
        );
        this.row = this.getmachineById.filter(
          (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
        ).length;
        this.addRowDialoge = false;
        this.successDialog3 = true;
        this.isEdit = false;
      }
    },
  },
  mounted() {
    this.permissions = this.userDetails.permissions;
    console.log("uu",this.getcanteenList.canteen_name )
    this.row = this.getmachineById.filter(
      (v, i, a) => a.findIndex((t) => t.row_number === v.row_number) === i
    ).length;
    
  },
  destroyed() {
    this.$store.dispatch("resetmachineState");
  },
};
</script>


<style scoped>
.bg-clr {
  background-color: #ecf5f7;
}
.v-input__slot:before {
  border: none;
}
.v-card__actions > .v-btn.v-btn {
  padding: 0 20px;
}
.theme--light.v-data-table thead {
  background-color: #747474 !important;
}
.right-border {
  border-right: 2px solid #f8932d;
}
.machine-row {
  background-color: #fff;
  height: 150px;
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
  border: 2px solid #f8932d;
}
.machine-box {
  background-color: #f7f8e8;
  width: 99px;
  height: 100px;
  margin: 14px auto 8px;
  text-align: center;
  border-radius: 18px;
  padding: 18px;
}
.r-icon {
  width: 10%;
  right: 0;
  border-top-right-radius: 18px;
}
.m-37 {
  margin: 37px auto;
}
.pr-22 {
  padding-right: 22px;
}
.right-border span {
  color: #222222;
  letter-spacing: 1px;
  opacity: 1;
}
.main-bg-clr {
  background-color: rgb(236, 245, 247);
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
}
.edit-icon {
  width: 36px;
  margin-top: -27px;
  height: 36px;
  margin-left: 58px;
  position: absolute;
}
.ml-55 {
  margin-left: 55px !important;
}
.head-title {
  font-size: 18px;
  letter-spacing: 1.2px;
  color: #707070;
  opacity: 1;
}
* {
  letter-spacing: 1px;
}
.b-border {
  border-bottom: 1px solid #f8932d;
}
.m-45 {
  margin: 45px auto;
}

.actionIcons {
  width: 60px;

  height: 60px;
}
</style>


   