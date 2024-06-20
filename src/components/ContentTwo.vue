<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
    <v-row justify="center" dense>
      <v-col
        v-if="['James', 'Mega', 'Olivia'].includes(user.name)"
        class="text-center"
      >
        <v-btn color="blue" @click="isDialog = true"> 輸入比賽結果 </v-btn>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">比賽順序於當日由各選手抽籤決定</h3>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">目前比賽</h3>
        <h1 class="text-center">
          A
          <v-icon class="mt-n1" icon="mdi-arrow-left-right-bold"></v-icon>
          B
        </h1>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">請選手們移至比賽場地</h3>
        <h3 class="text-center">下一組 C vs D 選手預備</h3>
      </v-col>
      <v-col cols="12" class="text-center">
        <svg width="250" height="250" viewBox="-120 -120 250 250">
          <!-- 六邊形 -->
          <polygon
            points="100,0 50,86.6 -50,86.6 -100,0 -50,-86.6 50,-86.6"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />

          <!-- 對角線 -->
          <line
            x1="100"
            y1="0"
            x2="-100"
            y2="0"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="50"
            y1="86.6"
            x2="-50"
            y2="-86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="-50"
            y1="86.6"
            x2="50"
            y2="-86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="100"
            y1="0"
            x2="-50"
            y2="86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="100"
            y1="0"
            x2="-50"
            y2="-86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="50"
            y1="86.6"
            x2="-100"
            y2="0"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="-50"
            y1="86.6"
            x2="50"
            y2="-86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="-100"
            y1="0"
            x2="50"
            y2="86.6"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="-100"
            y1="0"
            x2="50"
            y2="-86.6"
            stroke="black"
            stroke-width="1"
          />

          <!-- 標示角 -->
          <text x="110" y="0" font-size="20" fill="black">D</text>
          <text x="55" y="96.6" font-size="20" fill="black">F</text>
          <text x="-65" y="96.6" font-size="20" fill="black">E</text>
          <text x="-120" y="0" font-size="20" fill="black">C</text>
          <text x="-65" y="-96.6" font-size="20" fill="black">A</text>
          <text x="55" y="-96.6" font-size="20" fill="black">B</text>
        </svg>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row>
          <v-col><h2>積分表</h2></v-col>
          <v-col class="text-right">
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
              <td>
                {{ `${data.group_one_scores} - ${data.group_two_scores}` }}
              </td>
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
        <v-card>
          <v-card-title
            class="bg-blue text-white d-flex justify-space-between align-center"
          >
            輸入比賽結果
            <v-btn
              icon="mdi-close"
              variant="text"
              color="white"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="group_one"
                  label="隊伍1"
                  :items="
                    ['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !group_two ||
                        (group_two &&
                          el.charCodeAt(0) < group_two.charCodeAt(0))
                    )
                  "
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-number-input
                  v-model="group_one_scores"
                  :reverse="false"
                  control-variant="stacked"
                  label="隊伍1分數"
                  :hideInput="false"
                  inset
                  :min="0"
                ></v-number-input>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="group_two"
                  label="隊伍2"
                  :items="
                    ['A', 'B', 'C', 'D', 'E', 'F'].filter(
                      (el) =>
                        !group_one ||
                        (group_one &&
                          el.charCodeAt(0) > group_one.charCodeAt(0))
                    )
                  "
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-number-input
                  v-model="group_two_scores"
                  :reverse="false"
                  control-variant="stacked"
                  label="隊伍1分數"
                  :hideInput="false"
                  inset
                  :min="0"
                ></v-number-input>
              </v-col>
              <v-col col="12">
                <v-btn
                  variant="tonal"
                  color="green"
                  block
                  :disabled="
                    !group_one ||
                    !group_two ||
                    !group_one_scores ||
                    !group_two_scores
                  "
                  @click="updateScores()"
                >
                  送出
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
    async getStandings() {
      const { data } = await axios.get(
        `http://${process.env.SERVER_HOST}/getStandings/大班`
      );
      this.scoreList = await data;
    },
    async updateScores() {
      try {
        await axios.post(
          `http://${process.env.SERVER_HOST}/updateScores/大班`,
          {
            group_one: this.group_one,
            group_two: this.group_two,
            group_one_scores: this.group_one_scores,
            group_two_scores: this.group_two_scores,
          }
        );
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
  },
};
</script>

<style></style>
