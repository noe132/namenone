<template>
<transition name="chat">
    <div>
        <div class="chat-background chat-background-color"></div>
        <div class="chat-background chat-background-image"></div>
        <div ref="chatcontainer" class="chat-container flex">
            <div class="channel-box flex flexcolumn">
                <div class="channel-header flex">
                    <div class="title">CHANNEL LIST</div>
                    <i class="add-channel">

                </i>
                </div>
                <div class="channel-body flex flexcolumn">
                    <channel-item @channel-remove="channel_remove" @channel-switch="channel_switch" :item="item" v-for="item in channels"></channel-item>
                </div>
            </div>
            <div class="chat-box flex flexcolumn">
                <div class="chat-header flex">
                    <div class="title">
                        {{ current_chat_friend.name }}
                    </div>
                    <div class="button-box flex">
                        <div class="button-item logout" @click="logout"></div>
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
                            <div class="add-friend" @click="addfriendmodal_open"></div>
                        </div>
                        <friend-item @remove-friend="remove_friend" @chat-switch="switch_friend" :item="item" v-for="item in friends"></friend-item>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal addfriendmodal" v-if="showaddfriendmodal" ref="addfriendmodal">
            <div class="background" @click="addfriendmodal_close"></div>
            <div class="modal-content">
                <h2>ADD FRIEND</h2>
                <p>please input friend account name</p>
                <input v-model="addfriendmodal_input" type="text" @keypress.enter="addfriendmodal_confirm" name="" value="">
                <div @click="addfriendmodal_confirm" class="button">confirm</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
