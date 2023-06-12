
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_USER_URL = `http://localhost:4000/user`;

//GET User Via Search Query
export const getUser = createAsyncThunk('user/getUser', async (searchQuery, { rejectWithValue }) => {

   if (searchQuery) {
      try {
         const response = await axios.get(`${API_USER_URL}?${searchQuery}`);
         return response.data[0];
      } catch (error) {
         return rejectWithValue(`Failed to Get user ${error}`);
      }
   } else {
      try {
         const response = await axios.get(`${API_USER_URL}?${'userId=demoUser'}`);
         return response.data[0];
      } catch (error) {
         return rejectWithValue(`Failed to Get user ${error}`);
      }
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
         //GET 
         .addCase(getUser.pending, state => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
         })
         .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
   },
});

export default userSlice.reducer;