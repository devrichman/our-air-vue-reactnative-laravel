<template>
  <el-form label-position="top">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item
          label="Nom"
          required
          :error="errorMessage(saveQuoteOptionError, 'name')"
        >
          <el-input v-model="form.name" placeholder="Nom"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="Description"
          required
          :error="errorMessage(saveQuoteOptionError, 'description')"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="Description"
          >
          </el-input>
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
          :loading="saveQuoteOptionLoading"
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
  name: 'SaveOption',
  props: {
    quote: {
      type: Object,
      default: () => {},
      required: true
    },
    option: {
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
        name: this.option ? this.option.name : null,
        description: this.option ? this.option.description : null
      }
    }
  },
  computed: {
    ...mapState('bookings', ['saveQuoteOptionError', 'saveQuoteOptionLoading'])
  },
  mounted: function() {},
  methods: {
    ...mapActions('bookings', ['saveQuoteOption', 'editQuoteOption']),
    ...mapActions('airports', { searchAirports: 'search' }),
    errorMessage,
    async onSubmit() {
      // Add or update a option to the given quote
      await this.saveQuoteOption({
        quoteId: this.quote.id,
        optionId: this.option ? this.option.id : null,
        ...this.form
      })
      if (!this.saveQuoteOptionError) {
        if (!this.option) {
          this.form = {}
        }
        this.onClose()
      }
    }
  }
}
</script>
