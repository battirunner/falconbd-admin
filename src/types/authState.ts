// export type AuthState = {
//   userInfo: {};
// };

export interface AuthState {
  userInfo: null | {
    data: { id: string; email: string; name: string; role: string };
    token: string;
  };
}
