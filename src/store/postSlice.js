import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: []
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload;
    },
    removePosts: (state) => {
      state.posts = [];
    }
  }
})

export const {addPosts, removePosts} = postSlice.actions;
export default postSlice.reducer;