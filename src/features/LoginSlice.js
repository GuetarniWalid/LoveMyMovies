import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../config';

export const checkLogin = createAsyncThunk('login/checkLogin', async ({ username, password }) => {
    const dataToken = await fetch(`${config.baseUrl}authentication/token/new?api_key=${config.apiKey}`);
    const jsonToken = await dataToken.json();
    const token = jsonToken.request_token;
    const dataV4Token = await fetch(`${config.baseUrl}authentication/token/validate_with_login?api_key=${config.apiKey}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        request_token: token,
      }),
    });
    const jssonV4Token = await dataV4Token.json();
    const v4Token = jssonV4Token.request_token;

    const dataSession = await fetch(`${config.baseUrl}authentication/session/new?api_key=${config.apiKey}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_token: v4Token,
      }),
    });
    const jsonSession = await dataSession.json();
    const session_id = jsonSession.session_id;
    if(!session_id) throw new Error('identifiant ou mot de passe incorrect')
    return {
      username,
      session_id,
    };
});

export const selectStatus = state => state.login.status;

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [checkLogin.pending]: state => {
      state.status = 'pending';
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.username = action.payload.username;
      state.session_id = action.payload.session_id;
      state.status = 'fulfilled';
    },
    [checkLogin.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    },
  },
});

export default loginSlice.reducer;
