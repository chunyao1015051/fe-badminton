<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="token">
    <v-tabs
      v-model="tab"
      mandatory
      grow
      bg-color="white"
      color="amber"
      mobile
      density="compact"
    >
      <v-tab :value="1">活動說明</v-tab>
      <v-tab :value="2">吃瓜民眾</v-tab>
      <v-tab :value="3">幼幼班賽制</v-tab>
      <v-tab :value="4">大班賽制</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <rules-description></rules-description>
      </v-tabs-window-item>

      <v-tabs-window-item :value="2">
        <onlookers></onlookers>
      </v-tabs-window-item>

      <v-tabs-window-item :value="3">
        <content-one></content-one>
      </v-tabs-window-item>

      <v-tabs-window-item :value="4">
        <content-two></content-two>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
  <welcome-view v-else></welcome-view>
</template>

<script>
import WelcomeView from "@/components/WelcomeView.vue";
import Onlookers from "@/components/Onlookers.vue";
import ContentOne from "@/components/ContentOne.vue";
import ContentTwo from "@/components/ContentTwo.vue";
export default {
  components: { WelcomeView, Onlookers, ContentOne, ContentTwo },
  data() {
    return {
      tab: 1,
    };
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
  },
};
</script>

<style></style>
