<template>
<div class="chatlog-item" :class="{ self: item.self }">
    <div class="user">
        <div class="avatar"></div>
        <div class="name">{{ item.by }}</div>
        <div class="date">{{ item.date }}</div>
    </div>
    <div class="message" v-html="this.message_processed"></div>
</div>
</template>

<script>
module.exports = {
    props: ['item'],
    methods: {
        chatlogclicked() {
            this.$emit('chat-switch', {
                name: this.item.name
            });
        }
    },
    computed: {
        message_processed: function() {
            return this.item.message.replace(/\n/g, '<br>');
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
@import '/src/less/color-variable.less';
.chatlog-item {
    display: flex;
    flex-flow: column nowrap;
    padding: 10px 20px;

    .user {
        display: flex;
        flex-flow: row nowrap;
        order: 1;
        height: 35px;
        color: @gray;
        font-size: 1.4rem;

        .avatar {
            flex: 0 0 auto;
            background-image: url('/static/img/user.svg');
            height: 35px;
            width: 35px;
            position: relative;
        }

        .name {
            flex: 0 0 auto;
            width: auto;
            line-height: 35px;
            height: 35px;
        }

        .date {
            flex: 0 0 auto;
            width: auto;
            line-height: 35px;
            height: 35px;
        }
    }

    .message {
        color: @lightgray;
        padding: 15px 20px;
        display: flex;
        flex-flow: row nowrap;
        order: 2;
    }
}
.chatlog-item:not(.self) {
    .user {
        .avatar {
            order: 1;
            margin-right: 15px;
        }

        .name {
            order: 2;
            margin-right: 15px;
        }

        .date {
            order: 3;
            margin-right: 15px;
        }
    }

    .message {
        text-align: left;
    }
}

.chatlog-item.self {
    .user {
        justify-content: flex-end;

        .avatar {
            order: 2;
            margin-right: 15px;
        }

        .name {
            display: none;
            order: 3;
            margin-right: 15px;
        }

        .date {
            order: 1;
            margin-right: 15px;
        }
    }

    .message {
        display: flex;
        justify-content: flex-end;
    }
}
.chatlog-item:hover {
    background: @darkgray-3;
}
</style>
