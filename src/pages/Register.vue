<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <h1 class="text-center">第一屆夏至盃</h1>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="姓名"
          variant="outlined"
          bg-color="white"
          autofocus
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="phone"
          label="手機"
          variant="outlined"
          bg-color="white"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-radio-group inline label="賽制" v-model="category">
          <v-radio label="幼幼班" value="幼幼班"></v-radio>
          <v-radio label="大班" value="大班"></v-radio>
          <v-radio label="只吃瓜看比賽" value="吃瓜"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-radio-group inline label="自備羽球拍" v-model="isBringingRacket">
          <v-radio label="是" value="是"></v-radio>
          <v-radio label="否" value="否"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          :color="
            !name || !phone || !category || !isBringingRacket ? '' : 'green'
          "
          :disabled="!name || !phone || !category || !isBringingRacket"
          :loading="isLoading"
          @click="register"
          >報名</v-btn
        >
        <h4 class="text-center pt-2 text-grey">報名後請自行登入</h4>
      </v-col>
    </v-row>

    <v-snackbar v-model="isError" :timeout="5000">
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
      category: null,
      isBringingRacket: null,
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      try {
        const { data } = await axios.post("http://127.0.0.1:3001/register", {
          name: this.name,
          phone: this.phone,
          category: this.category,
          isBringingRacket: this.isBringingRacket,
          score: 0,
          group: "A",
        });
        if (data === "User registered") {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        const {
          response: { data },
        } = error;
        this.isError = true;
        this.errorMessage = data;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
