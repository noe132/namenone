<template>
<div>
    <div class="user-background user-background-color"></div>
    <div class="user-background user-background-blur"></div>
    <div class="user-background user-background-blur-custom"></div>
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

<script src="../js/login.js"></script>

<style scoped lang="less" src="../less/user.less"></style>
