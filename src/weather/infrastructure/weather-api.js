import {BaseApi} from "@/shared/infrastructure/base-api.js";

const openMeteoApiUrl = import.meta.env.VITE_OPEN_METEO_API_URL;
const forecastEndpointPath = import.meta.env.VITE_FORECAST_ENDPOINT_PATH;

export class WeatherApi extends BaseApi {
    constructor() {
        super(openMeteoApiUrl);
    }

    getCurrentWeather(latitude, longitude) {
        return this.http.get(forecastEndpointPath, {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,wind_speed_10m,relative_humidity_2m',
                timezone: 'auto'
            }
        });
    }
}