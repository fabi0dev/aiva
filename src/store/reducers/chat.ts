import { createSlice } from "@reduxjs/toolkit";

export type ChatMessages = {
  role: string;
  content: string;
};
export interface ChatProps {
  currentId: string;
  messages: [];
}
const initialState = {};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return {
        ...state,
        name: payload,
      };
    },
  },
});

export const { setData } = slice.actions;
export default slice.reducer;
export const selectorChat = (state: { chat: ChatProps }): ChatProps =>
  state.chat;
