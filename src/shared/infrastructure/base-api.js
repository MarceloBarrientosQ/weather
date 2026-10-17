import axios from "axios";

/**
 * Shared infrastructure base class that configures the HTTP client.
 *
 * @class BaseApi
 */
export class BaseApi {
    /**
     * @private
     * Axios HTTP client instance
     * @type {import('axios').AxiosInstance}
     */
    #http;

    /**
     * Initializes the Axios HTTP client with the base URL from environment variables
     */
    constructor(baseURL = import.meta.env.VITE_PLATFORM_API_URL) {
        this.#http = axios.create({ baseURL });
    }

    /**
     * Returns the configured Axios HTTP client.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }

}
