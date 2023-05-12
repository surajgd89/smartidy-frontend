import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
export const store = configureStore({
   reducer: {
      idyUser: userReducer,
   }
})
export default store;


