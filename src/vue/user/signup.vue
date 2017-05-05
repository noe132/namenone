<!-- signup page -->
<template>
<transition name="user-signup">
    <div class="user-box signup-box">
        <h1>CREATE ACCOUNT</h1>
        <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" id="username" name="username" @keypress="keypress" @keypress.enter="focus" spellcheck="false">
        </div>
        <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" id="password" name="password" @keypress="keypress" @keypress.enter="signup" autocomplete="new-password">
            <p class="message"></p>
        </div>
        <footer class="form-group">
            <a type="button" id="signup" @click="signup_click" class="button" name="signup">signup</a>
            <p>
                <span>Already Registerd?</span>
                <router-link to="/user/login">login</router-link>
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
        signup_keypress(e) {
            if (e.keyCode === 13) {
                this.signup();
            }
        },
        signup_click() {
            this.signup();
        },
        signup() {
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
                    url: '/api/signup',
                    data: {
                        username,
                        password
                    }
                }).then(r => {
                    if (r.data.status === 0) {
                        $('.message').textContent = 'signup successfully';
                        $('.message').classList.add('green');
                        setTimeout(() => {
                            _this.$router.push('/user/login');
                        }, 1500);
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
@import "/src/less/user/signup.less";
</style>
