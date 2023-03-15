const { createSlice } = require('@reduxjs/toolkit');

const INITIAL_STATE = {};

const loginSlice = createSlice({
  name: 'login',
  initialState: INITIAL_STATE,
  reducers: {},
});

export const loginActions = { ...loginSlice.actions };
export default loginSlice.reducer;
