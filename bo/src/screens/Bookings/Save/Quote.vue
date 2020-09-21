<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="18">
        <el-button
          :loading="saveQuoteLoading"
          type="text"
          icon="el-icon-circle-plus"
          class="mb-20"
          @click="saveQuote({ bookingId: booking.id }), activateItem()"
        >
          Ajouter une proposition
        </el-button>
      </el-col>
    </el-row>
    <el-collapse v-if="booking.quotes.length > 0" v-model="newItemId">
      <el-collapse-item
        v-for="quote in booking.quotes"
        :key="quote.id"
        :title="
          'Proposition #' +
            quote.id +
            ' - ' +
            quote.amount +
            ' ' +
            quote.currency
        "
        :name="quote.id"
      >
        <quote-item :quote="quote"></quote-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import QuoteItem from './QuoteItem'

export default {
  name: 'BookingSaveQuote',
  components: { QuoteItem },
  props: {
    booking: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeItem: false,
      lastItemId: 0
    }
  },
  computed: {
    ...mapState('bookings', ['saveQuoteLoading']),
    newItemId: {
      get() {
        const newItemId = this.booking.quotes.slice(-1)[0].id
        return this.activeItem && this.lastItemId !== newItemId ? newItemId : ''
      },
      set() {
        this.activeItem = false
      }
    }
  },
  methods: {
    ...mapActions('bookings', ['saveQuote']),
    activateItem() {
      this.lastItemId =
        this.booking.quotes.length !== 0
          ? this.booking.quotes.slice(-1)[0].id
          : 0
      this.activeItem = true
    }
  }
}
</script>

<style scoped>
h2,
h3 {
  margin: 10px 0;
}
</style>
