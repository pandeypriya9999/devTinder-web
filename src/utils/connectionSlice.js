import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnection: () => null,
  },
});

export const { addConnections, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;