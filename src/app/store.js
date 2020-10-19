import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/LoginSlice'

export default configureStore({
  reducer: {
    login: loginReducer
  },
});
