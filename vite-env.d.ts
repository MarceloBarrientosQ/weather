/// <reference types="vite/client" />
interface ImportMetaEnv {
    /** Base URL of the fake API served by json-server. */
    readonly VITE_PLATFORM_API_URL: string;
    /** Path to the weather stations endpoint. */
    readonly VITE_WEATHER_STATIONS_ENDPOINT_PATH: string;
    /** Path to the weather reports endpoint. */
    readonly VITE_WEATHER_REPORTS_ENDPOINT_PATH: string;
    /** Base URL of the Open-Meteo API. */
    readonly VITE_OPEN_METEO_API_URL: string;
    /** Path to the Open-Meteo forecast endpoint. */
    readonly VITE_FORECAST_ENDPOINT_PATH: string;
    /** Base URL of the Logo.dev image API. */
    readonly VITE_LOGO_DEV_API_URL: string;
    /** Publishable token for the Logo.dev API. */
    readonly VITE_LOGO_DEV_TOKEN: string;
    /** Domain used to retrieve the Open-Meteo logo from Logo.dev. */
    readonly VITE_OPEN_METEO_DOMAIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}