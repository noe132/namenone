<template>
<div>
    <div class="user-background"></div>
    <div class="user-background-blur"></div>
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

<style scoped lang="less" src="../less/user.less"></style>
