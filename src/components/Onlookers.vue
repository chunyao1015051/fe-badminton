<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
    <v-row justify="center" dense>
      <v-col class="text-center">
        <h5>選擇您心目中的冠軍隊伍！</h5>
        <h5>吃瓜同時與冠軍一起分瓜～</h5>
        <h5>SLOGAN</h5>
        <h5>備註：如冠軍無人送瓜則瓜瓜直至下期夏至盃！</h5>
        <h5>1瓜 = 50</h5>
      </v-col>
      <v-col cols="12" class="text-right mb-n4 mt-n4">
        <v-btn
          variant="text"
          color="green"
          :loading="isLoadingGetQtyData"
          @click="getQtyData(), getMemberGroupedData()"
        >
          <v-icon>mdi-sync</v-icon>
          更新資料
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="data of groupedData" :key="data._id" cols="12">
        <v-row justify="center">
          <v-col
            v-for="subData of data.groups"
            :key="data._id + subData.group"
            cols="12"
            lg="7"
          >
            <v-row>
              <v-col>
                <v-card class="text-center" elevation="5">
                  <v-sheet>
                    {{ data._id }}
                  </v-sheet>
                  <v-sheet> {{ subData.group }}組 </v-sheet>
                </v-card>
              </v-col>
              <v-col cols="9">
                <v-sheet color="transparent">
                  組員：
                  <v-chip
                    v-for="member of subData.members"
                    :key="member.name"
                    label
                    color="blue-darken-2"
                    density="compact"
                    class="mr-1 mb-1"
                    >{{ member.name }}</v-chip
                  >
                </v-sheet>
                <v-sheet color="transparent">
                  總瓜量：{{ totalQty(data._id, subData.group) }}
                  <!-- <v-btn
                    variant="text"
                    color="green"
                    class="text-decoration-underline"
                    @click="
                      (isOpenTotalDialog = true),
                        (category = data._id),
                        (group = subData.group)
                    "
                  >
                    {{ totalQty(data._id, subData.group) }}
                  </v-btn> -->
                </v-sheet>
                <v-sheet color="transparent">
                  您已下訂瓜量：
                  {{ personalQty(data._id, subData.group) }}
                </v-sheet>
                <v-sheet color="transparent"> 目前排名： </v-sheet>
              </v-col>
              <v-col>
                <v-btn
                  color="blue"
                  block
                  @click="
                    (isOpenDialog = true),
                      (category = data._id),
                      (group = subData.group)
                  "
                >
                  送瓜
                </v-btn>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="isOpenDialog">
      <v-row justify="center">
        <v-col sm="12" md="4">
          <v-card>
            <v-toolbar dense flat>
              <v-toolbar-title>
                <span class="text-subheading">
                  {{ category }} {{ group }}組
                </span>
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row dense class="mb-4" justify="center">
                <v-col class="text-center" cols="12">
                  <span
                    class="text-h1 font-weight-bold text-blue"
                    v-text="qty"
                  ></span>
                </v-col>
                <v-col cols="12" class="text-center">
                  <span
                    class="text-right subheading me-1"
                    v-text="`瓜量 (${qty * 50}$)`"
                  >
                  </span>
                </v-col>
              </v-row>

              <v-slider
                v-model="qty"
                :step="1"
                max="50"
                min="1"
                track-color="grey"
                color="blue"
              >
                <template v-slot:prepend>
                  <v-btn
                    color="blue"
                    icon="mdi-minus"
                    variant="text"
                    :disabled="qty <= 1"
                    @click="decrement"
                  ></v-btn>
                </template>

                <template v-slot:append>
                  <v-btn
                    color="blue"
                    icon="mdi-plus"
                    variant="text"
                    :disabled="qty >= 50"
                    @click="increment"
                  ></v-btn>
                </template>
              </v-slider>
            </v-card-text>
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="isOpenDialog = false"
                color="red"
                size="large"
                :disabled="isLoadingSave"
              >
                Cancel
              </v-btn>

              <v-btn
                @click="save(category, group)"
                size="large"
                color="green"
                :loading="isLoadingSave"
              >
                Save
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <v-dialog v-model="isOpenTotalDialog">
      <v-toolbar dense flat>
        <v-toolbar-title>
          <span class="text-subheading"> {{ category }} {{ group }}組 </span>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row> </v-row>
      </v-card-text>
    </v-dialog>

    <v-snackbar
      v-model="isOpenSnackbar"
      :timeout="5000"
      location="top"
      :color="colorSnackbar"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn variant="text" @click="isOpenSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      category: null,
      group: null,
      isLoadingSave: false,
      isLoadingGetQtyData: false,
      isOpenDialog: false,
      isLoading: false,
      groupedData: [],
      qtyGroupedData: {},
      qty: 1,
      isOpenSnackbar: false,
      message: null,
      colorSnackbar: null,
      isOpenTotalDialog: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async created() {
    await this.getMemberGroupedData();
    await this.getQtyData();
  },
  methods: {
    totalQty(category, group) {
      if (
        this.qtyGroupedData[category] &&
        this.qtyGroupedData[category][group]
      ) {
        return this.qtyGroupedData[category][group].totalQty;
      }

      return 0;
    },
    personalQty(category, group) {
      if (
        this.qtyGroupedData[category] &&
        this.qtyGroupedData[category][group]
      ) {
        return this.qtyGroupedData[category][group].members
          .filter((el) => el.name === this.user.name)
          .reduce((pre, curr) => {
            pre += curr.qty;
            return pre;
          }, 0);
      }
      return 0;
    },
    async getMemberGroupedData() {
      try {
        const {
          data: { groupedData },
        } = await axios.get(
          `http://${process.env.SERVER_HOST}/getMemberGroupedData`
        );
        this.groupedData = groupedData;
      } catch (error) {
        const {
          response: { data, status },
        } = error;
        this.isError = true;
        if (status === 400) {
          this.errorMessage = "姓名或手機輸入錯誤";
          this.isLoading = false;
          return;
        }
        this.isError = true;
        this.errorMessage = data;
      }
    },
    decrement() {
      if (this.qty > 1) {
        this.qty--;
      }
    },
    increment() {
      if (this.qty < 50) {
        this.qty++;
      }
    },
    async getQtyData() {
      this.isLoadingGetQtyData = true;
      try {
        const { data } = await axios.get(
          `http://${process.env.SERVER_HOST}/getQtyData`
        );
        this.qtyGroupedData = data.reduce((pre, curr) => {
          pre[curr._id] = curr.groups.reduce((pre2, curr2) => {
            pre2[curr2.group] = curr2;
            return pre2;
          }, {});
          return pre;
        }, {});
      } catch (error) {
        //
      }
      this.isLoadingGetQtyData = false;
    },

    async save(category, group) {
      this.isLoadingSave = true;
      try {
        const { name, phone } = this.user;

        await axios.post(`http://${process.env.SERVER_HOST}/addQty`, {
          name,
          phone,
          category,
          group,
          qty: this.qty,
        });
        await this.getQtyData();
        this.isOpenSnackbar = true;
        this.message = "送瓜成功！";
        this.colorSnackbar = "green";
        this.isOpenDialog = false;
      } catch (error) {
        let errorMessage = "";
        const { code, response } = error;
        if (code === "ERR_NETWORK") {
          errorMessage = "伺服器斷線，趕快聯絡！";
        } else if (response) {
          errorMessage = response.data;
        }

        this.isOpenSnackbar = true;
        this.message = errorMessage;
        this.colorSnackbar = "red";
      }
      this.isLoadingSave = false;
    },
  },
};
</script>

<style></style>
