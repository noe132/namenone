<template>
<div class="">
    <h1 @click="doit">{{ hello }}</h1>
</div>
</template>


<script>
module.exports = {
    props: ['message'], // data expected
    data: function() {
        return {
            hello: this.message
        };
    },
    components: {
        'fucking': require('./subcomponent.vue')
    },
    methods: {
        doit() {
            console.log('clicked');
        }
    }
};
</script>
