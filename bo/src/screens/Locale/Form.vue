<template>
  <el-form
    v-loading="getAllLoading || saveLinesLoading"
    @submit.native.prevent="submit"
  >
    <el-tabs type="border-card">
      <el-tab-pane v-for="locale in list" :key="locale.id">
        <span slot="label">
          <span
            class="flag-icon"
            :class="'flag-icon-' + (locale.iso === 'en' ? 'gb' : locale.iso)"
          ></span>
          {{ locale.language_label }}
        </span>
        <el-row :gutter="10">
          <el-collapse v-if="Object.entries(linesByGroup).length > 0">
            <el-collapse-item
              v-for="(group, key) in linesByGroup"
              :key="locale.iso + '-' + key"
              :title="key"
            >
              <el-col v-for="line in group" :key="line.key" :span="12">
                <el-form-item :label="line.key">
                  <el-input v-model="line.text[locale.iso]" />
                </el-form-item>
              </el-col>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
      <el-button :loading="saveLinesLoading" type="primary" @click="submit">
        Enregistrer
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { errorMessage } from '@/services/api'
import 'flag-icon-css/css/flag-icon.min.css'

export default {
  name: 'LocaleForm',
  computed: {
    ...mapState('locale', [
      'getAllLoading',
      'saveLinesLoading',
      'saveLinesError',
      'lines',
      'list'
    ]),
    ...mapGetters('locale', ['linesByGroup'])
  },
  mounted() {
    this.getAll()
    this.getLines()
  },
  methods: {
    ...mapActions('locale', ['saveLines', 'getAll', 'getLines']),
    errorMessage,
    submit() {
      this.saveLines({ lines: this.lines })
    }
  }
}
</script>
