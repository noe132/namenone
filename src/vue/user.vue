<template>
<div>
    <div class="login-background">user</div>
    <router-view></router-view>
</div>
</template>

<script>
module.exports = {
    props: ['user'],
    data: function() {
        return {
            hello: 'greetings!'
        };
    }
};
</script>
