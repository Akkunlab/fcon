/* ============================================
No.10
Method: POST
URI: /api/login
Description: ユーザのログイン認証
============================================ */

import { db } from '../lib/firestore';
import { collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { randomBytes, createHash } from 'crypto';

/* レスポンス用のオブジェクトの型 */
interface ResponseObject {
  result: string;
}

export default defineEventHandler(async (event) => {

  try {
    let docId: string = ''; // ドキュメントID
    const body = await readBody(event); // リクエストボディを取得
    const result: ResponseObject = { result: 'Authentication failed' }; // レスポンス用のオブジェクト

    // idまたはloginが存在しない場合はエラーを返す
    if (!body.id || !body.login) throw createError({ statusCode: 400, statusMessage: 'Invalid id or login value' });

    // ユーザのドキュメントを取得
    const q = query(collection(db, 'users'), where('login', '==', body.login));
    const querySnapshot = await getDocs(q);

    // ドキュメントが存在しない場合
    if (querySnapshot.empty) throw createError({ statusCode: 401, statusMessage: 'Authentication failed' });
    
    // ドキュメントが存在する場合
    querySnapshot.forEach((docData) => {
      docId = docData.id; // ドキュメントIDを取得
      body.id = createHash('sha256').update(body.id + docData.data().salt).digest('hex'); // ハッシュ化

      // ログイン失敗
      if (docData.data().id !== body.id) throw createError({ statusCode: 401, statusMessage: 'Authentication failed' });
    });

    // ログイン成功
    const loginId = randomBytes(32).toString('hex'); // login idを生成
    const docRef = await updateDoc(doc(db, 'users', docId), { login: loginId }); // ドキュメントを更新
    
    event.node.res.setHeader('Authorization', `Bearer ${loginId}`); // login idをヘッダーにセット
    result.result = 'success';

    return result;
  } catch (error) {
    return error;
  }
})
