import { createSlice } from "@reduxjs/toolkit";
const applicantSlice = createSlice({
  name: "applicant",
  initialState: {
    applicants: [],
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export default applicantSlice.reducer;
export const { setApplicants } = applicantSlice.actions;
