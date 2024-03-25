import { createSlice } from "@reduxjs/toolkit";

interface ProfileProps {
  location: {
    state: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
  };
  pc: {
    volume: number;
  };
}
const initialState: ProfileProps = {
  location: {
    state: {
      id: "",
      name: "",
    },
    city: {
      id: "",
      name: "",
    },
  },
  pc: {
    volume: 10,
  },
};

export const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDataProfile: (state, { payload }: { payload: ProfileProps }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setDataProfile } = slice.actions;
export default slice.reducer;
export const selectorProfile = (state: {
  profile: ProfileProps;
}): ProfileProps => state.profile;
