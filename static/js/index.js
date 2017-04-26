const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const login = require('../vue/login.vue');


const routes = [
    { path: '/login', component: login },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
});

const app = new Vue({
    router
}).$mount('#app');

var data = { a: {} };
console.log(Object.getOwnPropertyDescriptor(data,'a'));
var vm = new Vue({
    data: data
});

console.log(Object.getOwnPropertyDescriptor(data,'a').set.toSring());
console.log(vm.a === data.a);
