<!-- login page -->
<template>
<div class="user-box signup-box">
    <h1>WELCOME HERE.</h1>
    <div class="form-group">
        <label for="email">EMAIL</label>
        <input type="text" name="email">
    </div>
    <div class="form-group">
        <label for="password">PASSWORD</label>
        <input type="password" name="email">
    </div>
    <div class="form-group">
        <label for="password_confirm">PASSWORD CONFIRM</label>
        <input type="text" name="password_confirm">
    </div>
    <button type="button" name="signup">Sign up</button>
    <footer>
        Already Registerd?
        <router-link to="/user/login">Login</router-link>
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
    components: {
    }
};
</script>
