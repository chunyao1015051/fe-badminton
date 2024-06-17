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
  background-repeat: repeat-y
  background-attachment: fixed
  margin: 0
  padding: 0
  display: flex
  height: 100vh
  width: 100vw
</style>
