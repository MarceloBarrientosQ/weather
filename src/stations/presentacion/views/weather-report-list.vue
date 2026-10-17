<script setup>

import {useI18n} from "vue-i18n";
import useStationsStore from "../../application/stations.store.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import WeatherReportSummary from "@/stations/presentacion/views/weather-report-summary.vue";

const { t } = useI18n();
const store = useStationsStore();
const {weatherReports, weatherReportsLoaded} = storeToRefs(store);

onMounted(() => {
  if(!weatherReportsLoaded.value) {
    store.fetchWeatherReports()
  }
});

</script>

<template>
  <section aria-labelledby="weather-reports-title">
    <h2 id="weather-reports-title" class="text-2xl">{{ t('weather-reports.title') }}</h2>
    <p v-if="weatherReports.length === 0" class="text-color-secondary">{{ t('weather-reports.empty') }}</p>
    <div v-else class="grid">
      <div v-for="weatherReport in weatherReports" :key="weatherReport.id" class="col-12 md:col-6">
        <weather-report-summary :weather-report="weatherReport"/>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>