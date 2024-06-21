<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
    <v-row justify="center" dense>
      <v-col v-if="['James', 'Mega', 'Olivia'].includes(user.name)" class="text-center">
        <v-btn class="mr-7" color="blue" @click="isDialog = true">輸入比賽結果</v-btn>
        <v-btn color="red-accent-2" @click="isStatusDialog = true">更新賽事狀態</v-btn>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">比賽順序於當日由各選手抽籤決定</h3>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">目前比賽</h3>
        <h1 class="text-center">
          {{ nowLeft }}
          <v-icon class="mt-n1" icon="mdi-arrow-left-right-bold"></v-icon>{{ nowRight }}
        </h1>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">請選手們移至比賽場地</h3>
        <h3 class="text-center">下一組 {{ nextLeft }} vs {{ nextRight }} 選手預備</h3>
      </v-col>
      <v-col cols="12" class="text-center" style="position: relative; top: 96px; margin-top: -90px">
        <svg width="100" height="100" style="enable-background: new 0 0 128 128" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle class="st0" cx="64" cy="64" r="60" />
          <circle class="st1" cx="64" cy="64" r="50" />
          <path class="st8" d="M84,110H44V92c0-1.1,0.9-2,2-2h36c1.1,0,2,0.9,2,2V110z" />
          <polygon class="st9" points="87,113 41,113 42,110 86,110 " />
          <path class="st23" d="M72,106H56c-2.2,0-4-1.8-4-4v-3c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v3C76,104.2,74.2,106,72,106z" />
          <rect class="st16" height="16.5" width="10.5" x="58.8" y="68.5" />
          <rect class="st24" height="16.5" width="3" x="66.2" y="68.5" />
          <path class="st14" d="M73,84H55c-3.3,0-6,2.7-6,6v0h30v0C79,86.7,76.3,84,73,84z" />
          <path class="st15" d="M73,84h-5c3.3,0,6,2.7,6,6h5C79,86.7,76.3,84,73,84z" />
          <path class="st14" d="M69.1,77H58.9c-2.7,0-4.9-2.2-4.9-4.9V71h20v1.1C74,74.8,71.8,77,69.1,77z" />
          <path class="st15" d="M70,71v1.1c0,2.7-1.2,4.9-3.9,4.9h3c2.7,0,4.9-2.2,4.9-4.9V71H70z" />
          <path class="st16" d="M81,90H47l0,0c0-1.1,0.9-2,2-2h30C80.1,88,81,88.9,81,90L81,90z" />
          <path class="st24" d="M79,88h-5c1.1,0,2,0.9,2,2h5C81,88.9,80.1,88,79,88z" />
          <path class="st16" d="M76,69H52v3c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V69z" />
          <path class="st16" d="M76,69H52v3c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V69z" />
          <path class="st24" d="M71,69l-2,3c1,0,1.1,2,0,2h5c1.1,0,2-0.9,2-2v-3H71z" />
          <path class="st28" d="M78,37h19v1c0,10.5-8.5,19-19,19h0" />
          <path class="st29" d="M50,37H31v1c0,10.5,8.5,19,19,19h0" />
          <path class="st14" d="M72.5,72h-17C49.1,72,44,66.9,44,60.5V29h40v31.5C84,66.9,78.9,72,72.5,72z" />
          <path class="st10" d="M50,32c0,0,0,17,0,20" />
          <path class="st15" d="M79,29v31.5C79,66.9,73.9,72,67.5,72h5C78.9,72,84,66.9,84,60.5V29H79z" />
          <polygon class="st16" points="87,29 41,29 44,32 84,32 " />
          <polygon class="st24" points="81,29 79,32 84,32 87,29 " />
          <path class="st14" d="M88,25H40c-1.1,0-2,0.9-2,2v0c0,1.1,0.9,2,2,2h48c1.1,0,2-0.9,2-2v0C90,25.9,89.1,25,88,25z" />
          <path class="st15" d="M88,25h-6c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2h6c1.1,0,2-0.9,2-2C90,25.9,89.1,25,88,25z" />
          <line class="st10" x1="50" x2="50" y1="56.4" y2="58.7" />
          <path class="st23"
            d="M48.9,21.4l0.6-1.5c0.2-0.4,0.8-0.4,0.9,0l0.6,1.5c0.5,1.2,1.4,2.1,2.6,2.6l1.5,0.6c0.4,0.2,0.4,0.8,0,0.9  l-1.5,0.6c-1.2,0.5-2.1,1.4-2.6,2.6l-0.6,1.5c-0.2,0.4-0.8,0.4-0.9,0l-0.6-1.5c-0.5-1.2-1.4-2.1-2.6-2.6l-1.5-0.6  c-0.4-0.2-0.4-0.8,0-0.9l1.5-0.6C47.5,23.5,48.5,22.5,48.9,21.4z" />
          <path class="st15"
            d="M64,54.5l4.3,2.3c0.6,0.3,1.4-0.2,1.3-0.9L68.7,51l3.5-3.4c0.5-0.5,0.2-1.4-0.5-1.5l-4.8-0.7l-2.2-4.4  c-0.3-0.6-1.2-0.6-1.5,0l-2.2,4.4l-4.8,0.7c-0.7,0.1-1,1-0.5,1.5l3.5,3.4l-0.8,4.8c-0.1,0.7,0.6,1.2,1.3,0.9L64,54.5z" />
        </svg>
      </v-col>
      <v-col cols="12" class="text-center mt-3">
        <svg width="330" height="280" viewBox="50 0 300 300">
          <!-- 上方圓形 -->

          <!-- 左側三角形 -->
          <polygon points="100,150 150,250 50,250" stroke="black" stroke-width="2" fill="transparent" />
          <text x="85" y="145" font-family="Verdana" font-size="20" fill="black">A</text>
          <text x="30" y="260" font-family="Verdana" font-size="20" fill="black">B</text>
          <text x="155" y="260" font-family="Verdana" font-size="20" fill="black">C</text>

          <!-- 右側三角形 -->
          <polygon points="300,150 350,250 250,250" stroke="black" stroke-width="2" fill="transparent" />
          <text x="300" y="145" font-family="Verdana" font-size="20" fill="black">D</text>
          <text x="230" y="260" font-family="Verdana" font-size="20" fill="black">E</text>
          <text x="355" y="260" font-family="Verdana" font-size="20" fill="black">F</text>

          <!-- 連接圓形與三角形的線 -->
          <line x1="200" y1="70" x2="100" y2="150" stroke="black" stroke-width="2" />
          <line x1="200" y1="70" x2="300" y2="150" stroke="black" stroke-width="2" />
        </svg>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row>
          <v-col>
            <h2>積分表</h2>
          </v-col>
          <v-col class="text-right">
            <v-btn variant="text" color="cyan" :loading="isLoadingGetQtyData" @click="refresh()">
              <v-icon>mdi-sync</v-icon>更新資料
            </v-btn>
          </v-col>
        </v-row>

        <v-table fixed-header density="compact" class="elevation-3 rounded-lg">
          <thead>
            <tr>
              <th class="text-left">組別</th>
              <th class="text-left">勝</th>
              <th class="text-left">敗</th>
              <th class="text-left">積分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in scoreList" :key="data.name">
              <td>{{ data.group }}</td>
              <td>{{ data.win }}</td>
              <td>{{ data.lose }}</td>
              <td>{{ data.scores }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12" lg="6">
        <h2>賽程表</h2>
        <v-table fixed-header density="compact" class="elevation-3 rounded-lg">
          <thead>
            <tr>
              <th class="text-left">比賽</th>
              <th class="text-left">結果</th>
              <th class="text-left">勝者</th>
              <th class="text-left">敗者</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in contentList" :key="data.name">
              <td>{{ `${data.group_one} vs ${data.group_two}` }}</td>
              <td>{{ `${data.group_one_scores} - ${data.group_two_scores}` }}</td>
              <td>
                {{
                  (data.group_one_scores &&
                    data.group_two_scores &&
                    (data.group_one_scores > data.group_two_scores
                      ? data.group_one
                      : data.group_two)) ||
                  ""
                }}
              </td>
              <td>
                {{
                  (data.group_one_scores &&
                    data.group_two_scores &&
                    (data.group_one_scores > data.group_two_scores
                      ? data.group_two
                      : data.group_one)) ||
                  ""
                }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-dialog v-model="isDialog">
      <template v-slot:default="{ isActive }">
        <v-row justify="center">
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title class="bg-blue text-white d-flex justify-space-between align-center">
                輸入比賽結果
                <v-btn icon="mdi-close" variant="text" color="white" @click="isActive.value = false"></v-btn>
              </v-card-title>
              <v-card-text>
                <v-row class="mt-3">
                  <v-col cols="6">
                    <v-select v-model="group_one" label="隊伍1" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !group_two ||
                        (group_two && el.charCodeAt(0) < group_two.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-number-input v-model="group_one_scores" :reverse="false" control-variant="stacked" label="隊伍1分數" :hideInput="false" inset :min="0"></v-number-input>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="group_two" label="隊伍2" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !group_one ||
                        (group_one && el.charCodeAt(0) > group_one.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-number-input v-model="group_two_scores" :reverse="false" control-variant="stacked" label="隊伍1分數" :hideInput="false" inset :min="0"></v-number-input>
                  </v-col>
                  <v-col col="12">
                    <v-btn variant="tonal" color="green" block :disabled="!group_one || !group_two || !group_one_scores || !group_two_scores
                      " @click="updateScores()">送出</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-dialog>


    <v-dialog v-model="isStatusDialog">
      <template v-slot:default="{ isActive }">
        <v-row justify="center">
          <v-col cols="12" lg="6">
            <v-card>
              <v-card-title class="bg-blue text-white d-flex justify-space-between align-center">
                更新賽事狀態
                <v-btn icon="mdi-close" variant="text" color="white" @click="isActive.value = false"></v-btn>
              </v-card-title>
              <v-card-text>
                <v-row dense class="mt-3">
                  <v-col cols="12">
                    <h2>現在</h2>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="nowLeft" label="隊伍_左" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !nowRight ||
                        (nowRight && el.charCodeAt(0) < nowRight.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="nowRight" label="隊伍_右" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !nowLeft ||
                        (nowLeft && el.charCodeAt(0) > nowLeft.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col cols="12">
                    <h2>
                      下一場
                    </h2>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="nextLeft" label="隊伍_左" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !nextRight ||
                        (nextRight && el.charCodeAt(0) < nextRight.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="nextRight" label="隊伍_右" :items="['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !nextLeft ||
                        (nextLeft && el.charCodeAt(0) > nextLeft.charCodeAt(0))
                    )
                      "></v-select>
                  </v-col>
                  <v-col col="12">
                    <v-btn variant="tonal" color="green" block :disabled="!nowLeft || !nowRight || !nextLeft || !nextRight
                      " @click="updateSatus()">送出</v-btn>
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

export default {
  data() {
    return {
      group_one: null,
      group_two: null,
      group_one_scores: null,
      group_two_scores: null,
      isDialog: false,
      isStatusDialog: false,
      nowLeft: null,
      nowRight: null,
      nextLeft: null,
      nextRight: null,
      isLoadingGetQtyData: false,
      scoreList: [],
      contentList: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async created() {
    await this.refresh();
  },

  methods: {
    async refresh() {
      this.isLoadingGetQtyData = true;
      try {
        await this.getScores();
        await this.getStandings();
        await this.getStatus();
      } catch (error) {
        //
      }

      this.isLoadingGetQtyData = false;
    },
    async getScores() {
      const { data } = await axios.get(
        `http://${process.env.SERVER_HOST}/getScores/大班`
      );
      this.contentList = await data;
    },
    async getStatus() {
      const { data } = await axios.get(
        `http://${process.env.SERVER_HOST}/getStatus/大班`
      );
      const { nowLeft,
        nowRight,
        nextLeft,
        nextRight } = await data
      this.nowLeft = nowLeft
      this.nowRight = nowRight
      this.nextLeft = nextLeft
      this.nextRight = nextRight
    },
    async getStandings() {
      const { data } = await axios.get(
        `http://${process.env.SERVER_HOST}/getStandings/大班`
      );
      this.scoreList = await data;
    },
    async updateScores() {
      if (!confirm("是否確認?")) {
        return;
      }
      try {
        await axios.post(`http://${process.env.SERVER_HOST}/updateScores/大班`, {
          group_one: this.group_one,
          group_two: this.group_two,
          group_one_scores: this.group_one_scores,
          group_two_scores: this.group_two_scores,
        });
        this.isDialog = false;
        await this.refresh();
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
    },
    async updateSatus() {
      console.log(123);
      if (!confirm("是否確認?")) {
        return;
      }
      try {
        await axios.post(`http://${process.env.SERVER_HOST}/updateStatus/大班`, {
          nowLeft: this.nowLeft,
          nowRight: this.nowRight,
          nextLeft: this.nextLeft,
          nextRight: this.nextRight,
        });
        this.isStatusDialog = false;
        await this.refresh();
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
    },
  },
};
</script>

<style type="text/css">
.st0 {
  fill: #382673;
}

.st1 {
  fill: #473080;
}

.st2 {
  fill: #007bc6;
}

.st3 {
  fill: #d44a90;
}

.st4 {
  fill: #a72973;
}

.st5 {
  fill: #f15a9e;
}

.st6 {
  opacity: 0.4;
  fill: #0cafe8;
}

.st7 {
  opacity: 0.5;
  fill: #382673;
}

.st8 {
  fill: #0cafe8;
}

.st9 {
  fill: #0b90d3;
}

.st10 {
  opacity: 0.3;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st11 {
  fill: #8f58b2;
}

.st12 {
  fill: #6e4ca0;
}

.st13 {
  fill: #f375ad;
}

.st14 {
  fill: #ffde39;
}

.st15 {
  fill: #fec632;
}

.st16 {
  fill: #f9a74e;
}

.st17 {
  fill: #da6a2d;
}

.st18 {
  fill: #9edd9a;
}

.st19 {
  fill: #00c2a9;
}

.st20 {
  fill: #00a58c;
}

.st21 {
  fill: #037c68;
}

.st22 {
  fill: #9ac0db;
}

.st23 {
  fill: #ffffff;
}

.st24 {
  opacity: 0.2;
  fill: #382673;
}

.st25 {
  opacity: 0.4;
  fill: #473080;
}

.st26 {
  opacity: 0.1;
  fill: #382673;
}

.st27 {
  fill: none;
  stroke: #ffde39;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st28 {
  fill: none;
  stroke: #f9a74e;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st29 {
  fill: none;
  stroke: #fec632;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st30 {
  fill: none;
  stroke: #00a58c;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st31 {
  fill: none;
  stroke: #d44a90;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st32 {
  fill: none;
  stroke: #007bc6;
  stroke-width: 2.2439;
  stroke-miterlimit: 10;
}

.st33 {
  fill: none;
  stroke: #f15a9e;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st34 {
  opacity: 0.2;
  fill: none;
  stroke: #382673;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st35 {
  fill: none;
  stroke: #f15a9e;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st36 {
  fill: none;
  stroke: #f9a74e;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.st37 {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st38 {
  opacity: 0.4;
  fill: #382673;
}
</style>
