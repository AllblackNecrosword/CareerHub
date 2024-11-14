import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    getJobbyId: null,
    getAdminJobs: [],
    getSearchAdminJobs: "",
    getAppliedJob: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setgetJobbyId: (state, action) => {
      state.getJobbyId = action.payload;
    },
    setgetAdminJobs: (state, action) => {
      state.getAdminJobs = action.payload;
    },
    setgetSearchAdminJobs: (state, action) => {
      state.getSearchAdminJobs = action.payload;
    },
    setgetAppliedJob: (state, action) => {
      state.getAppliedJob = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setgetJobbyId,
  setgetAdminJobs,
  setgetSearchAdminJobs,
  setgetAppliedJob,
} = jobSlice.actions;
export default jobSlice.reducer;
