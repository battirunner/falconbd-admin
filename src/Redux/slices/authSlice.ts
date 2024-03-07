import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/authState';
import { RootState } from '../store';



const initialState: AuthState = {
  // userInfo: localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : null,
  userInfo: null,
  // token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // set local storage after login
    setCredentials: (state, action: PayloadAction<AuthState['userInfo']>) => {
      // state.userInfo = action.payload;
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // const { user, accessToken } = action.payload;
      state.userInfo = action.payload;
      // state.token = accessToken;
    },
    // clear the local storage credentials to logout
    //@ts-ignore
    clearCredentials: (state, action) => {
      state.userInfo = null;
      // state.token = null;
      // localStorage.removeItem("userInfo");
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     customEntityAdapter.removeAll(state);
  //   });
  // },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectCurrentUser = (state:RootState) => state.auth.userInfo;

export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.userInfo;

// export const selectToken = (state) => state.auth.userInfo.token;
