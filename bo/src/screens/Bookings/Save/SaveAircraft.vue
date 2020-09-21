<template>
  <el-form label-position="top">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item
          label="Appareil"
          required
          :error="!form.id ? 'Ajouter une appareil' : null"
        >
          <el-select v-model="form.id">
            <el-option
              v-for="item in aircraftlist.data"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
          :loading="saveQuoteAircraftLoading"
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
  name: 'SaveAircraft',
  props: {
    quote: {
      type: Object,
      default: () => {},
      required: true
    },
    aircraft: {
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
      form: { id: null }
    }
  },
  computed: {
    ...mapState('bookings', [
      'saveQuoteAircraftError',
      'saveQuoteAircraftLoading'
    ]),
    ...mapState('aircrafts', ['aircraftlist'])
  },
  mounted: function() {
    this.getAircraftList({ perPage: 1000 })
  },
  methods: {
    ...mapActions('bookings', ['saveQuoteAircraft', 'editQuoteAircraft']),
    ...mapActions('aircrafts', ['getAircraftList']),
    errorMessage,
    async onSubmit() {
      // Add or update a aircraft to the given quote
      if (!this.form.id) return
      await this.saveQuoteAircraft({
        quoteId: this.quote.id,
        aircraftId: this.form.id,
        ...this.form
      })
      if (!this.saveQuoteAircraftError) {
        if (!this.aircraft) {
          this.form = {}
        }
        this.onClose()
      }
    }
  }
}
</script>
