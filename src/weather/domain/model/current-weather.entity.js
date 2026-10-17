export class CurrentWeather {
    constructor({ temperature = 0, windSpeed = 0, relativeHumidity = 0, observedAt = null }) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.relativeHumidity = relativeHumidity;
        this.observedAt = observedAt;
    }


}