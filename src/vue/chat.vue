<template>
<div>
    <div class="chat-background chat-background-color"></div>
    <div class="chat-background chat-background-image"></div>
    <div class="main">
        <div class="channel-box">

        </div>
        <div class="chat-box">

        </div>
        <div class="friend-box">

        </div>
    </div>

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
