import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/interface',
        name: 'interface',
        component: () => import(/* webpackChunkName: "about" */ '../views/interface.vue')
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map