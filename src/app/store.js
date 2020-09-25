import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/LoginSlice'

export default configureStore({
  reducer: {
    login: loginReducer
  },
});
