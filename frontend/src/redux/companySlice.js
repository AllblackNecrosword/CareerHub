import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: {},
    allcompany: [],
    searchCompany: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllCompany: (state, action) => {
      state.allcompany = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});

export const { setSingleCompany, setAllCompany, setSearchCompany } =
  companySlice.actions;
export default companySlice.reducer;
