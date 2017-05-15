const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [{
    path: '/user',
    component: require('./vue/user.vue'),
    children: [{
        path: '',
        component: { template: '<div>Home</div>' }
    }, {
        path: 'login',
        component: require('./vue/user/login.vue')
    }, {
        path: 'signup',
        component: require('./vue/user/signup.vue')
    }]
}, {
    path: '/chat',
    component: require('./vue/chat.vue')
}, {
    path: '/foo',
    component: Foo
}, {
    path: '/bar',
    component: Bar
}];

module.exports = routes;
