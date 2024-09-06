import * as VueRouter from 'vue-router';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(""),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('@/views/WelcomePage.vue'),
            children: [
                {
                    path: "",
                    name: 'welcome-login',
                    component: () => import('@/views/welcome/LoginPage.vue')
                }
            ]
        }, {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexPage.vue')
        }, {
            path: '/register',
            name: 'register',
            component: () => import('@/views/welcome/RegisterPage.vue')
        }
    ]

})

export default router