<template>
  <el-form>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item
          label="Montant"
          required
          :error="errorMessage(saveQuoteError, 'amount')"
        >
          <el-input
            v-model="form.amount"
            placeholder="Montant"
            class="input-with-select"
          >
            <el-select
              slot="append"
              v-model="form.currency"
              placeholder="Devise"
              :value="form.currency"
            >
              <el-option label="EUR" value="EUR"></el-option>
              <el-option label="CHF" value="CHF"></el-option>
              <el-option label="USD" value="USD"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="Statut"
          required
          :error="errorMessage(saveQuoteError, 'status')"
        >
          <el-select
            v-model="form.status"
            placeholder="Statut"
            :value="form.status"
          >
            <el-option
              v-for="(status, key) in quoteStatuses"
              :key="key + status"
              :label="key"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="Contrat"
          required
          :error="errorMessage(saveQuoteError, 'assets')"
        >
          <el-input
            ref="files"
            v-model="form.asset"
            type="file"
            :class="'contract-quote-' + quote.id"
            accept=".pdf"
            @change="handleFileUpload"
          >
          </el-input>
          <el-tag v-if="quote.assets" type="success">
            <el-link :href="baseUrl + quote.assets.path" target="_blank">
              {{ quote.assets.file_name }}
            </el-link>
          </el-tag>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="quote-element">
      <el-col :span="12">
        <h4>Segments</h4>
      </el-col>
      <el-col :span="12">
        <el-button
          type="text"
          icon="el-icon-circle-plus"
          @click="addSegment(quote)"
        >
          ajouter un segment
        </el-button>
      </el-col>
      <segment-list
        :list="quote.segments"
        :on-remove="onRemoveSegment"
        :on-remove-loading="removeQuoteSegmentLoading"
        :on-edit="onEditSegment"
      />
    </el-row>
    <el-row class="quote-element">
      <el-col :span="12">
        <h4>Appareils</h4>
      </el-col>
      <el-col :span="12">
        <el-button
          type="text"
          icon="el-icon-circle-plus"
          @click="addAircraft(quote)"
        >
          ajouter un appareil
        </el-button>
      </el-col>
      <aircraft-list
        :list="quote.aircrafts"
        :on-remove="onRemoveAircraft"
        :on-remove-loading="removeQuoteAircraftLoading"
        :on-edit="onEditAircraft"
      />
      <el-col :span="24">
        <hr />
      </el-col>
    </el-row>
    <el-row class="quote-element">
      <el-col :span="12">
        <h4>Options</h4>
      </el-col>
      <el-col :span="12">
        <el-button
          type="text"
          icon="el-icon-circle-plus"
          @click="addOption(quote)"
        >
          ajouter une option
        </el-button>
      </el-col>
      <option-list
        :list="quote.options"
        :on-remove="onRemoveOption"
        :on-remove-loading="removeQuoteOptionLoading"
        :on-edit="onEditOption"
      />
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="quote-button"
          :loading="removeQuoteLoading"
          @click="removeQuote({ id: quote.id })"
        >
          supprimer
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          type="success"
          icon="el-icon-arrow-right"
          class="quote-button"
          :loading="saveQuoteLoading"
          @click="saveQuoteForm(quote.booking_id, quote.id)"
        >
          enregister
        </el-button>
      </el-col>
    </el-row>

    <el-dialog title="Ajouter un segment" :visible.sync="addSegmentVisible">
      <save-segment
        :key="editingSegment ? editingSegment.id : 0"
        :quote="quote"
        :segment="editingSegment"
        :on-close="
          () => {
            addSegmentVisible = false
          }
        "
      />
    </el-dialog>

    <el-dialog title="Ajouter une option" :visible.sync="saveOptionVisible">
      <save-option
        :key="editingOption ? editingOption.id : 0"
        :quote="quote"
        :option="editingOption"
        :on-close="
          () => {
            saveOptionVisible = false
          }
        "
      />
    </el-dialog>

    <el-dialog title="Ajouter une appareil" :visible.sync="saveAircraftVisible">
      <save-aircraft
        :key="editingAircraft ? editingAircraft.id : 0"
        :quote="quote"
        :option="editingAircraft"
        :on-close="
          () => {
            saveAircraftVisible = false
          }
        "
      />
    </el-dialog>
  </el-form>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { errorMessage } from '@/services/api'

import SegmentList from '@/components/SegmentList'
import OptionList from '@/components/QuoteOptionList'
import AircraftList from '@/components/QuoteAircraftList'

import SaveSegment from './SaveSegment'
import SaveOption from './SaveOption'
import SaveAircraft from './SaveAircraft'

export default {
  name: 'QuoteItem',
  components: {
    OptionList,
    SaveOption,
    AircraftList,
    SegmentList,
    SaveSegment,
    SaveAircraft
  },
  props: {
    quote: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addSegmentVisible: false,
      saveOptionVisible: false,
      saveAircraftVisible: false,
      editingSegment: null,
      editingOption: null,
      editingAircraft: null,
      file: null,
      form: {
        amount: this.quote ? this.quote.amount : 0,
        currency: this.quote ? this.quote.currency : 'EUR',
        status: this.quote ? this.quote.status : 'draft'
      },
      baseUrl: process.env.VUE_APP_API_URL.split('admin')[0] + 'storage/'
    }
  },
  computed: {
    ...mapState('bookings', [
      'removeQuoteLoading',
      'removeQuoteSegmentLoading',
      'removeQuoteOptionLoading',
      'removeQuoteAircraftLoading',
      'saveQuoteLoading',
      'saveQuoteError',
      'currentQuote'
    ]),
    ...mapGetters('bookings', ['quoteStatuses'])
  },
  mounted: function() {},
  methods: {
    errorMessage,
    ...mapActions('bookings', [
      'saveQuote',
      'removeQuote',
      'removeQuoteSegment',
      'removeQuoteOption',
      'removeQuoteAircraft'
    ]),
    addSegment() {
      this.editingSegment = null
      this.addSegmentVisible = true
    },
    onRemoveSegment(segment) {
      this.removeQuoteSegment({ quoteId: this.quote.id, segmentId: segment.id })
    },
    onEditSegment(segment) {
      this.editingSegment = segment
      this.addSegmentVisible = true
    },
    addOption() {
      this.editingOption = null
      this.saveOptionVisible = true
    },
    onRemoveOption(option) {
      this.removeQuoteOption({ quoteId: this.quote.id, optionId: option.id })
    },
    onEditOption(option) {
      this.editingOption = option
      this.saveOptionVisible = true
    },

    addAircraft() {
      this.editingAircraft = null
      this.saveAircraftVisible = true
    },
    onRemoveAircraft(aircraft) {
      this.removeQuoteAircraft({
        quoteId: this.quote.id,
        aircraftId: aircraft.id
      })
    },
    onEditAircraft(aircraft) {
      this.editingAircraft = aircraft
      this.saveAircraftVisible = true
    },
    handleFileUpload() {
      this.file = document.querySelector(
        '.contract-quote-' + this.quote.id + ' input'
      ).files[0]
    },
    async saveQuoteForm(bookingId, quoteId) {
      let formdata = new FormData()
      if (this.file) {
        formdata.append('assets', this.file)
      }
      formdata.append('amount', this.form.amount)
      formdata.append('currency', this.form.currency)
      formdata.append('status', this.form.status)

      this.form.formdata = formdata
      await this.saveQuote({
        bookingId: bookingId,
        quoteId: quoteId,
        ...this.form
      })
      this.quote = this.currentQuote
    }
  }
}
</script>

<style scoped>
.quote-element .el-button {
  text-align: right;
}
</style>
