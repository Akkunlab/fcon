/* ============================================
No.7
Method: POST
URI: /api/users/
Description: 新しいユーザを作成
============================================ */

import { db } from '../../lib/firestore';
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event); // リクエストボディを取得

    body.createdAt = Timestamp.fromDate(new Date()); // 作成日時を追加
    body.lastSignedIn = Timestamp.fromDate(new Date()); // 最終ログイン日時を追加

    const docRef = await addDoc(collection(db, 'users'), body); // ユーザのコレクションにドキュメントを追加

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
