<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-row justify="center">
        <v-col class="text-center mt-5">
          <v-img src="/src/assets/title.gif" width="350" inline />
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
          <v-btn
            block
            :color="!name || !phone ? '' : 'blue'"
            :disabled="!name || !phone"
            :loading="isLoading"
            type="submit"
            >Login</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar v-model="isError" :timeout="5000" location="top">
      {{ errorMessage }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="isError = false">
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
    };
  },
  beforeRouteEnter(_to, _from, next) {
    next(async (vm) => {
      if (window.localStorage.getItem("token")) {
        vm.$router.push("/");
      }
    });
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const { data } = await axios.post(
          `http://${process.env.SERVER_HOST}/login`,
          {
            name: this.name,
            phone: this.phone,
          }
        );
        window.localStorage.setItem("token", data.token);
        this.$router.push("/");
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

      this.isLoading = false;
    },
  },
};
</script>

<style></style>
