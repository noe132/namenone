<template>
<div>
    <div class="chat-background chat-background-color"></div>
    <div class="chat-background chat-background-image"></div>
    <div class="chat-container flex">
        <div class="channel-box flex">
            <div class="channel-header flex">
                <div class="title">CHANNEL LIST</div>
                <i class="add-channel">

                </i>
            </div>
            <div class="channel-body flex flexcolumn">
            </div>
        </div>
        <div class="chat-box flex flexcolumn">
            <div class="chat-header flex">
                <div class="title">
                    noe132
                </div>
                <div class="button-box flex">
                    <div class="button-item logout"></div>
                </div>
            </div>
            <div class="chat-main flex">
                <div class="chat-content flex">
                    <div class="chat-area"></div>
                    <div class="chat-input-box">

                    </div>
                </div>
                <div class="friend-box flex">
                </div>
            </div>
        </div>
    </div>
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


<style scoped lang="less">
@import "/src/less/chat.less";
</style>
