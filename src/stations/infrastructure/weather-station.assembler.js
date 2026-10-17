import {WeatherStation} from "../domain/model/weather-station.entity.js";

export class WeatherStationAssembler {
    static toEntityFromResource(resource) {
        return new WeatherStation({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['weather-stations'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

    static toResourceFromEntity(entity) {
        const {id, ...resource} = entity;
        return resource;
    }
}