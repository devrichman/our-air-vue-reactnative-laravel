<template>
  <el-form label-position="top">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item
          label="Départ"
          required
          :error="errorMessage(saveQuoteSegmentError, 'from')"
        >
          <el-autocomplete
            v-model="form.fromName"
            clearable
            placeholder="Aéroport de départ"
            :fetch-suggestions="runSearchAirports"
            value-key="name"
            :trigger-on-focus="false"
            @select="selectAirportFrom"
            @input="changeAirportFrom"
          >
          </el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="Arrivée"
          required
          :error="errorMessage(saveQuoteSegmentError, 'to')"
        >
          <el-autocomplete
            v-model="form.toName"
            clearable
            placeholder="Aéroport d'arrivée"
            :fetch-suggestions="runSearchAirports"
            :trigger-on-focus="false"
            value-key="name"
            @select="selectAirportTo"
            @input="changeAirportTo"
          >
          </el-autocomplete>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="Date"
          required
          :error="errorMessage(saveQuoteSegmentError, 'date')"
        >
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="Date"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <template #default="scope"></template>
        <el-button type="text" @click="onClose">
          Annuler
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          :loading="saveQuoteSegmentLoading"
          type="success"
          @click="onSubmit"
        >
          Enregistrer
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { errorMessage } from '@/services/api'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddSegment',
  props: {
    quote: {
      type: Object,
      default: () => {},
      required: true
    },
    segment: {
      type: Object,
      default: null
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        from: this.segment ? this.segment.from.id : null,
        fromName: this.segment ? this.segment.from.name : null,
        to: this.segment ? this.segment.to.id : null,
        toName: this.segment ? this.segment.to.name : null,
        date: this.segment ? this.segment.date : null
      }
    }
  },
  computed: {
    ...mapState('bookings', [
      'saveQuoteSegmentError',
      'saveQuoteSegmentLoading'
    ]),
    ...mapState('airports', { airportList: 'list' })
  },
  mounted: function() {},
  methods: {
    ...mapActions('bookings', ['saveQuoteSegment', 'editQuoteSegment']),
    ...mapActions('airports', { searchAirports: 'search' }),
    errorMessage,
    async onSubmit() {
      // Add or update a segment to the given quote
      await this.saveQuoteSegment({
        quoteId: this.quote.id,
        segmentId: this.segment ? this.segment.id : null,
        ...this.form
      })
      if (!this.saveQuoteSegmentError) {
        if (!this.segment) {
          this.form = {}
        }
        this.onClose()
      }
    },
    async runSearchAirports(queryString, cb) {
      await this.searchAirports({ search: queryString })
      cb(this.airportList)
    },
    selectAirportFrom(item) {
      this.form.from = item.id
    },
    selectAirportTo(item) {
      this.form.to = item.id
    },
    changeAirportFrom() {
      this.form.from = null
    },
    changeAirportTo() {
      this.form.to = null
    }
  }
}
</script>
