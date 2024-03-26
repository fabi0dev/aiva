import { createSlice } from "@reduxjs/toolkit";

interface ApiKeyOpenAIProps {
  key: string;
}
const initialState: ApiKeyOpenAIProps = {
  key: "",
};

export const slice = createSlice({
  name: "apikeyopenai",
  initialState,
  reducers: {
    setApiKey: (state, { payload }) => {
      return {
        ...state,
        key: payload,
      };
    },
  },
});

export const { setApiKey } = slice.actions;
export default slice.reducer;
export const selectorApiKeyOpenAI = (state: {
  apiKeyOpenAI: ApiKeyOpenAIProps;
}): ApiKeyOpenAIProps => state.apiKeyOpenAI;
