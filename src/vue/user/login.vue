<!-- login page -->
<template>
<div class="user-box login-box">
    <h1>WELCOME BACK.</h1>
    <!-- <div class="form-group">
        <input style="display:none" type="text" name="fakeusernameremembered" />
        <input style="display:none" type="password" name="fakepasswordremembered" />
    </div> -->
    <div class="form-group">
        <label for="email">EMAIL</label>
        <input type="text" name="email" spellcheck="false">
    </div>
    <div class="form-group">
        <label for="password">PASSWORD</label>
        <input type="password" name="password" autocomplete="new-password">
        <router-link class='forgot_password' to="/user/forgot">FORGOT YOUR PASSWORD?</router-link>
    </div>
    <div class="form-group">
        <a type="button" id="login" class="button" name="login" @click="logined">Login</a>
    </div>
    <footer class="form-group">
        Not Register yet?
        <router-link to="/user/signup">Sign up</router-link>
    </footer>
</div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            hello: 'greetings!'
        };
    },
    methods: {
        logined: function() {
            alert('greetings');
            this.$router.push('/');
        }
    }
};
</script>

<style scoped lang="less" src="../../less/user/login.less">
</style>
