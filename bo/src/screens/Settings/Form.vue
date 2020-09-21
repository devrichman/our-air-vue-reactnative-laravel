<template>
  <el-form
    v-loading="getLoading || saveLoading"
    @submit.native.prevent="submit"
  >
    <el-form-item
      label="Email de contact"
      required
      :error="errorMessage(saveError, 'email')"
    >
      <el-input
        v-model="settings.email"
        placeholder="contact@club-airways.com"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Numéro de téléphone de contact"
      required
      :error="errorMessage(saveError, 'phone')"
    >
      <el-input v-model="settings.phone" placeholder="0123456789"></el-input>
    </el-form-item>
    <el-form-item
      label="CGV"
      required
      :error="errorMessage(saveError, 'general_terms')"
      class="quill-item"
      inline-message
    >
    </el-form-item>
    <div id="editor"></div>
    <el-form-item>
      <el-button :loading="saveLoading" type="primary" @click="submit">
        Enregistrer
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { errorMessage } from '@/services/api'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'SettingsForm',
  data() {
    return {
      editor: null
    }
  },
  computed: {
    ...mapState('settings', [
      'getLoading',
      'saveLoading',
      'saveError',
      'settings'
    ])
  },
  async mounted() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['clean'] // remove formatting button
    ]
    this.editor = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    })

    await this.get()
    this.editor.setContents(JSON.parse(this.settings.general_terms))
  },
  methods: {
    ...mapActions('settings', ['save', 'get']),
    errorMessage,
    submit() {
      this.save({
        email: this.settings.email,
        phone: this.settings.phone,
        general_terms: JSON.stringify(this.editor.getContents())
      })
    }
  }
}
</script>

<style>
.ql-blank,
.ql-container.ql-snow {
  background-color: white;
}
.quill-item {
  margin-bottom: 0 !important;
}
</style>
