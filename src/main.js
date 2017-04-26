const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const routes = require('./router.js');

const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
});

// const app =
new Vue({
    router
}).$mount('#app');
