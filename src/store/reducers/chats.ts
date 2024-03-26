import { createSlice } from "@reduxjs/toolkit";

export type Messages = {
  role: "user" | "system";
  content: string;
  send?: boolean;
  hidden?: boolean;
};

type Chat = {
  id: string;
  name: string;
  messages: Messages[];
};

interface chatsProps {
  currentId: string | null;
  loading: boolean;
  chats: Chat[];
}

const initialState: chatsProps = {
  currentId: "",
  loading: false,
  chats: [
    /*  {
      id: 1,
      name: "Padrão",
      messages: [],
    }, */
  ],
};

export const slice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setNewChat: (state, { payload }: { payload: Chat }) => {
      return {
        ...state,
        chats: [...state.chats, payload],
      };
    },
    setCurrentChat: (state, { payload }) => {
      return {
        ...state,
        currentId: payload,
      };
    },
    setMessageInChatCurrent: (state, { payload }: { payload: Messages[] }) => {
      const chatCurrent = state.chats.find(
        (chat) => chat.id == state.currentId
      );

      const newMsg = {
        ...chatCurrent,
        messages: [...(chatCurrent?.messages as never), ...payload],
      };

      const chats = state.chats.filter((chat) => chat.id != state.currentId);
      chats.push(newMsg as Chat);

      return {
        ...state,
        chats,
      };
    },
    clearCurrentChat: (state) => {
      const chatCurrent = state.chats.find(
        (chat) => chat.id == state.currentId
      );

      const newMsg = {
        ...chatCurrent,
        messages: [],
      };

      const chats = state.chats.filter((chat) => chat.id != state.currentId);
      chats.push(newMsg as Chat);

      return {
        ...state,
        chats,
      };
    },
    setLoadingChat: (state, { payload }: { payload: boolean }) => {
      return {
        ...state,
        loading: payload,
      };
    },
    startInitial: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setNewChat,
  startInitial,
  setCurrentChat,
  setMessageInChatCurrent,
  setLoadingChat,
  clearCurrentChat,
} = slice.actions;
export default slice.reducer;
export const selectorChats = (state: { chats: chatsProps }): chatsProps =>
  state.chats;
