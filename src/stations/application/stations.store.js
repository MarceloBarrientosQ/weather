import {StationsApi} from "../infrastructure/stations-api.js";
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {WeatherStationAssembler} from "@/stations/infrastructure/weather-station.assembler.js";
import {WeatherReportAssembler} from "@/stations/infrastructure/weather-report.assembler.js";

const stationsApi = new StationsApi();

const useStationsStore = defineStore('stations', () => {
    const weatherStations = ref([]);
    const weatherReports = ref([]);
    const errors = ref([]);
    const weatherStationsLoaded = ref(false);
    const weatherReportsLoaded = ref(false);

    const weatherStationsCount = computed(() => {
        return weatherStationsLoaded ? weatherStations.value.length : 0;
    });

    const weatherReportsCount = computed(() => {
        return weatherReportsLoaded ? weatherReports.value.length : 0;
    });

    /**
     * Sirve para obtener una lista de zonas climáticas únicas a partir de las estaciones meteorológicas cargadas(para el select).
     * @type {import('vue').ComputedRef<string[]>}
     * Example output: ['Tropical', 'Temperate', 'Arid', 'Polar']
     */
    const climateZones = computed(() =>
        [...new Set(weatherStations.value.map(station => station.climateZone))]
    );

    function fetchWeatherStations() {
        stationsApi.getWeatherStations().then((response) => {
            weatherStations.value = WeatherStationAssembler.toEntitiesFromResponse(response);
            weatherStationsLoaded.value = true;
            console.log(weatherStationsLoaded.value)
            console.log(weatherStations.value)
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function fetchWeatherReports() {
        stationsApi.getWeatherReports().then((response) => {
            weatherReports.value = WeatherReportAssembler.toEntitiesFromResponse(response);
            weatherReportsLoaded.value = true;
            console.log(weatherReportsLoaded.value)
            console.log(weatherReports.value)
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function getWeatherStationById(id) {
        let idNum = parseInt(id);
        return weatherStations.value.find(station => station['id'] === idNum);
    }

    function getWeatherReportById(id) {
        let idNum = parseInt(id);
        return weatherReports.value.find(report => report['id'] === idNum);
    }

    function addWeatherStation(station) {
        stationsApi.createWeatherStation(station).then((response) => {
            const resource = response.data;
            let newStation = WeatherStationAssembler.toEntityFromResource(resource);
            weatherStations.value.push(newStation);
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function addWeatherReport(report) {
        stationsApi.createWeatherReport(report).then((response) => {
            const resource = response.data;
            let newReport = WeatherReportAssembler.toEntityFromResource(resource);
            weatherReports.value.push(newReport);
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function updateWeatherStation(station) {
        stationsApi.updateWeatherStation(station).then((response) => {
            const resource = response.data;
            let updatedStation = WeatherStationAssembler.toEntityFromResource(resource);
            let index = weatherStations.value.findIndex(s => s['id'] === updatedStation.id);
            if (index !== -1) weatherStations.value[index] = updatedStation;
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function updateWeatherReport(report) {
        stationsApi.updateWeatherReport(report).then((response) => {
            const resource = response.data;
            let updatedReport = WeatherReportAssembler.toEntityFromResource(resource);
            let index = weatherReports.value.findIndex(r => r['id'] === updatedReport.id);
            if (index !== -1) weatherReports.value[index] = updatedReport;
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function deleteWeatherStation(id) {
        stationsApi.deleteWeatherStation(id).then(() => {
            let index = weatherStations.value.findIndex(s => s['id'] === id);
            if (index !== -1) weatherStations.value.splice(index, 1);
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function deleteWeatherReport(id) {
        stationsApi.deleteWeatherReport(id).then(() => {
            let index = weatherReports.value.findIndex(r => r['id'] === id);
            if (index !== -1) weatherReports.value.splice(index, 1);
        }).catch((error) => {
            errors.value.push(error);
        })
    }

    function getWeatherStationsByClimateZone(climateZone) {
        return weatherStations.value.filter(station => station.climateZone === climateZone);
    }

    /**
     * Sums the temperatures of all weather reports.
     * @returns {number} Total temperature, or 0 when there are no reports.
     */
    function sumTemperatures() {
        return weatherReports.value.reduce((total, report) => total + report.temperature, 0);
    }

    /**
     * Calculates the average temperature of all weather reports.
     * @returns {number} Average temperature, or 0 when there are no reports.
     */
    function averageTemperature() {
        const total = weatherReports.value.length;
        return total === 0 ? 0 : sumTemperatures() / total;
    }

    /**
     * Finds the highest wind speed among the weather reports.
     * @returns {number} Maximum wind speed, or 0 when there are no reports.
     */
    function maxWindSpeed() {
        return weatherReports.value.length === 0
            ? 0
            : Math.max(...weatherReports.value.map(report => report.windSpeed));
    }

    /**
     * Finds the lowest temperature among the weather reports.
     * @returns {number} Minimum temperature, or 0 when there are no reports.
     */
    function minTemperature() {
        return weatherReports.value.length === 0
            ? 0
            : Math.min(...weatherReports.value.map(report => report.temperature));
    }

    return {
        weatherStations,
        weatherReports,
        errors,
        weatherStationsLoaded,
        weatherReportsLoaded,
        weatherStationsCount,
        weatherReportsCount,
        fetchWeatherStations,
        fetchWeatherReports,
        getWeatherStationById,
        getWeatherReportById,
        addWeatherStation,
        addWeatherReport,
        updateWeatherStation,
        updateWeatherReport,
        deleteWeatherStation,
        deleteWeatherReport,
        climateZones,
        getWeatherStationsByClimateZone
    }
})

export default useStationsStore;
