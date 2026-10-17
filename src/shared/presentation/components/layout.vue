<script setup>

import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer.vue";

const { t } = useI18n();

const logoUrl = `${import.meta.env.VITE_LOGO_DEV_API_URL}/${import.meta.env.VITE_OPEN_METEO_DOMAIN}?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`;

const items = [
  { label: 'toolbar.home', to: '/home' },
  { label: 'toolbar.new-weather-report', to: '/weather/reports/new' }
];

</script>

<template>
  <pv-toast/>
  <header class="absolute top-0 left-0 w-full">
    <pv-toolbar class="bg-primary flex-wrap" aria-label="Main toolbar">
      <template #start>
        <img :src="logoUrl" alt="Open-Meteo logo" width="40" height="40" class="mr-2"/>
        <h3>{{ t('toolbar.title') }}</h3>
      </template>
      <template #center>
        <nav aria-label="Main navigation">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ t(item.label) }}</router-link>
          </pv-button>
        </nav>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
  </header>
  <main class="mt-7">
    <router-view/>
  </main>
  <footer-content/>
</template>