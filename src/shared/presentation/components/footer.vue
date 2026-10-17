<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="p-3 text-center text-sm text-color-secondary" aria-label="Footer">
    <p class="m-0">{{ t('footer.content') }}</p>
  </footer>
</template>