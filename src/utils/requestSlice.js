import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;