
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_USER_URL = `http://localhost:3000/user`;

//FETCH User
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId, { rejectWithValue }) => {
   try {
      const response = await axios.get(`${API_USER_URL}?userId=${userId}`);
      return response.data[0];
   } catch (error) {
      return rejectWithValue(`Failed to fetch user`);
   }
});

//ACTIONS
const userSlice = createSlice({
   name: 'user',
   initialState: {
      data: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         //FETCH 
         .addCase(fetchUser.pending, state => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
         })
         .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
   },
});

export default userSlice.reducer;