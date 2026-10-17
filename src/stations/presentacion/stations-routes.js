const weatherReportForm = () => import('./views/weather-report-form.vue');

const stationsRoutes = [
    { path: 'reports/new', name: 'weather-report-new', component: weatherReportForm, meta: { title: 'New Weather Report' } }
];

export default stationsRoutes;