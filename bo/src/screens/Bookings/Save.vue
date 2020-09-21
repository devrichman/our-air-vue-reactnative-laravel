<template>
  <el-tabs v-loading="loading" type="border-card">
    <el-tab-pane label="Demande initiale">
      <booking-save-request :booking="booking"></booking-save-request>
    </el-tab-pane>
    <el-tab-pane label="Propositions">
      <booking-save-quote :booking="booking"></booking-save-quote>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        Chat
        <span v-if="booking.last_message">
          <i
            v-if="!booking.last_message.is_admin"
            class="mdi mdi-chat-alert message-alert"
          />
        </span>
      </span>
      <chat-messages :booking="booking"></chat-messages>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BookingSaveRequest from './Save/Request'
import BookingSaveQuote from './Save/Quote'
import ChatMessages from './Chat/Messages'

export default {
  name: 'BookingSave',
  components: {
    BookingSaveQuote,
    BookingSaveRequest,
    ChatMessages
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('bookings', { booking: 'item', loading: 'getLoading' })
  },
  mounted: function() {
    this.get({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('bookings', ['get'])
  }
}
</script>
<style scoped>
.message-alert {
  color: red;
  font-size: 20px;
}
</style>
