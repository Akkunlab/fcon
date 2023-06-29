<template>

  <!-- スプラッシュ画面 -->
  <SplashScreen />

  <!-- ホーム画面 -->
  <v-container class="home">

    <!-- タイトル -->
    <v-row class="title ma-1">
      <v-col>
        <p class="title-text">ホーム</p>
      </v-col>
    </v-row>

    <!-- ステータス -->
    <v-row class="status ma-1 mt-4">
      <v-col>
        <p class="status-text pl-8 pr-3">ポイント: 333</p>
      </v-col>
    </v-row>

    <!-- 背景 -->
    <v-row class="background">
      <v-sheet class="background-inner"></v-sheet>
    </v-row>

    <!-- ホームアクション -->
    <v-row class="home-action my-5 mx-0">
      <v-col cols="4" v-for="btn in btnList" :key="btn.name">
        <v-btn :id="btn.id" class="home-action-btn" :to="btn.url" @click.stop="handleBtnClick($event)">
          <div class="home-action-btn-inner">
            <v-icon class="home-action-btn-icon" size="32">{{ btn.icon }}</v-icon>
            <p>{{ btn.name }}</p>
          </div>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>

  <!-- ダイアログ -->
  <AppDialog ref="appDialogRef" />

</template>

<script setup lang="ts">

  /* グローバル変数 */
  const appDialogRef = ref(); // ダイアログ

  // ホームボタンリスト
  const btnList = [
    {
      id: 'ranking',
      icon: 'mdi-crown',
      name: 'ランキング',
      url: '/ranking'
    }, {
      id: 'quest',
      icon: 'mdi-sword-cross',
      name: 'クエスト',
      url: undefined
    }, {
      id: 'menu',
      icon: 'mdi-menu',
      name: 'メニュー',
      url: undefined
    }
  ];

  /* ボタンをクリックしたとき */
  const handleBtnClick = (event: PointerEvent): void => {
    const target = event.currentTarget as Element; // カードの種類を判定

    if (target.id === 'menu') appDialogRef.value.dialog = true; // ダイアログを開く
  }
</script>

<style lang="scss" scoped>

  /* ホーム画面 */
  .home {
    width: 100%;
    height: 100%;
    inset: 0 auto auto 0; // top right bottom left
    text-align: center;
    position: fixed;

    // タイトル
    .title {
      inset: 0 auto auto 0; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .title-text {
        width: 82px;
      
        &::after {
          content: '';
          display: block;
          height: 1px;
          border-radius: 1px;
          background: $text-color-light;
        }
      }
    }

    // ステータス
    .status {
      inset: 0 0 auto auto; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .status-text {
        border-radius: $border-radius;
        backdrop-filter: blur($blur-size);
        background: $home-status-background-color;
      }
    }

    // 背景
    .background {
      inset: 0;
      margin: 0;
      position: absolute;
      z-index: -1;

      .background-inner {
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 200px 10px $home-background-color inset;
        background: url('images/background.jpg') no-repeat center center / cover;
      }
    }
    
    // ホームアクション
    .home-action {
      inset: auto 0 0 0; // top right bottom left
      position: absolute;

      // ホームアクションボタン
      .home-action-btn {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        backdrop-filter: blur($blur-size);
        color: $text-color-light;
        position: relative;
        font-size: 0.7em;
        border: 1px solid $home-btn-border-color;
        background: $home-btn-background-color;
        box-shadow: 0px 0px 10px 1px $home-btn-shadow-color inset;
        text-shadow: 0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color;

        .home-action-btn-icon {
          margin-top: -5px;
        }
      }

      // 2番目のボタン
      div:nth-child(2) {

        .home-action-btn {
          transform: scale(1.3);
          margin-top: -11px;
        }
      }
    }
  }
</style>
