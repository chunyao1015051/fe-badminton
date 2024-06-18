<template>
  <v-app class="bg">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
<style lang="sass" scoped>
.bg
  background-image: url('/src/assets/bg.gif')
  background-size: cover
</style>
