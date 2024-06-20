<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
    <v-row justify="center" dense>
      <v-col cols="12" class="text-center">
        <h5>送瓜給您心目中的冠軍隊伍！</h5>
        <h5>將於賽後進行份瓜</h5>
        <h5>如冠軍無人送瓜則瓜瓜直至下期夏至盃！</h5>
        <h5>1瓜 = 50$</h5>
      </v-col>
      <v-col cols="12" lg="7" class="text-right mb-n1 mt-n6">
        <v-btn
          variant="text"
          color="cyan"
          :loading="isLoadingGetQtyData"
          @click="refresh()"
        >
          <v-icon>mdi-sync</v-icon>
          更新資料
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-row dense justify="center">
          <v-col cols="6" lg="3">
            <v-card elevation="4">
              <v-card-title class="bg-blue-lighten-1 mb-n2 mt-n2">
                <v-row>
                  <v-col> 幼幼班 </v-col>
                </v-row>
              </v-card-title>
              <v-list density="compact" class="mb-n5">
                <v-list-item color="blue">
                  <!-- <template v-slot:prepend> 總瓜量 </template> -->

                  <v-list-item-title>
                    <v-row dense>
                      <v-col> 總瓜量： {{ qtyOne }} </v-col>
                    </v-row>
                  </v-list-item-title>
                  <v-list-item-title>冠軍： --</v-list-item-title>
                </v-list-item>
              </v-list>
              <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="amber-darken-1"
                  size="small"
                  variant="tonal"
                  @click="
                    (isOpenInfoDialog = true),
                      (category = '幼幼班'),
                      (panel = [])
                  "
                >
                  <v-icon> mdi-information-outline </v-icon>
                  更多資訊
                </v-btn>
              </template>
            </v-card>
          </v-col>
          <v-col cols="6" lg="3">
            <v-card elevation="4">
              <v-card-title class="bg-blue-lighten-1 mb-n2 mt-n2">
                大班
              </v-card-title>
              <v-list density="compact" class="mb-n5">
                <v-list-item color="blue">
                  <v-list-item-title>總瓜量： {{ qtyTwo }}</v-list-item-title>
                  <v-list-item-title>冠軍： --</v-list-item-title>
                </v-list-item>
              </v-list>
              <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="amber-darken-1"
                  size="small"
                  variant="tonal"
                  @click="
                    (isOpenInfoDialog = true), (category = '大班'), (panel = [])
                  "
                >
                  <v-icon> mdi-information-outline </v-icon>
                  更多資訊
                </v-btn>
              </template>
            </v-card>
          </v-col>
        </v-row>
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
                  收到的瓜：{{ totalQty(data._id, subData.group) }}
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
                  color="green"
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
                取消
              </v-btn>

              <v-btn
                @click="isOpenConfirmDialog = true"
                size="large"
                color="green"
                :loading="isLoadingSave"
              >
                送出
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <v-dialog v-model="isOpenConfirmDialog">
      <v-row justify="center">
        <v-col col="12" lg="3">
          <v-card>
            <v-card-text class="text-center text-h5">
              是否確認送出！
            </v-card-text>
            <template v-slot:actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" @click="isOpenConfirmDialog = false">
                先不要
              </v-btn>
              <v-btn
                color="green-darken-1"
                @click="save(category, group), (isOpenConfirmDialog = false)"
              >
                確認
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

    <v-dialog v-model="isOpenInfoDialog" scrollable width="auto">
      <template v-slot:default="{ isActive }">
        <v-row justify="center">
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title
                class="bg-amber d-flex justify-space-between align-center"
              >
                <div class="text-white text-h5 ps-2">
                  {{ `${category}` }}
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  color="white"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <apexchart
                      height="200"
                      type="pie"
                      :options="
                        category === '幼幼班'
                          ? chartOptionsOne
                          : chartOptionsTwo
                      "
                      :series="category === '幼幼班' ? seriesOne : seriesTwo"
                    ></apexchart>
                  </v-col>
                  <v-col>
                    <h3>
                      總瓜量： {{ category === "幼幼班" ? qtyOne : qtyTwo }}
                    </h3>
                    <h5 class="text-grey">此顯示獎金為猜對冠軍將獲得的獎金</h5>
                    <h5 class="text-grey">
                      公式：總瓜量 × 50 × (個人該組投資瓜量 ÷ 該組總瓜量)
                    </h5>
                  </v-col>
                  <v-col
                    cols="12"
                    style="max-height: calc(100vh - 430px); overflow: auto"
                  >
                    <v-expansion-panels v-model="panel" multiple>
                      <v-expansion-panel
                        v-for="(team, index) of ['A', 'B', 'C', 'D', 'E', 'F']"
                        :key="category + team"
                        :value="team"
                      >
                        <v-expansion-panel-title>
                          <v-row dense>
                            <v-col cols="10">
                              <h2 >
                                {{ team }}
                                <v-chip
                                  v-for="el of groupedData[
                                    category === '幼幼班' ? 1 : 0
                                  ].groups[index].members"
                                  :key="el.name"
                                  label
                                  size="small"
                                  :color="colors[index]"
                                  class="mx-1"
                                  >{{ el.name }}</v-chip
                                >
                              </h2>
                            </v-col>
                            <v-col class="text-right">
                              <v-chip label :color="colors[index]">
                                {{
                                  (this.qtyGroupedData[category] &&
                                    this.qtyGroupedData[category][team] &&
                                    this.qtyGroupedData[category][team]
                                      .totalQty) ||
                                  0
                                }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list lines="one">
                            <v-list-item
                              v-for="n of (this.qtyGroupedData[category] &&
                                this.qtyGroupedData[category][team] &&
                                this.qtyGroupedData[category][team].members) ||
                              []"
                              :key="n"
                            >
                              <v-list-item-title>
                                <v-row>
                                  <v-col>
                                    <h4
                                      :class="{
                                        'text-blue': n.name === user.name,
                                      }"
                                    >
                                      {{ n.name }}
                                      {{ n.name === user.name ? `(You)` : "" }}
                                    </h4>
                                  </v-col>
                                  <v-col class="text-right mr-1">
                                    <v-chip :color="colors[index]" label>
                                      {{ n.qty }}
                                    </v-chip>
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <span> {{ expectWin(category, n) }}$ </span>

                                <v-tooltip open-on-click>
                                  <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props">
                                      mdi-information
                                    </v-icon>
                                  </template>
                                  {{ formula(category, n) }}
                                </v-tooltip>
                              </v-list-item-subtitle>
                              <v-divider class="my-1"></v-divider>
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#9C27B0",
      ],
      panel: [],
      seriesOne: [0, 0, 0, 0, 0, 0],
      seriesTwo: [0, 0, 0, 0, 0, 0],
      chartOptionsOne: {
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#9C27B0",
        ],
        chart: {
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        legend: {
          position: "bottom",
        },
        labels: ["A", "B", "C", "D", "E", "F"],
      },
      chartOptionsTwo: {
        colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
        chart: {
          width: "100%",
        },
        legend: {
          position: "bottom",
        },
        labels: ["A", "B", "C", "D", "E", "F"],
      },
      isOpenInfoDialog: false,
      qtyOne: 0,
      qtyTwo: 0,
      isOpenConfirmDialog: false,
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
    async refresh() {
      await this.getQtyData();
      await this.getMemberGroupedData();
    },
    expectWin(category, data) {
      const qtyTotal = category === "幼幼班" ? this.qtyOne : this.qtyTwo;
      const { qty, group } = data;
      const totalQty =
        (this.qtyGroupedData[category] &&
          this.qtyGroupedData[category][group] &&
          this.qtyGroupedData[category][group].totalQty) ||
        0;
      if (!totalQty) {
        return 0;
      }
      return Math.round((qty / totalQty) * qtyTotal * 50);
    },
    formula(category, data) {
      const qtyTotal = category === "幼幼班" ? this.qtyOne : this.qtyTwo;
      const { qty, group } = data;
      const totalQty =
        (this.qtyGroupedData[category] &&
          this.qtyGroupedData[category][group] &&
          this.qtyGroupedData[category][group].totalQty) ||
        0;
      if (!totalQty) {
        return 0;
      }
      return `${qtyTotal} × 50 × (${qty} ÷ ${totalQty}) = ${Math.round(
        (qty / totalQty) * qtyTotal * 50
      )} `;
    },
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
        console.log(groupedData);
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
        for (const [index, group] of ["A", "B", "C", "D"].entries()) {
          if (
            this.qtyGroupedData["幼幼班"] &&
            this.qtyGroupedData["幼幼班"][group]
          ) {
            this.seriesOne[index] =
              this.qtyGroupedData["幼幼班"][group].totalQty || 0;
          } else {
            this.seriesOne[index] = 0;
          }
        }
        for (const [index, group] of ["A", "B", "C", "D", "E"].entries()) {
          if (
            this.qtyGroupedData["大班"] &&
            this.qtyGroupedData["大班"][group]
          ) {
            this.seriesTwo[index] =
              this.qtyGroupedData["大班"][group].totalQty || 0;
          } else {
            this.seriesTwo[index] = 0;
          }
        }

        for (const subData of data) {
          if (subData._id === "幼幼班") {
            this.qtyOne = subData.groups.reduce((pre, curr) => {
              pre += curr.totalQty;
              return pre;
            }, 0);
          } else if (subData._id === "大班") {
            this.qtyTwo = subData.groups.reduce((pre, curr) => {
              pre += curr.totalQty;
              return pre;
            }, 0);
          }
        }
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
