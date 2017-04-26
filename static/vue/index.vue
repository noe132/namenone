<template>
<root>
    <h1>{{ hello }}</h1>
    <fucking :message="hello"></fucking>
</root>
</template>

<script>
module.exports = {
    data: function() {
        return {
            hello: 'greetings!'
        };
    },
    components: {
        'fucking': require('./subcomponent.vue')
    }
};
</script>
