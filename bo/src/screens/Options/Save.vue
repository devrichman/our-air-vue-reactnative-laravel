<template>
  <div v-loading="getOptionLoading" class="card">
    <el-form>
      <span>
        {{ needUpdate ? 'Créer une option' : "Modifier l'option" }}
      </span>

      <el-form-item
        label="Nom"
        required
        :error="errorMessage(saveError, 'label')"
      >
        <el-input v-model="item.label" placeholder="Nom de l'option">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Description"
        required
        :error="errorMessage(saveError, 'description')"
      >
        <el-input
          v-model="item.description"
          placeholder="Description de l'option"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="Services associés"
        required
        :error="errorMessage(saveError, 'services')"
      >
        <el-select v-model="itemService" multiple placeholder="Service">
          <el-option
            v-for="service in listServices"
            :key="service.id"
            :label="service.code"
            :value="service.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Icon"
        required
        :error="errorMessage(saveError, 'icon')"
      >
        <el-input v-model="item.icon" placeholder="Please type icon name">
          <el-button slot="append">
            <i
              class="mdi"
              :class="'mdi-' + item.icon"
              :style="'font-size: 18px; padding: 10px;'"
            />
          </el-button>
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
  name: 'OptionsSave',
  data() {
    return {}
  },
  computed: {
    ...mapState('options', [
      'item',
      'saveLoading',
      'saveError',
      'getOptionLoading'
    ]),
    ...mapState('services', ['listServices']),

    needUpdate() {
      return (
        this.$route.params.id !== undefined && this.$route.params.id !== null
      )
    },
    itemService: {
      get() {
        return this.item.services.map(i => i.id)
      },
      set(value) {
        this.item.services = this.listServices.filter(
          i => value.indexOf(i.id) >= 0
        )
      }
    }
  },
  mounted() {
    this.fetchServices()
    if (this.needUpdate) {
      this.getOption({ id: this.$route.params.id })
    } else {
      this.clearOption()
    }
  },
  methods: {
    ...mapActions('options', ['save', 'getOption', 'clearOption']),
    ...mapActions('services', ['fetchServices']),
    errorMessage,
    async submit() {
      await this.save({
        ...this.item,
        services: this.item.services.map(i => i.id)
      })
      if (this.saveError === null) {
        return router.push({
          name: 'option-list'
        })
      }
    },
    cancel() {
      return router.push({
        name: 'option-list'
      })
    }
  }
}
</script>

<style></style>
