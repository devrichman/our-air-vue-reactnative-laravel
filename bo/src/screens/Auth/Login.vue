<template>
  <el-form @submit.native.prevent="submit">
    <el-form-item
      label="Email"
      required
      :error="errorMessage(loginError, 'email')"
    >
      <el-input
        v-model="form.email"
        placeholder="admin@club-airways.com"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Mot de passe"
      required
      :error="errorMessage(loginError, 'password')"
    >
      <el-input
        v-model="form.password"
        show-password
        placeholder="password"
      ></el-input>
    </el-form-item>
    <el-form-item label="Se souvenir de moi">
      <el-switch v-model="form.remember"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loginLoading" type="primary" @click="submit">
        Se connecter
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { errorMessage } from '@/services/api'

export default {
  name: 'AuthLogin',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: true
      }
    }
  },
  computed: {
    ...mapState('auth', ['loginLoading', 'loginError'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    errorMessage,
    submit() {
      this.login({
        email: this.form.email,
        password: this.form.password,
        remember: this.form.remember
      })
    }
  }
}
</script>
