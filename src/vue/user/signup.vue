<!-- signup page -->
<template>
<transition name="user-signup">
    <div class="user-box signup-box">
        <h1>CREATE ACCOUNT</h1>
        <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" v-model="username" name="username" @keypress="keypress" @keypress.enter="focus" spellcheck="false">
        </div>
        <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" v-model="password" ref="password" name="password" @keypress="keypress" @keypress.enter="signup" autocomplete="new-password">
            <p class="message" :class="message_class">{{ message }}</p>
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
module.exports = {
    name: 'signup',
    data: function() {
        return {
            message: '',
            message_class: ''
        };
    },
    methods: {
        keypress() {
            this.message = '';
            this.message_class = '';
        },
        focus() {
            this.$refs.password.focus();
        },
        signup_click() {
            this.signup();
        },
        signup() {
            let _this = this;
            let r = /^.{3,16}$/;
            if (r.test(_this.username) && r.test(_this.password)) {
                let axios = require('axios');
                axios({
                    method: 'post',
                    url: '/api/signup',
                    data: {
                        username: _this.username,
                        password: _this.password
                    }
                }).then(r => {
                    if (r.data.status === 0) {
                        _this.message = 'signup successfully';
                        _this.message_class = 'green';
                        setTimeout(() => {
                            _this.$router.push('/user/login');
                        }, 1500);
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
@import "/src/less/user/signup.less";
</style>
