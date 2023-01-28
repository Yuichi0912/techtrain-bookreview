import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogIn: cookie.get("token") !== undefined, // トークンが取得されている状態
  },
  reducers: {
    logIn: (state) => {
        state.isLogIn = true; // ログインしている状態にtrueを代入ログインしている状態
    },
    signOut: (state) => {
        state.isLogIn = false; // ログイン状態にfalseを代入＝ログアウト時の状態
      },
  },
});

export const {logIn,signOut} = authSlice.actions;
