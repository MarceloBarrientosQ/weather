export class WeatherReport {
 constructor({id = null, stationId = null, climateZone = '',
              city = '', country = '', latitude = 0, longitude = 0,
              temperature = 0, windSpeed = 0, relativeHumidity = 0, observedAt = null,
              registeredAt = null}) {
 {
    this.id = id;
    this.stationId = stationId;
    this.climateZone = climateZone;
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.relativeHumidity = relativeHumidity;
    this.observedAt = observedAt;
    this.registeredAt = registeredAt;
 }
}
}