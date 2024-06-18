<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <div style="height: calc(20vh - 50px)"></div>
    <v-row dense justify="center">
      <v-col class="text-center">
        <v-img src="/src/assets/title.gif" width="600" inline />
      </v-col>
      <v-col cols="12">
        <h2 class="text-center">時間：6/25(二) 18:00-20:00</h2>
      </v-col>
      <v-col cols="12"
        ><h2 class="text-center">地點：富暘羽球運動中心</h2></v-col
      >
      <v-col cols="12" class="text-center"></v-col>
      <v-col cols="12" class="text-center"></v-col>
      <v-col cols="12" class="text-center"
        ><h4>羽球幼幼班競賽與羽球大班競賽</h4></v-col
      >
      <v-col cols="12" class="text-center"><h4>冠軍有獎金與獎牌!!</h4></v-col>
      <v-col cols="12" class="text-center"><h4>不想比賽的也沒問題!</h4></v-col>
      <v-col cols="12" class="text-center">
        <h4>有吃瓜活動，可瓜分獎金！靠你們認真吃瓜！</h4></v-col
      >
      <v-col cols="6">
        <v-btn
          block
          class="mr-3"
          color="green"
          @click="$router.push('/register')"
          >報名</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn block color="blue" @click="$router.push('/login')">登入</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
// .logo
//   position: absolute
//   top: 28%
//   left: 50%
//   width: 300px
//   transform: translateX(-50%)
</style>
