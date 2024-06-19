<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="mt-5">
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
        <v-row justify="center">
          <v-col
            v-for="subData of data.groups"
            :key="data._id + subData.group"
            sm="12"
            lg="6"
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
                <v-sheet color="transparent"> 總瓜量： </v-sheet>
                <v-sheet color="transparent"> 您已下訂瓜量： </v-sheet>
                <v-sheet color="transparent"> 目前排名： </v-sheet>
              </v-col>
              <v-col>
                <v-btn color="blue" block @click="isOpenDialog = true">
                  送瓜
                </v-btn>
                <v-dialog v-model="isOpenDialog">
                  <v-card>
                    <v-toolbar dense flat>
                      <v-toolbar-title>
                        <span class="text-subheading">
                          {{ data._id }} {{ subData.group }}組
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
                        <!-- <v-col class="text-right">
                          <v-btn
                            elevation="0"
                            class="mt-2"
                            color="blue"
                            icon
                            @click="save"
                          >
                            <v-icon icon="mdi-send" size="large"></v-icon>
                          </v-btn>
                        </v-col> -->
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
                            @click="decrement"
                          ></v-btn>
                        </template>

                        <template v-slot:append>
                          <v-btn
                            color="blue"
                            icon="mdi-plus"
                            variant="text"
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
                      >
                        Cancel
                      </v-btn>

                      <v-btn @click="save" size="large" color="green">
                        Save
                      </v-btn>
                    </template>
                  </v-card>
                </v-dialog>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      isOpenDialog: false,
      isError: false,
      isLoading: false,
      errorMessage: null,
      groupedData: [],
      qty: 1,
    };
  },
  computed: {
    ...mapState(["user"]),
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
    decrement() {
      this.qty--;
    },
    increment() {
      this.qty++;
    },
    async save() {
      console.log(this.user, this.qty);
      console.log("save");
    },
  },
};
</script>

<style></style>
