import { createSlice } from "@reduxjs/toolkit";
import { Messages } from "./chats";

interface ChatCommandProps {
  messages: Messages[];
  autoPlayAudioText: boolean;
  enableKeyboard: boolean;
}

const initialState = {
  autoPlayAudioText: false,
  enableKeyboard: false,
  messages: [],
};

export const slice = createSlice({
  name: "chatCommand",
  initialState,
  reducers: {
    setDataChatCommand: (state, { payload }: { payload: Messages[] }) => {
      return {
        ...state,
        messages: [...(payload as never)],
      };
    },
    setNewMsgCommand: (state, { payload }: { payload: Messages }) => {
      return {
        ...state,
        messages: [...state.messages, payload as never],
      };
    },
    setAutoPlayAudioText: (state, { payload }: { payload: boolean }) => {
      return {
        ...state,
        autoPlayAudioText: payload,
      };
    },
    setEnableKeyboard: (state, { payload }: { payload: boolean }) => {
      return {
        ...state,
        enableKeyboard: payload,
      };
    },
    clearChatCommand: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setNewMsgCommand,
  clearChatCommand,
  setDataChatCommand,
  setAutoPlayAudioText,
  setEnableKeyboard,
} = slice.actions;
export default slice.reducer;
export const selectorChatCommand = (state: {
  chatCommand: ChatCommandProps;
}): ChatCommandProps => state.chatCommand;
