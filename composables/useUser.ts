import FingerprintJS from '@fingerprintjs/fingerprintjs';

/* ユーザ情報 */

// ユーザ情報の型定義
interface User {
  id: string;
  name: string;
  mail: string;
}

// データの型
interface Data {
  value: {
    result: string;
    login: string;
  };
}

// Cookie
const loginIdCookie = useCookie('loginId'); // login idを管理するCookie
const isLoggedInCookie = useCookie('isLoggedIn'); // ログイン状態を管理するCookie

/* Fingerprint */
const getVisitorId = async (): Promise<string> => {
  const fpPromise = FingerprintJS.load(); // 初期化
  const fp = await fpPromise;
  const result = await fp.get();

  return result.visitorId;
};

export const useUser = () => {

  // ユーザ情報を取得
  const user = useState<User>('user', () => {
    return {
      id: '012345',
      name: 'mamezou',
      mail: 'nuxt-developer@mamezou.com'
    }
  });

  // サインアップ
  const signup = async (name: string): Promise<void> => {
    try {

      const id = await getVisitorId(); // Visitor Idを取得

      // ユーザ登録API 呼び出し
      const { data }: { data: Data } = await useFetch('/api/users/', {
        method: 'POST',
        body: { id, name }
      });

      loginIdCookie.value = data.value.login; // Cookieにlogin idを保存

    } catch (error) {
      console.error(error);
    }
  }

  // ログイン処理
  const login = async (): Promise<void> => {
    try {

      const id = await getVisitorId(); // Visitor idを取得
      
      // ログインAPI 呼び出し
      const response: Response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ id, login: loginIdCookie.value })
      });

      // リクエストが失敗した場合はエラーをスロー
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      // Authorizationヘッダーの値を取得
      const headers: Headers = response.headers;
      const authorizationHeader: string | null = headers.get('Authorization');

      // Authorizationヘッダーが存在しない場合はエラーをスロー
      if (!authorizationHeader) throw new Error('Authorization header not found');

      // login idを抽出
      const loginId: string = authorizationHeader.split(' ')[1];

      loginIdCookie.value = loginId; // Cookieにlogin idを保存
      isLoggedInCookie.value = 'true'; // ログイン状態をtrueにする

      await navigateTo('/home'); // ホーム画面に遷移
    } catch (error) {
      console.error(error);
    }
  }

  // ログアウト処理
  const logout = (): void => {
    isLoggedInCookie.value = 'false'; // ログイン状態をfalseにする
  }

  // エクスポート
  return {
    user,
    signup,
    login,
    logout
  }
}
