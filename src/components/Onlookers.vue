<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center">
        <h5>選擇您心目中的冠軍隊伍！</h5>
        <h5>吃瓜同時與冠軍一起分瓜～</h5>
        <h5>SLOGAN</h5>
        <h5>備註：如冠軍無人送瓜則瓜瓜直至下期夏至盃！</h5>
        <h5>1瓜 = 50</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="data of groupedData" :key="data._id" cols="12">
        <v-row>
          <v-col
            v-for="subData of data.groups"
            :key="data._id + subData.group"
            cols="12"
          >
            <v-row justify="space-between">
              <v-col cols="3">
                <v-card class="text-center" elevation="5">
                  <v-sheet>
                    {{ data._id }}
                  </v-sheet>
                  <v-sheet> {{ subData.group }}組 </v-sheet>
                </v-card>
              </v-col>
              <v-col>
                <v-sheet color="transparent">
                  組員：
                  <v-chip
                    v-for="member of subData.members"
                    :key="member.name"
                    label
                    color="blue"
                    density="compact"
                    class="mr-1"
                    >{{ member.name }}</v-chip
                  >
                </v-sheet>
                <v-sheet color="transparent"> 總瓜量： </v-sheet>
                <v-sheet color="transparent"> 您已下訂瓜量： </v-sheet>
                <v-sheet color="transparent"> 目前排名： </v-sheet>
              </v-col>
              <v-col cols="3">
                <v-btn color="blue" block>送瓜</v-btn>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isError: false,
      isLoading: false,
      errorMessage: null,
      groupedData: [],
    };
  },
  async created() {
    await this.getMemberGroupedData();
  },
  methods: {
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
  },
};
</script>

<style></style>
