<template>
  <div v-loading="getUserLoading" class="card">
    <el-form>
      <span>
        {{ needUpdate ? 'Modifier le client' : 'Créer un client' }}
      </span>

      <el-form-item
        label="Prénom"
        required
        :error="errorMessage(saveError, 'firstname')"
      >
        <el-input v-model="item.firstname" placeholder="Prénom"> </el-input>
      </el-form-item>
      <el-form-item
        label="Nom de famille"
        required
        :error="errorMessage(saveError, 'lastname')"
      >
        <el-input v-model="item.lastname" placeholder="Nom de famille">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Sexe"
        required
        :error="errorMessage(saveError, 'gender_id')"
      >
        <el-select v-model="item.gender_id" placeholder="Sexe">
          <el-option
            v-for="gender in genderList"
            :key="gender.id"
            :label="gender.gender_label"
            :value="gender.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Email"
        required
        :error="errorMessage(saveError, 'email')"
      >
        <el-input v-model="item.email" placeholder="Email"> </el-input>
      </el-form-item>
      <el-form-item
        label="Numéro de téléphone"
        required
        :error="errorMessage(saveError, 'phone')"
      >
        <el-input v-model="item.phone" placeholder="Numéro de téléphone">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Langue"
        required
        :error="errorMessage(saveError, 'locale_id')"
      >
        <el-select v-model="item.locale_id" placeholder="Langue">
          <el-option
            v-for="locale in localeList"
            :key="locale.id"
            :label="locale.language_label"
            :value="locale.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Commentaires"
        :error="errorMessage(saveError, 'comments')"
      >
        <el-input v-model="item.comments" placeholder="Commentaires">
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="!needUpdate"
        label="Mot de passe"
        required
        :error="errorMessage(saveError, 'password')"
      >
        <el-input
          v-model="item.password"
          placeholder="Mot de passe"
          class="pb-10"
          show-password
        >
        </el-input>
        <el-input
          v-model="item.password_confirmation"
          placeholder="Confirmez le mot de passe"
          show-password
        >
        </el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-button type="text" @click="cancel">
            Annuler
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button :loading="saveLoading" type="success" @click="submit">
            {{ needUpdate ? 'Modifier' : 'Enregistrer' }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { errorMessage } from '@/services/api'
import router from '@/router'
export default {
  name: 'ClientSave',
  data() {
    return {
      changePassword: true
    }
  },
  computed: {
    ...mapState('users', [
      'item',
      'saveLoading',
      'saveError',
      'getUserLoading'
    ]),
    ...mapState('locale', { localeList: 'list' }),
    ...mapState('genders', { genderList: 'list' }),
    needUpdate() {
      return (
        this.$route.params.id !== undefined && this.$route.params.id !== null
      )
    }
  },
  mounted() {
    this.getLocale()
    this.getGender()
    if (this.needUpdate) {
      this.changePassword = false
      this.getUser({ id: this.$route.params.id })
    } else {
      this.changePassword = true
      this.clearUser()
    }
  },
  methods: {
    ...mapActions('users', ['save', 'getUser', 'clearUser']),
    ...mapActions('locale', { getLocale: 'getAll' }),
    ...mapActions('genders', { getGender: 'getAll' }),
    errorMessage,
    async submit() {
      await this.save({
        ...this.item,
        updatepassword: this.changePassword
      })
      if (this.saveError === null) {
        return router.push({
          name: 'client-list'
        })
      }
    },
    cancel() {
      return router.push({
        name: 'client-list'
      })
    }
  }
}
</script>
