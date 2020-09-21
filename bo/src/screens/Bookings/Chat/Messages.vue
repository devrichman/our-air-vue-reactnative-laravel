<template>
  <div>
    <el-card class="chat-box">
      <el-row v-for="msg in messages" :key="msg.id">
        <el-col :span="24">
          <div class="auther-form">
            <div class="auther-group">
              <el-avatar
                :icon="
                  msg.is_admin ? 'el-icon-s-platform' : 'el-icon-user-solid'
                "
                class="mb-20"
                :class="msg.is_admin ? 'message-admin' : ''"
              ></el-avatar>
            </div>
            <div class="auther-group">
              <span :class="msg.is_admin ? 'message-admin' : 'message-author'">
                {{
                  msg.is_admin
                    ? 'Administrator'
                    : msg.author.firstname + ' ' + msg.author.lastname
                }}
              </span>
              <span class="message-time">{{
                convertTimeFormat(msg.created_at)
              }}</span>
              <br />
              <span class="message-content">{{ msg.content }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row>
      <el-col :span="24">
        <el-input
          v-model="message"
          placeholder="Please input chat message here."
          @keyup.enter.native="sendMessage"
        >
          <el-button
            slot="append"
            icon="el-icon-s-promotion"
            @click="sendMessage"
          >
            Send
          </el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import Echo from 'laravel-echo'
import io from 'socket.io-client'

export default {
  name: 'ChatMessages',
  components: {},
  props: {
    booking: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState('bookings', [
      'messages',
      'getMessagesLoading',
      'getMessagesError',
      'newMessageLoading',
      'newMessageError'
    ])
  },
  created() {
    this.debounceLoadData = _.debounce(this.loadData, 300)
  },
  mounted: function() {
    this.debounceLoadData()
  },
  methods: {
    ...mapActions('bookings', ['getMessages', 'newMessage', 'appendMessage']),
    init() {
      console.log(process.env.VUE_APP_ECHO_URL)
      const echoClient = new Echo({
        broadcaster: 'socket.io',
        client: io,
        host: process.env.VUE_APP_ECHO_URL
      })
      const channel =
        'clubairways_database_conversation.' + this.$route.params.id
      echoClient.channel(channel).listen('NewMessage', data => {
        this.realTimeMessage(data)
      })
    },
    realTimeMessage(message) {
      this.appendMessage({ message: message })
      this.message = ''
    },
    loadData() {
      this.getMessages({ bookingId: this.$route.params.id })
      this.init()
    },
    convertTimeFormat(datetime) {
      return moment(datetime).format('LT, ddd MM/DD')
    },
    async sendMessage() {
      let sendMsg = this.message
      this.message = ''
      await this.newMessage({
        bookingId: this.$route.params.id,
        content: sendMsg
      })
    }
  }
}
</script>
<style scoped>
.chat-box {
  overflow: auto;
  height: 500px;
  display: flex;
  flex-direction: column-reverse;
}
.auther-form {
  display: flex;
}
.auther-group {
  float: left;
  margin-left: 10px;
}
.message-content {
  font-weight: 900;
}
.message-author {
  color: green;
}
.message-admin {
  color: rosybrown;
}
.message-time {
  color: gray;
  margin-left: 10px;
  font-size: 12px;
}
</style>
