<template>
<div class="channel-item" :class="this.item.activated ? 'activated' : 'not'" @click="channelclicked">
    <div class="avatar">
        <div class="indicator" v-if="showindicator">
            {{ item.unread }}
        </div>
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="delete" @click="removechannel"></div>
</div>
</template>

<script>
module.exports = {
    props: ['item'],
    data: function() {
        return {
            showindicator: this.item.unread !== 0,
        };
    },
    methods: {
        channelclicked() {
            this.$emit('channel-switch', {
                name: this.item.name,
                uid: this.item.uid
            });
        },
        removechannel() {
            this.$emit('channel-remove', {
                uid: this.item.uid
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import '/src/less/components/channel-item.less';
</style>
