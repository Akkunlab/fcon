<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card class="pa-2" style="border-radius: 15px; background: #fff;">
      <v-form ref="form" @submit.prevent="handleSubmit">

        <v-card-title class="pt-4 text-h5" style="display: flex; align-items: center;">
          <span>{{ title }}</span>
          <v-btn
            v-if="index !== -1"
            class="mx-2"
            icon="mdi-delete"
            color="grey-darken-1"
            variant="text"
            @click.stop="deleteQuiz"
          >
          </v-btn>
        </v-card-title>

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

        <v-card-actions class="py-4">
          <v-spacer></v-spacer>
          <v-btn class="text-body-1 mx-2" variant="text" @click.stop="dialog = false">キャンセル</v-btn>
          <v-btn class="text-body-1 mx-2 px-8" color="blue-accent-3" variant="flat" type="submit">保存</v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { Quiz } from '@/types/quiz';

  /* Propsの型 */
  interface Props {
    title: string;
    quizzes: Quiz[] | null;
    index: number;
  }

  /* グローバル変数 */
  const props = defineProps<Props>(); // propsの初期化
  const dialog = useState('dialog', () => false); // ダイアログの状態
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

      props.quizzes?.push(JSON.parse(JSON.stringify(state))); // クイズを表示エリアに追加
      console.log(data.value); // ログ出力
      form.value.reset(); // フォームをリセット
      dialog.value = false; // ダイアログを閉じる
    }
  }

  // クイズの削除
  const deleteQuiz = async () => {

    if (props.quizzes === null) return; // クイズが存在しなかったら終了

    const id = props.quizzes[props.index].id; // クイズのIDを取得
    const { data } = await useFetch(`/api/quizzes/${id}`, { method: 'DELETE' }); // クイズを削除

    props.quizzes.splice(props.index, 1); // クイズを表示エリアから削除
    console.log(data.value); // ログ出力
    dialog.value = false; // ダイアログを閉じる
  }

  // フォームの状態を変更
  const changeState = (value?: Quiz): void => {

    if (value) {
      state.title = value.title; // タイトルをリセット
      state.text = value.text; // 問題文をリセット
      state.answer = value.answer; // 答えをリセット
      state.difficulty = value.difficulty; // 難易度をリセット
      state.category = value.category; // カテゴリをリセット
    } else {
      state.title = ''; // タイトルをセット
      state.text = ''; // 問題文をセット
      state.answer = ''; // 答えをセット
      state.difficulty = 1; // 難易度をセット
      state.category = []; // カテゴリをセット
    }
  }

  // 公開情報
  defineExpose({
    dialog,
    changeState
  });
</script>
