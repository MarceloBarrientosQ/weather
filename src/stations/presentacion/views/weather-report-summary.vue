<script setup>

import {useI18n} from "vue-i18n";

const props = defineProps({
  weatherReport: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

</script>

<template>
  <pv-card class="h-full" role="article" :aria-label="weatherReport.city">
    <template #title>
      {{ weatherReport.city }}
    </template>
    <template #content>
      <p class="m-0 mb-2"><strong>{{ t('weather-report.country') }}:</strong> {{ weatherReport.country }}</p>
      <p class="m-0 mb-2"><strong>{{ t('weather-report.climate-zone') }}:</strong> {{ t(`climate-zones.${weatherReport.climateZone}`) }}</p>
      <p class="m-0 mb-2"><strong>{{ t('weather-report.temperature') }}:</strong> {{ weatherReport.temperature }} °C</p>
      <p class="m-0"><strong>{{ t('weather-report.registered-at') }}:</strong> {{ weatherReport.registeredAt }}</p>
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-3 text-sm text-color-secondary">
        <span>{{ t('weather-report.wind-speed') }}: {{ weatherReport.windSpeed }} km/h</span>
        <span>{{ t('weather-report.relative-humidity') }}: {{ weatherReport.relativeHumidity }} %</span>
        <span>{{ t('weather-report.observed-at') }}: {{ weatherReport.observedAt }}</span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>