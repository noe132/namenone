<!-- login page -->
<template>
<transition name="user-login">
    <div class="user-box login-box">
        <h1>WELCOME BACK.</h1>
        <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" v-model="username" name="username" @keypress="keypress" @keypress.enter="focus" spellcheck="false">
        </div>
        <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" v-model="password" ref="password" name="password" @keypress="keypress" @keypress.enter="login" autocomplete="new-password">
            <router-link class='forgot_password' to="/user/forgot">FORGOT YOUR PASSWORD?</router-link>
            <p class="message">{{ message }}</p>
        </div>
        <footer class="form-group">
            <a type="button" id="login" @click="login_click" class="button" name="login">Login</a>
            <p>
                <span>Not Register yet?</span>
                <router-link to="/user/signup">Sign up</router-link>
            </p>
        </footer>
    </div>
</transition>
</template>

<script>
module.exports = {
    name: 'login',
    data: function() {
        return {
            message: ''
        };
    },
    methods: {
        keypress() {
            this.message = '';
        },
        focus() {
            this.$refs.password.focus();
        },
        login_click() {
            this.login();
        },
        login() {
            let _this = this;
            let r = /^.{3,16}$/;
            if (r.test(_this.username) && r.test(_this.password)) {
                let axios = require('axios');
                axios({
                    method: 'post',
                    url: '/api/login',
                    data: {
                        username: _this.username,
                        password: _this.password
                    }
                }).then(r => {
                    console.log(r.data);
                    if (r.data.status === 0) {
                        alert('greetings');
                        _this.$router.push('/chat');
                    } else {
                        _this.message = r.data.message;
                    }
                });
            } else {
                _this.message = 'incorrect username or password!';
            }
        }
    }
};
</script>

<style scoped lang="less">
@import "/src/less/user/login.less";
</style>
