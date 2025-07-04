import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    currentLoggedInUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});
export const { currentLoggedInUser, logoutCurrentUser } = userSlice.actions;
export default userSlice.reducer;
