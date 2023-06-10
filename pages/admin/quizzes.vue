<template>
  
  <!-- ナビゲーションバー -->
  <TheNav />

  <!-- トップバー -->
  <TheAppBar title="Quizzes" />

  <!-- メイン -->
  <v-main>
    <v-container style="background: rgba(255, 255, 255, 0.8); min-height: 100%;" fluid>
      <v-row>

        <!-- 統計カード -->
        <v-col cols="12" sm="6" lg="4">
          <v-card class="stat">
            <v-card-title class="text-h5 font-weight-bold pa-4">クイズの数</v-card-title>
            <v-card-text class="text-h3 font-weight-bold px-8">{{ quizzes?.length }}</v-card-text>
          </v-card>
        </v-col>

        <!-- 新規作成 -->
        <v-col cols="12" sm="6" md="4" lg="2">
          <v-card class="new" height="130" @click.stop="handleCardClick($event)">
            <v-card-title>
              <v-icon style="margin-left: -8px;">mdi-plus</v-icon>
              <span>New</span>
            </v-card-title>
          </v-card>
        </v-col>

      </v-row>

      <!-- クイズカード -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="2" v-for="(item, index) in quizzes" :key="item.title">
          <v-card :index="index" class="quiz-card" height="100" @click.stop="handleCardClick($event)">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>

  <!-- ダイアログ -->
  <v-dialog v-model="dialog" width="auto">
    <v-card class="pa-2" style="border-radius: 15px; background: #fff;">
      <v-form ref="form" @submit.prevent="handleSubmit">

        <v-card-title class="text-h5">新規クイズ作成</v-card-title>

        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="state.title" label="タイトル*" :rules="[requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="state.text" label="問題文*" :rules="[requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="state.answer" label="問題の答え*" :rules="[requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="state.difficulty"
                  label="難易度*"
                  :items="[1, 2, 3, 4, 5]"
                  :rules="[requiredValidation]"
                  required>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model="state.category"
                  label="カテゴリ*"
                  :items="['数学', '物理', '化学', '生物', '地学', '情報', '英語', '国語', '歴史', '地理', 'その他']"
                  :rules="[requiredValidation]"
                  multiple
                  required>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <p class="pa-3">*は必須フィールドです</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-bold" color="blue-darken-1" variant="text" type="submit">Save</v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">

  /* レイアウト設定 */
  definePageMeta({
    layout: 'admin'
  });

  /* Quizの型 */
  interface Quiz {
    title: string;
    text: string;
    answer: string;
    difficulty: number;
    category: string[];
    createdAt?: {
      seconds: number;
      nanoseconds: number;
    };
    updatedAt?: {
      seconds: number;
      nanoseconds: number;
    };
  }

  /* すべてのクイズを取得 */
  const { data: quizzes } = await useFetch<Quiz[]>('/api/quizzes');

  /* フォーム */
  const form = ref(); // フォームの参照

  // フォームの状態
  const state = reactive<Quiz>({
    title: '',
    text: '',
    answer: '',
    difficulty: 1,
    category: []
  });

  // バリデーション
  const requiredValidation = (value: any) => !!value || '必ず入力してください'; // 入力必須の制約

  // フォームの送信
  const handleSubmit = async () => {

    const validResult = await form.value.validate(); // バリデーションの結果を取得

      // バリデーションが通ったら
      if (validResult.valid) {

        // 新しいクイズを作成
        const { data } = await useFetch('/api/quizzes/', {
          method: 'POST',
          body: JSON.stringify(state)
        });

        quizzes.value?.push(JSON.parse(JSON.stringify(state))); // クイズを表示エリアに追加
        console.log(data.value); // ログ出力
        form.value.reset(); // フォームをリセット
        dialog.value = false; // ダイアログを閉じる
      }
  }
  
  /* ダイアログ */
  const dialog = useState('dialog', () => false); // ダイアログの状態

  // カードをクリックしたとき
  const handleCardClick = (event: PointerEvent): void => {
    const target = event.currentTarget as Element; // カードの種類を判定

    if (target.classList.contains('new')) { // 新規作成だったとき

      // クイズの情報をリセット
      state.title = ''; // タイトルをリセット
      state.text = ''; // 問題文をリセット
      state.answer = ''; // 答えをリセット
      state.difficulty = 1; // 難易度をリセット
      state.category = []; // カテゴリをリセット

    } else { // クイズカードだったとき

      // クイズカードのインデックスを取得
      const index: number = parseInt(target.getAttribute('index') || '-1', 10);

      if (index === -1) return; // インデックスが取得できなかったら終了
      if (quizzes.value === null) return; // クイズが存在しなかったら終了

      // クイズの情報をセット
      state.title = quizzes.value[index].title; // タイトルをセット
      state.text = quizzes.value[index].text; // 問題文をセット
      state.answer = quizzes.value[index].answer; // 答えをセット
      state.difficulty = quizzes.value[index].difficulty; // 難易度をセット
      state.category = quizzes.value[index].category; // カテゴリをセット
    }

    dialog.value = true; // ダイアログを開く
  }
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

  // 新規作成
  .new {
    color: rgba(55, 53, 47, 0.35);
    background: none;
    box-shadow: none;
    border: 2px dashed rgba(55, 53, 47, 0.35);

    .v-card-title {
      padding: 49px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
