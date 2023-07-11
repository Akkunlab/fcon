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
          <p class="text-h6 mt-2">{{ user.name }}</p>
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
  const { user } = useUser(); // ユーザー情報
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

  /* ダイアログ */
  .dialog-card {
    color: $text-color-light;
    position: relative;
    backdrop-filter: blur($blur-size);
    border: 1px solid $dialog-border-color;
    background: $dialog-background-color;
    border-radius: $border-radius !important;

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
        background: $dialog-btn-background-color;
        border: 2px solid $dialog-btn-border-color;
      }
    }
  }
</style>
