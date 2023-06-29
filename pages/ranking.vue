<template>

  <!-- ランキング画面 -->
  <v-container class="ranking">

    <!-- タイトル -->
    <v-row class="title">
      <v-col class="pa-0" style="display: flex;">
        <v-btn icon="mdi-arrow-left" variant="text" to="/home?ss=false"></v-btn>
        <p class="title-text text-center py-2 mx-2">ランキング</p>
      </v-col>
    </v-row>

    <!-- ランキングリスト -->
    <v-card class="ranking-card my-3">
      <v-card-text>
        <v-list class="ranking-list pa-0">
          <v-list-item class="ranking-item my-2" v-for="item in 100" height="50" rounded="xl">
            <v-container class="pa-0" style="display: flex; align-items: center;">
              <p class="text-body-1">1</p>
              <v-avatar size="32" color="surface-variant" class="mx-2"></v-avatar>
              <v-list-item-title class="text-body-1" v-text="33333333"></v-list-item-title>
              <p style="margin-left: auto; white-space: nowrap">10000 pt</p>
            </v-container>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">

  /* グローバル変数 */

  // ランキングリスト
  const rankingList = [
    { rank: 1, name: 'Akkunlab' }
  ];

  /* 高さを取得 */
  const setHeight = (): void => {
    let height = window.innerHeight - 82; // 82pxはタイトル、余白を合わせた高さ
    document.documentElement.style.setProperty('--vh', `${height}px`); // 高さを設定
  }

  setHeight(); // 初期化
  window.addEventListener('resize', setHeight); // リサイズ時に高さを設定
  window.addEventListener('orientationchange', setHeight); // 画面回転時に高さを設定
</script>

<style lang="scss" scoped>

  /* ランキング */
  .ranking {
    width: 100%;
    height: 100%;
    inset: 0 auto auto 0; // top right bottom left
    position: fixed;
    background: url('images/background.jpg') no-repeat center center / cover;

    // タイトル
    .title {
      display: inline-block;
      color: $text-color-light;

      .title-text {
        width: 100px;
      
        &::after {
          content: '';
          display: block;
          height: 1px;
          border-radius: 1px;
          background: $text-color-light;
        }
      }
    }

    // カード
    .ranking-card {
      height: var(--vh);
      backdrop-filter: blur($blur-size);
      border: 1px solid $dialog-border-color;
      background: $dialog-background-color;
      border-radius: $border-radius !important;
      overflow-y: scroll;
      animation: fadeIn $fade-time ease forwards; // フェードイン

      // ランキング
      .ranking-list {
        background: transparent;

        // ランキング項目
        .ranking-item {
          color: $text-color-light;
          background: $dialog-btn-background-color;
          box-shadow: 0 3px 3px $shadow-color;
        }
      }
    }
  }
</style>
