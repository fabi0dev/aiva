import { createSlice } from "@reduxjs/toolkit";

export interface InterfaceUIProps {
  colorMain: string;
  colorBg: string;
  viewProfile: boolean;
}

const initialState: InterfaceUIProps = {
  colorMain: "#0edde9",
  colorBg: "#000",
  viewProfile: true,
};

export const slice = createSlice({
  name: "interfaceUI",
  initialState,
  reducers: {
    setViewProfile: (state, { payload }: { payload: boolean }) => {
      return {
        ...state,
        viewProfile: payload,
      };
    },
  },
});

export const { setViewProfile } = slice.actions;
export default slice.reducer;
export const selectorInterfaceUI = (state: {
  interfaceUI: InterfaceUIProps;
}): InterfaceUIProps => state.interfaceUI;
