<template>
<div class="channel-item" @click="channelclicked">
    <div class="avatar">
        <div class="indicator" v-if="showindicator">
            {{ item.unread }}
        </div>
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="delete"></div>
</div>
</template>

<script>
module.exports = {
    props: ['item'],
    methods: {
        channelclicked() {
            this.$emit('chat-switch', {
                name: this.item.name
            });
        }
    },
    data: function() {
        return {
            showindicator: this.item.unread !== 0
        };
    }
};
</script>

<style lang="less" scoped>
@import '/src/less/components/channel-item.less';
</style>
