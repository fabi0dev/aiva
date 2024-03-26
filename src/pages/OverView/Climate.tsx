import { capitalizeFirstLetter } from "@/lib/utils";
import { GetLocation } from "@/services/server";
import { selectorLocation, setDataLocation } from "@/store/reducers/location";
import { Avatar, AvatarImage } from "@components/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiWeatherWindy } from "react-icons/ti";
import { FaDroplet } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { SpinnerTyping } from "@components/SpinnerTyping";

interface ClimateProps {}

export const Climate: FC<ClimateProps> = () => {
  const dispatch = useDispatch();
  const { success, weather, location } = useSelector(selectorLocation);
  const getLocationData = async () => {
    const data = await GetLocation();
    dispatch(setDataLocation(data));
  };

  useEffect(() => {
    getLocationData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {capitalizeFirstLetter(weather?.forecast[0].dayofWeek as string)} em{" "}
          {location?.locality}
          <span className="text-gray-300">
            {" "}
            - {weather?.forecast[0].monthDay}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!success && <SpinnerTyping />}

        {success && (
          <div>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-x-4">
                <div className="flex flex-wrap">
                  <Avatar>
                    <AvatarImage
                      src={weather?.currentCondition.currentRaw.urlIcon}
                    />
                  </Avatar>
                  <div className="text-5xl">
                    {weather?.currentCondition.currentTemperature}°c
                  </div>
                </div>
                <div className="text-sm mt-1">
                  {weather?.currentCondition.currentRaw.cap}

                  <p className="text-gray-200">
                    {weather?.currentCondition.aqiSeverity}
                  </p>
                </div>
              </div>

              <div className="text-xs">
                <p className="mb-2">
                  Hoje - {weather?.forecast[0].dayNightSummaries.day[0]}
                  {weather?.forecast[0].dayNightSummaries.day[1]}
                </p>

                <p className="mb-2">
                  A noite - {weather?.forecast[0].dayNightSummaries.night[0]}
                  {weather?.forecast[0].dayNightSummaries.night[1]}
                </p>
              </div>
            </div>
            <div className="flex flex-1 mt-4 gap-3">
              <div className="text-center justify-center">
                <div className="text-xs flex gap-1 text-gray-300">
                  <FaDroplet /> Umid.
                </div>
                <div>{weather?.currentCondition.humidity}</div>
              </div>

              <div className="text-center justify-center">
                <div className="text-xs flex gap-1 text-gray-300">
                  <IoSunny /> UV
                </div>
                <div>{weather?.currentCondition.uv}</div>
              </div>

              <div className="text-center justify-center">
                <div className="text-xs flex gap-1 text-gray-300">
                  <TiWeatherWindy /> Vento
                </div>
                <div>{weather?.currentCondition.windSpeed}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
