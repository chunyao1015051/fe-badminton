<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center mt-5">
        <v-img src="/src/assets/title.gif" width="350" inline />
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col sm="12" lg="6">
            <v-text-field
              v-model="name"
              label="姓名(公司常用名)"
              variant="outlined"
              bg-color="white"
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col sm="12" lg="6">
            <v-text-field
              v-model="phone"
              label="手機"
              variant="outlined"
              bg-color="white"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col sm="12" lg="6">
            <v-radio-group inline label="賽制" v-model="category">
              <!-- <v-radio label="幼幼班" value="幼幼班"></v-radio>
              <v-radio label="大班" value="大班"></v-radio> -->
              <v-radio label="只吃瓜看比賽" value="吃瓜"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col cols="12">
        <v-row justify="center">
          <v-col sm="12" lg="6">
            <v-radio-group inline label="自備羽球拍" v-model="isBringingRacket">
              <v-radio label="是" value="是"></v-radio>
              <v-radio label="否" value="否"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col> -->
      <v-col cols="12">
        <v-row justify="center">
          <v-col sm="12" lg="6">
            <v-btn
              block
              :color="!name || !phone || !category ? '' : 'green'"
              :disabled="!name || !phone || !category"
              :loading="isLoading"
              @click="register"
              >報名</v-btn
            >
            <h4 class="text-center pt-2">
              報名後請等待6/19(三)抽籤完畢後將開放賽制與吃瓜功能。
            </h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="isError" :timeout="5000" location="top">
      {{ errorMessage }}

      <template v-slot:actions>
        <v-btn
          v-if="errorMessage === '此姓名已報名，請登入'"
          color="blue"
          @click="$router.push('/login')"
        >
          登入
        </v-btn>
        <v-btn v-else color="pink" variant="text" @click="isError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isError: false,
      errorMessage: null,
      isLoading: false,
      name: null,
      phone: null,
      category: "吃瓜",
      isBringingRacket: null,
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      try {
        const { data } = await axios.post(
          `http://${process.env.SERVER_HOST}/register`,
          {
            name: this.name,
            phone: this.phone,
            category: this.category,
            isBringingRacket: this.isBringingRacket,
            score: 0,
            group: "A",
          }
        );
        if (data === "User registered") {
          const {
            data: { token },
          } = await axios.post(`http://${process.env.SERVER_HOST}/login`, {
            name: this.name,
            phone: this.phone,
          });
          window.localStorage.setItem("token", token);
          await this.$router.push("/");
        }
      } catch (error) {
        let errorMessage = "";
        const { code, response } = error;
        if (code === "ERR_NETWORK") {
          errorMessage = "伺服器斷線，趕快聯絡！";
        } else if (response) {
          errorMessage = response.data;
        }
        this.isError = true;
        this.errorMessage = errorMessage;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
