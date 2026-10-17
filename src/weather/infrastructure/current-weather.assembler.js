import {CurrentWeather} from "@/weather/domain/model/current-weather.entity.js";

export class CurrentWeatherAssembler {
    static toEntityFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return null;
        }

        const current = response.data.current;

        return new CurrentWeather({
            temperature: current.temperature_2m,
            windSpeed: current.wind_speed_10m,
            relativeHumidity: current.relative_humidity_2m,
            observedAt: current.time
        });
    }
}