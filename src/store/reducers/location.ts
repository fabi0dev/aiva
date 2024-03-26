import { createSlice } from "@reduxjs/toolkit";

interface LocationProps {
  success: boolean;
  weather?: {
    currentCondition: {
      uv: string;
      aqiSeverity: string;
      windSpeed: string;
      humidity: string;
      currentTemperature: string;
      currentRaw: {
        cap: string;
        urlIcon: string;
        temp: number;
        uv: number;
        uvDesc: string;
        aqiSeverity: string;
      };
    };
    forecast: {
      dayNightSummaries: {
        day: string[];
        night: string[];
      };
      summaries: string[];
      validTime: {
        dataType: string;
        dataValue: string;
      };
      dayofWeek: string;
      monthDay: string;
    }[];
    nowcasting: string;
  };
  location?: {
    latitude: string;
    longitude: string;
    isDetected: boolean;
    locality: string;
    region: string;
    subRegion: string;
    country: string;
    isoCode: string;
    language: string;
    displayName: string;
  };
}

const initialState: LocationProps = {
  success: false,
  weather: undefined,
  location: undefined,
};

export const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDataLocation: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setDataLocation } = slice.actions;
export default slice.reducer;
export const selectorLocation = (state: {
  location: LocationProps;
}): LocationProps => state.location;
