import { createSlice } from "@reduxjs/toolkit";

export interface StatusPCProps {
  success: boolean;
  result: {
    externalIp: string;
    hostname: string;
    user: {
      username: string;
    };
    ram: {
      freeSpace: string;
      percent: number;
      totalSpace: string;
      use: string;
    };
    cpu: {
      model: string;
      free: string;
      count: string;
      use: string;
      percent: number;
    };
    volume: number;
  };
}
const initialState = {
  result: {},
};

export const slice = createSlice({
  name: "statusPc",
  initialState,
  reducers: {
    setDataPC: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    clearDataPC: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setDataPC, clearDataPC } = slice.actions;
export default slice.reducer;
export const selectorStatusPC = (state: {
  statusPc: StatusPCProps;
}): StatusPCProps => state.statusPc;
