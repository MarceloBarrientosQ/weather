export class WeatherStation {
    /** Minimum absolute temperature difference required to register a report. */
    static MIN_TEMPERATURE_DIFFERENCE = 2;
    /** Maximum wind speed (km/h) allowed to register a report. */
    static MAX_WIND_SPEED = 60;

    constructor({ id = null, name = '', city = '', country = '',
                    latitude = 0, longitude = 0, climateZone = '', lastTemperature = 0 }) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.climateZone = climateZone;
        this.lastTemperature = lastTemperature;
    }


    temperatureDifferenceFrom(temperature) {
        return Math.abs(temperature - this.lastTemperature);
    }


    canRegisterReport(temperature, windSpeed) {
        return this.temperatureDifferenceFrom(temperature) >= WeatherStation.MIN_TEMPERATURE_DIFFERENCE
            && windSpeed <= WeatherStation.MAX_WIND_SPEED;
    }
}