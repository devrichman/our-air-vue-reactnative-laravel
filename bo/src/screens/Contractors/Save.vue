<template>
  <div v-loading="getContractorLoading" class="card">
    <el-form>
      <span>
        {{ needUpdate ? 'Modifier le prestataire' : 'Créer un prestataire' }}
      </span>

      <el-form-item
        label="Nom"
        required
        :error="errorMessage(saveError, 'name')"
      >
        <el-input v-model="item.name" placeholder="Nom"> </el-input>
      </el-form-item>
      <el-form-item
        label="Description"
        required
        :error="errorMessage(saveError, 'description')"
      >
        <el-input
          v-model="item.description"
          type="textarea"
          placeholder="Description"
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
  name: 'ContractorsSave',
  data() {
    return {}
  },
  computed: {
    ...mapState('contractors', [
      'item',
      'saveLoading',
      'saveError',
      'getContractorLoading'
    ]),
    needUpdate() {
      return (
        this.$route.params.id !== undefined && this.$route.params.id !== null
      )
    }
  },
  mounted: function() {
    if (this.needUpdate) {
      this.getContractor({ id: this.$route.params.id })
    } else {
      this.clearContractor()
    }
  },
  methods: {
    ...mapActions('contractors', ['save', 'getContractor', 'clearContractor']),
    errorMessage,
    async submit() {
      await this.save({
        ...this.item
      })
      if (this.saveError === null) {
        return router.push({
          name: 'contractor-list'
        })
      }
    },
    cancel() {
      return router.push({
        name: 'contractor-list'
      })
    }
  }
}
</script>

<style></style>
