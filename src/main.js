const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const routes = require('./vueRouter.js');

const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
});

top.router = router;

// const app =
new Vue({
    router
}).$mount('#app');
