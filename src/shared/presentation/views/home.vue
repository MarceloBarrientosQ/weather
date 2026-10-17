<script setup>
import { useI18n } from "vue-i18n";
import WeatherReportList from "../../../stations/presentacion/views/weather-report-list.vue";

const { t } = useI18n();
</script>

<template>
  <section class="p-4" aria-labelledby="home-title">
    <h1 id="home-title">{{ t('home.title') }}</h1>
    <p>{{ t('home.content') }}</p>
    <weather-report-list/>
  </section>
</template>
