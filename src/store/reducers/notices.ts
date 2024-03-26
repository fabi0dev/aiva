import { createSlice } from "@reduxjs/toolkit";

interface NoticesProps {
  success: boolean;
  g1: News[];
  local: News[];
}

interface News {
  title: string;
  link: string;
  image?: string;
}
const initialState: NoticesProps = {
  success: false,
  g1: [],
  local: [],
};

export const slice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setNotices: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setNotices } = slice.actions;
export default slice.reducer;
export const selectorNotices = (state: {
  notices: NoticesProps;
}): NoticesProps => state.notices;
