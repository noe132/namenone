<template>
<div @click="friendclicked">
    {{ item.name }}
</div>
</template>

<script>
module.exports = {
    props: ['item'],
    methods: {
        friendclicked() {
            this.$emit('fclicked', {
                name: this.item.name
            });
        }
    }
};
</script>
