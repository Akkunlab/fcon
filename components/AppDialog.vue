<template>
  <v-dialog v-model="dialog">
    <v-card class="dialog-card pa-2">

      <!-- 閉じるボタン -->
      <v-btn class="dialog-close ma-2" icon="mdi-close" variant="text" @click.stop="dialog = false"></v-btn>

      <!-- タイトル -->
      <v-card-title class="pt-4">メニュー</v-card-title>

      <!-- メニュー -->
      <v-card-text class="pa-4">

        <!-- ユーザー -->
        <div class="text-center">
          <v-avatar size="64" color="surface-variant"></v-avatar>
          <p class="text-h6 mt-2">Name</p>
        </div>
        
        <!-- 区切り線 -->
        <v-divider class="my-2"></v-divider>

        <!-- メニュリスト -->
        <v-list class="dialog-menu">
          <v-list-item class="dialog-menu-item my-2" v-for="(item, i) in menuList" :key="i" :value="item" rounded="xl">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>

      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

  /* グローバル変数 */
  const dialog = useState('dialog', () => false); // ダイアログの状態

  // メニューリスト
  const menuList = [
    { icon: 'mdi-account', text: 'プロフィール', value: 'profile' },
    { icon: 'mdi-cog', text: '設定', value: 'setting' }
  ];

  // 公開情報
  defineExpose({ dialog });
</script>

<style lang="scss" scoped>

  /* 変数 */
  $background-color: #fff;
  $primary-color: #1B95D4;
  $secondary-color: #9C27B0;
  $secondary-color-light: #dd92ea;
  $text-color: #000;
  $text-color-light: #fff;
  $shadow-color: rgba(0, 0, 0, 0.2);

  /* ダイアログ */
  .dialog-card {
    color: $text-color-light;
    backdrop-filter: blur(3px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(17, 17, 17, 0.8);
    position: relative;
    border-radius: 15px !important;

    // 閉じるボタン
    .dialog-close {
      inset: 0 0 auto auto; // top right bottom left
      position: absolute;
    }

    // メニュー
    .dialog-menu {
      background: transparent;

      // メニュー項目
      .dialog-menu-item {
        color: $text-color-light;
        background: rgba(33, 33, 33, 0.9);
        border: 2px solid rgba(89, 107, 121, 0.8);
      }
    }
  }
</style>
