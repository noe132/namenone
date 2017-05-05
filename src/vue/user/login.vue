<!-- login page -->
<template>
<transition name="user-login">
    <div class="user-box login-box">
        <h1>WELCOME BACK.</h1>
        <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" id="username" name="username" @keypress="keypress" @keypress.enter="focus" spellcheck="false">
        </div>
        <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" id="password" name="password" @keypress="keypress" @keypress.enter="login" autocomplete="new-password">
            <router-link class='forgot_password' to="/user/forgot">FORGOT YOUR PASSWORD?</router-link>
            <p class="message"></p>
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
let got = require('got');
module.exports = {
    data: function() {
        return {
            hello: 'greetings!'
        };
    },
    methods: {
        keypress() {
            document.querySelector('.message').textContent = '';
        },
        focus() {
            document.querySelector('#password').focus();
        },
        login_keypress(e) {
            if (e.keyCode === 13) {
                this.login();
            }
        },
        login_click() {
            this.login();
        },
        login() {
            let _this = this;
            let $ = q => {
                return document.querySelector(q)
            };
            let username = $('#username').value;
            let password = $('#password').value;

            let r = /^.{3,16}$/;
            if (r.test(username) && r.test(password)) {
                let axios = require('axios');
                axios({
                    method: 'post',
                    url: '/api/login',
                    data: {
                        username,
                        password
                    }
                }).then(r => {
                    if (r.data.status === 0) {
                        alert('greetings');
                        _this.$router.push('/chat');
                    } else {
                        $('.message').textContent = r.data.message;
                    }
                });
            } else {
                $('.message').textContent = 'incorrect username or password!';
            }
        }
    }
};
</script>

<style scoped lang="less">
@import "/src/less/user/login.less";
</style>
