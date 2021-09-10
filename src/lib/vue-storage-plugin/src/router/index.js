import VueRouter from 'vue-router';
import Vue from 'vue';
import Layout from '../layout/index.vue';
Vue.use(VueRouter);
export const routes = (prefix = '') => [
    {
        path: `${prefix}/`,
        name: 'Layout',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'Home',
                component: () => import('../view/index.vue')
            }
        ]
    },
    {
        path: `${prefix}/login`,
        name: 'Login',
        component: () => import('../view/login.vue')
    }
];
export default new VueRouter({
    mode: 'hash',
    routes:routes()
})