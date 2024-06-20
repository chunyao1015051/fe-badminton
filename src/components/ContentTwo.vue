<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12">
        <h3 class="text-center">目前比賽</h3>
      </v-col>
      <v-col cols="12">
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
        <svg width="300" height="300" viewBox="40 20 220 220" class="mt-n6">
          <!-- 畫出正五邊形 -->
          <polygon
            points="150,50 238,115 208,210 92,210 62,115"
            style="fill: none; stroke: black; stroke-width: 2"
          />
          <!-- 畫出五邊形的對角線 -->
          <line
            x1="150"
            y1="50"
            x2="208"
            y2="210"
            style="stroke: black; stroke-width: 2"
          />
          <line
            x1="150"
            y1="50"
            x2="92"
            y2="210"
            style="stroke: black; stroke-width: 2"
          />
          <line
            x1="238"
            y1="115"
            x2="62"
            y2="115"
            style="stroke: black; stroke-width: 2"
          />
          <line
            x1="238"
            y1="115"
            x2="92"
            y2="210"
            style="stroke: black; stroke-width: 2"
          />
          <line
            x1="62"
            y1="115"
            x2="208"
            y2="210"
            style="stroke: black; stroke-width: 2"
          />
          <!-- 在五個頂點標記1到5 -->
          <text x="145" y="45" font-family="Arial" font-size="15">A</text>
          <text x="243" y="120" font-family="Arial" font-size="15">E</text>
          <text x="213" y="215" font-family="Arial" font-size="15">D</text>
          <text x="75" y="215" font-family="Arial" font-size="15">C</text>
          <text x="50" y="120" font-family="Arial" font-size="15">B</text>
        </svg>
      </v-col>
      <v-col cols="12" lg="6" class="mt-n9">
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
              <td>{{ data.result }}</td>
              <td>{{ data.winer }}</td>
              <td>{{ data.loser }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoadingGetQtyData: false,
      scoreList: [],
      contentList: [],
    };
  },

  async created() {
    await this.getScores();
    await this.getStandings();
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
  },
};
</script>

<style></style>
