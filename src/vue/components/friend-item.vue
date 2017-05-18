<template>
<div class="friend-item" @click="friendclicked">
    <div class="avatar online"></div>
    <div class="name">{{ item.name }}</div>
    <div class="delete" @click="friendremove"></div>
</div>
</template>

<script>
module.exports = {
    props: ['item'],
    methods: {
        friendclicked() {
            this.$emit('chat-switch', {
                name: this.item.name,
                uid: this.item.uid
            });
        },
        friendremove() {
            this.$emit('remove-friend', this.item.uid);
        }
    }
};
</script>

<style lang="less" scoped>
@import '/src/less/components/friend-item.less';
</style>
