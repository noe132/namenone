<!-- login page -->
<template>
<div class="login-box">
    <h1>WELCOME BACK.</h1>
    <div class="form-group">
        <label for="email">EMAIL</label>
        <input type="text" name="email">
    </div>
    <div class="form-group">
        <label for="password">PASSWORD</label>
        <input type="password" name="password">
        <button type="button" name="forgot_password">FORGOT YOUR PASSWORD?</button>
    </div>
    <button type="button" id="login" name="login" @click="logined">Login</button>
    <footer>
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
