import Home from "./shared/presentation/views/home.vue";
import { createRouter, createWebHistory  } from "vue-router";
import stationsRoutes from "../src/stations/presentacion/stations-routes.js";

const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',            name: 'home',      component: Home,         meta: { title: 'Home' } },
    { path: '/weather',         name: 'weather',   children: stationsRoutes },
    {path: '/', redirect: '/home'},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: {title: 'Page Not Found'}}
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from) => {
    const baseTitle = 'Open-Meteo Weather Monitoring Platform';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    return true;
});

export default router;