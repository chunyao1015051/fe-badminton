<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row dense justify="center">
      <v-col class="text-center mt-5">
        <v-img src="/src/assets/title.gif" width="350" inline />
      </v-col>
      <v-col cols="12" class="mt-n6">
        <h2 class="text-center">時間：6/25(二) 18:00-20:00</h2>
      </v-col>
      <v-col cols="12"
        ><h2 class="text-center">地點：富暘羽球運動中心</h2></v-col
      >
      <v-col cols="12"
        ><h4 class="text-center">6/19(三)16:00報名截止</h4></v-col
      >
      <v-col cols="12"
        ><h4 class="text-center">6/19(三)18:00前公布抽籤分組結果</h4>
      </v-col>
      <v-col cols="12">
        <v-card color="#ffffff82" elevation="5">
          <v-card-title> 活動內容： </v-card-title>
          <v-card-text>
            1.活動當日下午有 Pizza
            與點心請同仁踴躍參加吃吃喝喝。17:30即可陸續前往活動地點，準備比賽。<br />
            2.羽球賽分為幼幼班雙打與大班雙打，各個組別冠金分別獲得獎金3000$<br />
            3.溫馨體醒，請同仁摸摸自己的良心(就算被啃了也要掏出來!)按能力報名幼幼班/大班組，嚴禁找打手!<br />
            4.沒有參加比賽的同仁有吃瓜活動可參與，吃瓜民眾可送瓜(1個瓜=50$)給心目中的冠軍，如猜中冠軍者依送瓜比例分瓜所有吃瓜獎金。<br />
            5.吃瓜活動：<br />
            • 活動說明:
            總瓜量=10個(500NT)，您送2個瓜(100$)給冠軍組，另一名吃瓜民眾送3個瓜(150$)給冠軍組，其餘5個瓜(250NT)皆送給非冠軍組。您即獲得4個瓜(200$)。<br />
            • 最後送瓜時間為冠軍總決賽前，買瓜費用將於賽後統計。請各位自行繳交給
            Amy
            或福委會並於吃瓜民眾繳交完畢後分瓜獎金。如該屆無人送瓜給冠軍，獎金累積至下屆夏至盃。
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-btn
          block
          class="mr-3"
          color="green"
          size="large"
          @click="$router.push('/register')"
          >報名</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn
          block
          class="mr-3"
          color="blue"
          size="large"
          @click="$router.push('/login')"
          >登入</v-btn
        >
      </v-col>
      <!-- <v-col cols="6">
        <v-btn block color="blue" @click="$router.push('/login')">登入</v-btn>
      </v-col> -->
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
