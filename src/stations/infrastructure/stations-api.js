import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const weatherStationsEndpointPath = import.meta.env.VITE_WEATHER_STATIONS_ENDPOINT_PATH;
const weatherReportsEndpointPath  = import.meta.env.VITE_WEATHER_REPORTS_ENDPOINT_PATH;

export class StationsApi extends BaseApi {

    #weatherReportEndpoint
    #weatherStationsEndpoint

    constructor() {
        super();
        this.#weatherReportEndpoint = new BaseEndpoint(this, weatherReportsEndpointPath);
        this.#weatherStationsEndpoint = new BaseEndpoint(this, weatherStationsEndpointPath);
    }

    getWeatherReports() {
        return this.#weatherReportEndpoint.getAll();
    }

    getWeatherReportById(id) {
        return this.#weatherReportEndpoint.getById(id);
    }

    createWeatherReport(resource) {
        return this.#weatherReportEndpoint.create(resource);
    }

    updateWeatherReport(id, resource) {
        return this.#weatherReportEndpoint.update(id, resource);
    }

    deleteWeatherReport(id) {
        return this.#weatherReportEndpoint.delete(id);
    }

    getWeatherStations() {
        return this.#weatherStationsEndpoint.getAll();
    }

    getWeatherStationById(id) {
        return this.#weatherStationsEndpoint.getById(id);
    }

    createWeatherStation(resource) {
        return this.#weatherStationsEndpoint.create(resource);
    }

    updateWeatherStation(id, resource) {
        return this.#weatherStationsEndpoint.update(id, resource);
    }

    deleteWeatherStation(id) {
        return this.#weatherStationsEndpoint.delete(id);
    }
}