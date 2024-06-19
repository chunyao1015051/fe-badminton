<template>
  <v-app class="bg">
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition>
          <component v-if="!isServerDisconnected" :is="Component" />
        </v-fade-transition>
      </router-view>
      <template>
        <div class="text-center pa-4">
          <v-dialog v-model="isServerDisconnected" width="auto" persistent>
            <v-card
              max-width="400"
              prepend-icon="mdi-heart-broken"
              text="若看到這個訊息，請馬上連絡相關人員！"
              title="伺服器斷線惹"
            >
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isServerDisconnected: false,
    };
  },

  async created() {
    await this.connectTest();
    await this.getUserData();
  },
  methods: {
    async getUserData() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        this.$store.commit("setUserData", {});
        return;
      }

      const { data } = await axios.post(
        `http://${process.env.SERVER_HOST}/getUserData`,
        { token }
      );
      this.$store.commit("setUserData", data);
    },
    async connectTest() {
      try {
        await axios.get(`http://${process.env.SERVER_HOST}/connectTest`);
      } catch (error) {
        const { code } = error;
        if (code === "ERR_NETWORK") {
          this.isServerDisconnected = true;
        }
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.bg
  background-image: url('/src/assets/bg.gif')
  background-size: cover
</style>
