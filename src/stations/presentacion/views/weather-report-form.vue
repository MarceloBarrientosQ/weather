<script setup>

import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useToast} from "primevue";
import useStationsStore from "../../application/stations.store.js";
import useWeatherStore from "../../../weather/application/weather.store.js";
import {storeToRefs} from "pinia";
import {onMounted, ref, computed, watch} from "vue";
import {WeatherReport} from "../../domain/model/weather-report.entity.js";

const {t} = useI18n();
const router = useRouter();
const toast = useToast();
const stationsStore = useStationsStore();
const weatherStore = useWeatherStore();
const { climateZones, weatherStationsLoaded } = storeToRefs(stationsStore);
const { currentWeather } = storeToRefs(weatherStore);

const selectedClimateZone = ref(null);
const selectedStation = ref(null);
const loadingWeather = ref(false);

onMounted(() => {
  if(!weatherStationsLoaded.value) {
    stationsStore.fetchWeatherStations()
  }
})

/** Stations that belong to the selected climate zone. */
const stationOptions = computed(() =>
    selectedClimateZone.value ? stationsStore.getWeatherStationsByClimateZone(selectedClimateZone.value) : []
);

/** Whether the current weather allows registering a report for the selected station. */
const canRegister = computed(() =>
    !!selectedStation.value && !!currentWeather.value &&
    selectedStation.value.canRegisterReport(currentWeather.value.temperature, currentWeather.value.windSpeed)
);

// Reset the station when the climate zone changes
watch(selectedClimateZone, () => {
  selectedStation.value = null;
});

// Retrieve current weather when a station is selected
watch(selectedStation, (station) => {
  console.log('Station:', station, station?.constructor?.name);
  if (!station) return;
  loadingWeather.value = true;
  weatherStore.fetchCurrentWeather(station.latitude, station.longitude)
      .catch(() => toast.add({ severity: 'error', summary: t('weather-report-form.weather-error'), life: 3000 }))
      .finally(() => loadingWeather.value = false);
});

/**
 * Builds and registers the weather report, then navigates to Home.
 */
const createWeatherReport = () => {
  if (!canRegister.value) return;
  const station = selectedStation.value;
  const weather = currentWeather.value;
  const weatherReport = new WeatherReport({
    stationId: station.id,
    climateZone: station.climateZone,
    city: station.city,
    country: station.country,
    latitude: station.latitude,
    longitude: station.longitude,
    temperature: weather.temperature,
    windSpeed: weather.windSpeed,
    relativeHumidity: weather.relativeHumidity,
    observedAt: weather.observedAt,
    registeredAt: new Date().toISOString()
  });
  stationsStore.addWeatherReport(weatherReport)
  toast.add({ severity: 'success', summary: t('weather-report-form.created'), life: 3000 });
  navigateToHome();
};

/** Navigates back to the Home view. */
const navigateToHome = () => router.push({ name: 'home' });

</script>

<template>
  <section class="p-4" aria-labelledby="weather-report-form-title">
    <h1 id="weather-report-form-title">{{ t('weather-report-form.title') }}</h1>
    <p class="text-color-secondary">{{ t('weather-report-form.subtitle') }}</p>

    <form class="flex flex-column gap-3 md:w-6" @submit.prevent="createWeatherReport">
      <div class="flex flex-column gap-2">
        <label for="climate-zone">{{ t('weather-report-form.climate-zone') }}</label>
        <pv-select input-id="climate-zone" v-model="selectedClimateZone" :options="climateZones"
                   :placeholder="t('weather-report-form.select-climate-zone')"
                   :aria-label="t('weather-report-form.climate-zone')"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="weather-station">{{ t('weather-report-form.weather-station') }}</label>
        <pv-select input-id="weather-station" v-model="selectedStation" :options="stationOptions"
                   option-label="name" :disabled="!selectedClimateZone"
                   :placeholder="t('weather-report-form.select-weather-station')"
                   :aria-label="t('weather-report-form.weather-station')"/>
      </div>

      <div v-if="selectedStation && currentWeather" aria-live="polite">
        <p class="m-0">{{ t('weather-report.temperature') }}: {{ currentWeather.temperature }} °C
          ({{ t('weather-report-form.last-temperature') }}: {{ selectedStation.lastTemperature }} °C)</p>
        <p class="m-0">{{ t('weather-report.wind-speed') }}: {{ currentWeather.windSpeed }} km/h</p>
        <p v-if="!canRegister" class="text-red-500 m-0 mt-2" role="alert">
          {{ t('weather-report-form.invalid-conditions') }}
        </p>
      </div>

      <div class="flex gap-2">
        <pv-button type="submit" :label="t('weather-report-form.create')" icon="pi pi-check"
                   :disabled="!canRegister || loadingWeather" :loading="loadingWeather"
                   :aria-label="t('weather-report-form.create')"/>
        <pv-button type="button" :label="t('weather-report-form.cancel')" icon="pi pi-times"
                   severity="secondary" @click="navigateToHome"
                   :aria-label="t('weather-report-form.cancel')"/>
      </div>
    </form>
  </section>
</template>

<style scoped>

</style>