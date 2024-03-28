import { createSlice } from "@reduxjs/toolkit";

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}
interface LocationProps {
  success: boolean;
  weather?: WeatherData;
}

const initialState: LocationProps = {
  success: false,
  weather: undefined,
};

export const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDataWeather: (state, { payload }) => {
      return {
        ...state,
        weather: payload,
      };
    },
    clearLocation: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setDataWeather, clearLocation } = slice.actions;
export default slice.reducer;
export const selectorLocation = (state: {
  location: LocationProps;
}): LocationProps => state.location;
