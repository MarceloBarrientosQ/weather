import { WeatherReport } from '../domain/model/weather-report.entity.js';

export class WeatherReportAssembler {
    static toEntityFromResource(resource) {
        return new WeatherReport({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['weather-reports'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }

    static toResourceFromEntity(entity) {
        const {id, ...resource} = entity;
        return resource;
    }
}