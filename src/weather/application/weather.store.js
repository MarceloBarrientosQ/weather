import {WeatherApi} from "../infrastructure/weather-api.js";
import {defineStore} from "pinia";
import {ref} from "vue";
import {CurrentWeatherAssembler} from "@/weather/infrastructure/current-weather.assembler.js";

const weatherApi = new WeatherApi();

const useWeatherStore = defineStore('weather', () => {
    const currentWeather = ref(null);
    const errors = ref([]);

    function fetchCurrentWeather(latitude, longitude) {
        currentWeather.value = null;
        return weatherApi.getCurrentWeather(latitude, longitude).then((response) => {
            currentWeather.value = CurrentWeatherAssembler.toEntityFromResponse(response);
        }).catch((error) => {
            console.error('Weather error:', error);
            errors.value.push(error);
            throw error;
        });
    }

    return {
        currentWeather,
        errors,
        fetchCurrentWeather
    };
})

export default useWeatherStore;