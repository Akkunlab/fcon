<template>
  <v-sheet class="splash-screen">
    <v-container class="splash-screen-inner">

      <!-- メイン -->
      <v-main class="main">

        <!-- 画像 -->
        <v-row class="image">
          <v-col>
            <img class="splash-screen-img" src="/images/splash_screen.png" alt="Logo Image">
          </v-col>
        </v-row>

        <!-- タイトル -->
        <v-row class="title text-h6">
          <v-col>
            <p class="title-text">福島高専コンテスト</p>
          </v-col>
        </v-row>

        <!-- スタート -->
        <v-row class="tap-to-start">
          <v-col>
            <p class="tap-to-start-text font-weight-bold">TAP TO START</p>
          </v-col>
        </v-row>

      </v-main>

      <!-- 著作権表示 -->
      <v-row class="copyright">
        <v-col>
          <small class="copyright-text">&copy; 2023 Akkunlab</small>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<style lang="scss" scoped>

  /* 変数 */
  $background-color: #fff;
  $primary-color: #1B95D4;
  $secondary-color: #9C27B0;
  $text-color: #000;
  $text-color-light: #fff;

  /* スプラッシュ画面 */
  .splash-screen {
    width: 100%;
    height: 100%;
    inset: 0 auto auto 0; // top right bottom left
    cursor: pointer; // カーソルをポインターにする
    position: fixed;
    z-index: 10000;

    .splash-screen-inner {
      height: 100%;
      position: relative;
      text-align: center;
      color: $text-color;
      background: $background-color;

      // テキストの影
      .title-text, .copyright-text {
        text-shadow: 0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color;
      }

      // メイン
      .main {
        width: 100%;
        padding: 12px 0;
        inset: 50% auto auto 50%; // top right bottom left
        position: absolute;
        transform: translate(-50%, -50%);

        // 画像
        .image {
          z-index: 2;

          .splash-screen-img {
            width: 100%;
            opacity: 0;
            pointer-events: none; // 画像をクリックできないようにする
            animation: moveDown 6s ease forwards,
                       moveRight 6s 5.5s ease forwards,
                       moveLeft 6s 11s ease forwards,
                       moveScale 6s 16.5s ease forwards;
          }
        }
        
        // タイトル
        .title {
          position: relative;
          z-index: 1;
        }

        // スタート
        .tap-to-start {
          .tap-to-start-text {
            letter-spacing: 0.5em;
            color: $text-color-light;
            position: relative;
            display: inline-block;
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
            animation: blink 3s infinite; // 点滅

            &::after {
              content: '';
              inset: 0; // top right bottom left
              position: absolute;
              background: linear-gradient(to right, $primary-color, $secondary-color);
              opacity: 0.8;
              filter: blur(20px);
              transform: scaleX(1.2) scaleY(0.8);
              z-index: -1;
            }
          }
        }
      }

      // 著作権表示
      .copyright {
        inset: auto 0 0 0; // top right bottom left
        margin: auto;
        position: absolute;
      }
    }
  }

  /* アニメーション */

  // 点滅
  @keyframes blink {
    0% {
      opacity: 0.9;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.9;
    }
  }

  // 下に移動
  @keyframes moveDown {
    0%, 30% {
      opacity: 0;
      transform: scale(2) translateY(-30px);
      filter: brightness(250%) blur(5px);
    }
    30%, 70% {
      opacity: 1;
      transform: scale(2) translateY(30px);
      filter: brightness(100%) blur(0);
    }
    90%, 100% {
      opacity: 0;
      transform: scale(2) translateY(30px);
      filter: brightness(250%) blur(5px);
    }
  }

  // 右に移動
  @keyframes moveRight {
    0%, 30% {
      opacity: 0;
      transform: scale(2) translateX(-30px);
      filter: brightness(250%) blur(5px);
    }
    30%, 70% {
      opacity: 1;
      transform: scale(2) translateX(30px);
      filter: brightness(100%) blur(0);
    }
    90%, 100% {
      opacity: 0;
      transform: scale(2) translateX(30px);
      filter: brightness(250%) blur(5px);
    }
  }

  // 左に移動
  @keyframes moveLeft {
    0%, 30% {
      opacity: 0;
      transform: scale(2) translateX(30px);
      filter: brightness(250%) blur(5px);
    }
    30%, 70% {
      opacity: 1;
      transform: scale(2) translateX(-30px);
      filter: brightness(100%) blur(0);
    }
    90%, 100% {
      opacity: 0;
      transform: scale(2) translateX(-30px);
      filter: brightness(250%) blur(5px);
    }
  }
  
  // 大きさ縮小
  @keyframes moveScale {
    0%, 30% {
      opacity: 0;
      transform: scale(1.3);
      filter: brightness(250%) blur(5px);
    }
    30%, 100% {
      opacity: 1;
      transform: scale(1);
      filter: brightness(100%) blur(0);
    }
  }
</style>