module.exports = {
    props: ['user'],
    data: function() {
        return {
            inputrows: 1,
            showaddfriendmodal: false,
            chatlog: [],
            friends: [],
            channels: [],
            current_chat_friend: {
                name: '',
                uid: 0
            }
        };
    },
    components: {
        'friend-item': require('./components/friend-item.vue'),
        'channel-item': require('./components/channel-item.vue'),
        'chatlog-item': require('./components/chatlog-item.vue')
    },
    created() {
        this.checkIsLogined();
        let _this = this;
        let setupws = () => {
            this.ws = new WebSocket(`ws://${window.location.host}/ws`);
            this.ws.addEventListener('close', e => {
                // try start another WebSocket connection
                setupws();
            });
            this.ws.addEventListener('message', e => {
                let msg = e.data;
                let data;
                try {
                    data = JSON.parse(msg);
                } catch (e) {
                    console.log(e);
                    return;
                }
                let operations = {
                    message(data) {
                        _this.onmessage(data);
                    }
                };
                if (!data.type || !(operations[data.type] instanceof Function)) {
                    return;
                }
                operations[data.type](data);
            });
        };
        setupws();
        this.getfriends();
    },
    methods: {
        checkIsLogined() {
            let axios = require('axios');
            axios({
                method: 'post',
                url: '/api/islogin'
            }).then(r => {
                if (r.data.status === 1) {
                    setTimeout(() => {
                        // alert('you have already logined');
                        this.$router.push('/user/login');
                    }, 0);
                }
            });
        },
        getfriends() {
            let _this = this;
            let axios = require('axios');
            axios({
                method: 'post',
                url: '/api/friends'
            }).then(r => {
                if (r.data.status === 0) {
                    _this.friends.splice(0, _this.friends.length);
                    r.data.data = JSON.parse(r.data.data);
                    r.data.data.forEach(v => {
                        _this.friends.push({
                            name: v.name,
                            uid: v.uid,
                        });
                    });
                } else {
                    console.log(r.message);
                }
            });
        },
        switch_friend({ name, uid }) {
            this.channel_switch({ name, uid });
        },
        channel_switch({ name, uid }) {
            let _this = this;
            setTimeout(() => {
                this.current_chat_friend = { name, uid };
                this.channels.forEach(v => {
                    v.activated = false;
                });
                let exist = this.channels.some(v => {
                    if (v.uid == uid) {
                        v.activated = true;
                        v.unread = 0;
                        return true;
                    }
                });
                if (!exist) {
                    this.channels.push({
                        name,
                        uid,
                        unread: 0,
                        activated: true,
                    });
                }
                let axios = require('axios');
                axios({
                    method: 'post',
                    url: '/api/chatlog',
                    data: {
                        uid
                    }
                }).then(r => {
                    if (r.data.status === 0) {
                        try {
                            let chatlog = JSON.parse(r.data.data);
                            _this.chatlog.splice(0, _this.chatlog.length);
                            console.log(chatlog);
                            console.log(uid);
                            chatlog.forEach(v => {
                                let self = uid === v.uid ? false : true;
                                _this.chatlog.push({
                                    by: self ? 'me' : name,
                                    self: self,
                                    message: v.message,
                                    date: new Date(Date.parse(v.date)).toLocaleString()
                                });
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        console.log(r.message);
                    }
                });
            }, 0);
        },
        channel_remove({ uid }) {
            let index;
            for (let i = 0; i < this.channels.length; i++) {
                if (this.channels[i].uid === uid) {
                    index = i;
                    break;
                }
            }
            let activated = this.channels[index].activated;
            if (index !== undefined) {
                this.channels.splice(index, 1);
            }
            index--;
            if (index - 1 < 0) {
                index = 0;
            }
            if (this.channels.length > 0 && activated) {
                this.channel_switch(this.channels[index]);
            }
        },
        remove_friend(uid) {
            // todo RU SURE
            let _this = this;
            let axios = require('axios');
            axios({
                method: 'post',
                url: '/api/removefriend',
                data: {
                    uid
                }
            }).then(r => {
                if (r.data.status === 0) {
                    _this.getfriends();
                    // TODO alert
                } else {
                    console.log(r.message);
                }
            });
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
            if (this.current_chat_friend.uid === 0) {
                return;
            }
            let to = this.current_chat_friend.uid;
            let text = this.$refs.input.value;
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.send(JSON.stringify({
                    req: 'send_message',
                    message: text,
                    to: to
                }));
            }
            this.chatlog.push({
                by: 'me',
                self: true,
                message: text,
                date: new Date().toLocaleString()
            });
            this.$refs.input.value = '';
        },
        entered_shift() {
            let text = this.$refs.input.value;
            let cursor = this.$refs.input.selectionStart;
            text = text.substring(0, cursor) + '\n' + text.substring(cursor);
            this.$refs.input.value = text;
            this.$refs.input.setSelectionRange(cursor + 1, cursor + 1);
            this.checklines();
        },
        addfriendmodal_open() {
            this.showaddfriendmodal = true;
            this.addfriendmodal_input = '';
            this.$refs.chatcontainer.style.filter = 'blur(8px)';
        },
        addfriendmodal_confirm() {
            let _this = this;
            let axios = require('axios');
            axios({
                method: 'post',
                url: '/api/addfriend',
                data: {
                    fusername: this.addfriendmodal_input
                }
            }).then(r => {
                if (r.data.status === 0) {
                    _this.getfriends();
                    // TODO alert
                } else {
                    console.log(r.message);
                }
            });
            this.addfriendmodal_close();
        },
        addfriendmodal_close() {
            this.showaddfriendmodal = false;
            this.$refs.chatcontainer.style.filter = '';
        },
        onmessage(data) {
            // TODO
            if (this.current_chat_friend.uid === data.from) {
                this.chatlog.push({
                    by: data.by,
                    self: false,
                    message: data.message,
                    date: new Date(Date.parse(data.date)).toLocaleString()
                });
            } else {
                let exist = this.channels.some(v => {
                    if (v.uid === data.from) {
                        v.unread++;
                        return true;
                    }
                    return false;
                });
                if (!exist) {
                    this.channels.push({
                        name: data.by,
                        uid: data.from,
                        unread: 1
                    });
                }
            }
        },
        logout() {
            let _this = this;
            let axios = require('axios');
            axios({
                method: 'post',
                url: '/api/logout'
            }).then(() => {
                _this.$router.push('/user/login');
            });
        }
    }
};
</script>


<style scoped lang="less">
@import "/src/less/chat.less";
</style>
