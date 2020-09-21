<template>
  <div v-loading="getCategoryLoading" class="card">
    <el-form @submit.native.prevent>
      <span>
        {{ needUpdate ? 'Modifier la catégorie' : 'Créer une catégorie' }}
      </span>

      <el-form-item
        label="Nom"
        required
        :error="errorMessage(saveCategoryError, 'name')"
      >
        <el-input v-model="categoryitem.name" placeholder="Nom"> </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Nombre de passagers min."
            required
            :error="errorMessage(saveCategoryError, 'min_pax')"
          >
            <el-input-number v-model="categoryitem.min_pax" placeholder="0">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Nombre de passagers max."
            required
            :error="errorMessage(saveCategoryError, 'max_pax')"
          >
            <el-input-number v-model="categoryitem.max_pax" placeholder="0">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Prix moyen par heure."
            required
            :error="errorMessage(saveCategoryError, 'average_price')"
          >
            <el-input-number
              v-model="categoryitem.average_price"
              placeholder="0"
              :step="1"
            >
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Vitesse moyenne (km/h)"
            required
            :error="errorMessage(saveCategoryError, 'average_speed')"
          >
            <el-input-number
              v-model="categoryitem.average_speed"
              placeholder="0"
              :step="50"
            >
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="Description"
        required
        :error="errorMessage(saveCategoryError, 'description')"
      >
        <el-input
          v-model="categoryitem.description"
          type="textarea"
          placeholder="description"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="Images"
        required
        :error="errorMessage(saveCategoryError, 'assets')"
      >
        <el-input
          ref="files"
          v-model="categoryitem.asset"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg"
          @change="handleFileUpload"
        >
        </el-input>
      </el-form-item>
      <el-row v-if="needUpdate" :gutter="20">
        <el-tag
          v-for="old_asset in categoryitem.assets"
          :key="old_asset.id"
          class="m-10"
          closable
          type="info"
          @close="handleCloseOldAsset(old_asset)"
        >
          {{ old_asset.file_name }}
        </el-tag>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="text" @click="cancel">
            Annuler
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            :loading="saveCategoryLoading"
            type="success"
            @click="submit"
          >
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
  name: 'FlightsCategoriesSave',
  data() {
    return {
      files: '',
      closedAsset: []
    }
  },
  computed: {
    ...mapState('flights', [
      'categoryitem',
      'saveCategoryLoading',
      'saveCategoryError',
      'getCategoryLoading'
    ]),
    needUpdate() {
      return (
        this.$route.params.id !== undefined && this.$route.params.id !== null
      )
    }
  },
  mounted: function() {
    if (this.needUpdate) {
      this.getCategory({ id: this.$route.params.id })
    } else {
      this.clearCategory()
    }
  },
  methods: {
    ...mapActions('flights', ['save', 'getCategory', 'clearCategory']),
    errorMessage,
    async submit() {
      let formdata = new FormData()
      //adding new files to form data.
      for (var i = 0; i < this.files.length; i++) {
        formdata.append('assets[' + i + ']', this.files[i])
      }
      //adding removed original files to form data
      if (this.needUpdate) {
        formdata.append('old_assets[]', this.closedAsset)
      }
      formdata.append('name', this.categoryitem.name)
      formdata.append('min_pax', this.categoryitem.min_pax)
      formdata.append('max_pax', this.categoryitem.max_pax)
      formdata.append(
        'min_cruise_speed_knots',
        this.categoryitem.min_cruise_speed_knots
      )
      formdata.append(
        'max_cruise_speed_knots',
        this.categoryitem.max_cruise_speed_knots
      )
      formdata.append('average_price', this.categoryitem.average_price)
      formdata.append('average_speed', this.categoryitem.average_speed)
      formdata.append('description', this.categoryitem.description)

      this.categoryitem.formdata = formdata
      await this.save({
        ...this.categoryitem
      })
      if (this.saveCategoryError === null) {
        return router.push({
          name: 'flights-categories-list'
        })
      }
    },
    cancel() {
      return router.push({
        name: 'flights-categories-list'
      })
    },
    handleFileUpload() {
      this.files = document.querySelector('[type=file]').files
    },
    handleCloseOldAsset(old_asset) {
      this.categoryitem.assets.splice(
        this.categoryitem.assets.indexOf(old_asset),
        1
      )
      this.closedAsset.push(old_asset.id)
    }
  }
}
</script>
