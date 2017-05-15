<template>
<div>
    <div class="chat-background chat-background-color"></div>
    <div class="chat-background chat-background-image"></div>
    <div class="chat-container flex">
        <div class="channel-box flex flexcolumn">
            <div class="channel-header flex">
                <div class="title">CHANNEL LIST</div>
                <i class="add-channel">

                </i>
            </div>
            <div class="channel-body flex flexcolumn">
                <channel-item :item="item" v-for="item in friends"></channel-item>
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
                <div class="chat-content flex flexcolumn">
                    <div class="chat-area scroller">
                        <chatlog-item :item="item" v-for="item in chatlog"></chatlog-item>
                    </div>
                    <div class="chat-input-box">
                        <textarea class="text-box scroller" ref="input" @keypress.enter.prevent="entered($event)" @keypress.enter.shift.prevent="entered_shift" @input="checklines" name="name" :rows="inputrows" cols="80" autocomplete="off"></textarea>
                    </div>
                </div>
                <div class="friend-box flex flexcolumn">
                    <div class="friends-list-title">
                        <span>my friends</span>
                        <div class="add-friend"></div>
                    </div>
                    <friend-item @fclicked="ff" :item="item" v-for="item in friends"></friend-item>
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
            inputrows: 1,
            chatlog: [{
                by: 'mozkoe',
                self: false,
                message: 'hi',
                date: '2017-05-12 11:12:22'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }, {
                by: 'mozkoe',
                self: false,
                message: 'hi',
                date: '2017-05-12 11:12:22'
            }, {
                by: 'mozkoe',
                self: false,
                message: 'hi',
                date: '2017-05-12 11:12:22'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }, {
                by: 'noe132',
                self: true,
                message: 'greetings\nand so on',
                date: '2017-05-12 11:12:24'
            }],
            friends: [{
                name: 'noe132',
                unread: 8,
            }, {
                name: 'mozkoe',
                unread: 72,
            }]
        };
    },
    components: {
        'friend-item': require('./components/friend-item.vue'),
        'channel-item': require('./components/channel-item.vue'),
        'chatlog-item': require('./components/chatlog-item.vue')
    },
    methods: {
        ff(param) {
            console.log(param);
        },
        checklines() {
            let line_breaks = (this.$refs.input.value.match(/\n/g) || []).length;
            let lines = line_breaks + 1;
            lines = lines > 8 ? 8 : lines;
            this.inputrows = lines;
        },
        entered(e) {
            if (e.shiftKey) {
                return;
            }
            let text = this.$refs.input.value;
            this.$refs.input.value = '';
        },
        entered_shift() {
            let text = this.$refs.input.value;
            let cursor = this.$refs.input.selectionStart;
            text = text.substring(0, cursor) + '\n' + text.substring(cursor);
            this.$refs.input.value = text;
            this.$refs.input.setSelectionRange(cursor + 1, cursor + 1);
            this.checklines();
        }
    }
};
</script>


<style scoped lang="less">
@import "/src/less/chat.less";
</style>
