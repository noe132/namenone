<!-- login page -->
<template>
<transition name="user-signup">
    <div class="user-box login-box">
        <h1>CREATE AN ACCOUNT</h1>
        <div class="form-group">
            <label for="email">EMAIL</label>
            <input type="text" name="email" spellcheck="false">
        </div>
        <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" name="password" autocomplete="new-password">
        </div>
        <footer class="form-group">
            <a type="button" id="login" class="button" name="login" @click="logined">Sign Up</a>
            <p>
                <span>Already Registerd?</span>
                <router-link to="/user/login">Login</router-link>
            </p>
        </footer>
    </div>
</transition>
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

<style scoped lang="less" src="../../less/user/signup.less"></style>
