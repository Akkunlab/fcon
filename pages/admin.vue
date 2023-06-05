<template>
  
  <!-- ナビゲーションバー -->
  <v-navigation-drawer color="rgba(255, 255, 255, 0.5)" width="240" style="box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.2) inset;">

    <!-- タイトル -->
    <v-sheet class="pa-4 font-weight-bold" color="rgba(0, 0, 0, 0)">
      福島高専コンテスト
    </v-sheet>
    
    <!-- メニュー -->
    <v-list nav class="px-2">
      <v-list-item v-for="menu in menuList" :key="menu.text" link>
        <template v-slot:prepend>
          <v-icon>{{ menu.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-subtitle-1">{{ menu.text }}</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>

  <!-- トップバー -->
  <v-app-bar density="compact" color="rgba(255, 255, 255, 0.9)">
    <v-app-bar-title class="font-weight-bold">Quizzes</v-app-bar-title>
  </v-app-bar>

  <!-- メイン -->
  <v-main>
    <v-container fluid style="background: rgba(255, 255, 255, 0.8);">

      <!-- 統計カード -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card class="stat">
            <v-card-title class="text-h5 font-weight-bold pa-4">クイズの数</v-card-title>
            <v-card-text class="text-h3 font-weight-bold px-8">2</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- クイズカード -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="2" v-for="item in 200">
          <v-card height="100" style="">
            <v-card-title>Item {{ item }}</v-card-title>
            <v-card-text>Hello!</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>

</template>

<script setup lang="ts">

  /* レイアウト設定 */
  definePageMeta({
    layout: 'admin'
  });

  /* メニューリスト */
  const menuList = [
    { icon: 'mdi-home', text: 'Home' },
    { icon: 'mdi-help-circle', text: 'Quizzes' },
    { icon: 'mdi-account', text: 'Users' }
  ];
</script>

<style lang="scss" scoped>

  // カード
  .v-card {
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  }

  // 統計カード
  .stat {
    color: #fff;
    background: rgba(15, 106, 255, 0.8);
    background: linear-gradient(45deg, rgba(15, 106, 255, 0.8) 0%, rgba(88, 138, 254, 0.8) 100%);

    .v-card-text {
      line-height: 48px;
    }
  }
</style>
