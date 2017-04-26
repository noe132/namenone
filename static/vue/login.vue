<template>
<root>
    <div class="login-background"></div>
    <div class=""></div>
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
