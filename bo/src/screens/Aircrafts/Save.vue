<template>
  <div v-loading="getAircraftLoading" class="card">
    <el-form @submit.native.prevent>
      <span>
        {{ needUpdate ? "Modifier l'appareil" : 'Créer un appareil' }}
      </span>
      <el-form-item
        label="Catégorie"
        required
        :error="errorMessage(saveAircraftError, 'flight_category_id')"
      >
        <el-select v-model="aircraftitem.flight_category_id">
          <el-option
            v-for="category in categorylist.data"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Type / Nom"
        required
        :error="errorMessage(saveAircraftError, 'type')"
      >
        <el-input v-model="aircraftitem.type" placeholder="Type"> </el-input>
      </el-form-item>
      <el-form-item
        label="Services à bord"
        required
        :error="errorMessage(saveAircraftError, 'amenities')"
      >
        <el-input
          v-model="aircraftitem.amenities"
          type="textarea"
          placeholder="Amenities"
        >
        </el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="Année de fabrication"
            required
            :error="errorMessage(saveAircraftError, 'year_of_make')"
          >
            <el-date-picker v-model="aircraftitem.year_of_make" type="year">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="Rafraichissement intérieur"
            :error="errorMessage(saveAircraftError, 'interior_refurbished')"
          >
            <el-date-picker
              v-model="aircraftitem.interior_refurbished"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="Rafraichissement extérieur"
            :error="errorMessage(saveAircraftError, 'exterior_refurbished')"
          >
            <el-date-picker
              v-model="aircraftitem.exterior_refurbished"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="Distance maximale"
            required
            :error="errorMessage(saveAircraftError, 'max_range_nm')"
          >
            <el-input-number
              v-model="aircraftitem.max_range_nm"
              placeholder="0"
              :step="100"
            >
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="Vitesse de croisière"
            required
            :error="errorMessage(saveAircraftError, 'cruise_speed_knots')"
          >
            <el-input-number
              v-model="aircraftitem.cruise_speed_knots"
              placeholder="0"
              :step="50"
            >
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="Nombre de passagers"
            required
            :error="errorMessage(saveAircraftError, 'max_pax')"
          >
            <el-input-number v-model="aircraftitem.max_pax" placeholder="0">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="Images"
        required
        :error="errorMessage(saveAircraftError, 'assets')"
      >
        <el-input
          ref="files"
          v-model="aircraftitem.asset"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg"
          @change="handleFileUpload"
        >
        </el-input>
      </el-form-item>
      <el-form-item v-show="false" label="Catégories d'atouts">
        <el-select v-model="assetCategory">
          <el-option
            v-for="item in assetCategories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-row v-if="needUpdate" :gutter="20">
        <el-tag
          v-for="old_asset in aircraftitem.assets"
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
            :loading="saveAircraftLoading"
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
import moment from 'moment'
export default {
  name: 'AircraftsSave',
  data() {
    return {
      files: '',
      closedAsset: [],
      assetCategories: [
        { value: 'EXTERIOR', label: 'EXTERIOR' },
        { value: 'INTERIOR', label: 'INTERIOR' },
        { value: 'FLOOPLAN', label: 'FLOOPLAN' }
      ],
      assetCategory: 'EXTERIOR'
    }
  },
  computed: {
    ...mapState('aircrafts', [
      'aircraftitem',
      'saveAircraftLoading',
      'saveAircraftError',
      'getAircraftLoading'
    ]),
    ...mapState('flights', ['categorylist']),
    needUpdate() {
      return (
        this.$route.params.id !== undefined && this.$route.params.id !== null
      )
    }
  },
  mounted: function() {
    this.getCategoryList({ perPage: 1000 })
    if (this.needUpdate) {
      this.getAircraft({ id: this.$route.params.id })
    } else {
      this.clearAircraft()
    }
  },
  methods: {
    ...mapActions('aircrafts', ['save', 'getAircraft', 'clearAircraft']),
    ...mapActions('flights', ['getCategoryList']),
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
      formdata.append(
        'flight_category_id',
        this.aircraftitem.flight_category_id
      )
      let type = this.aircraftitem.type ? this.aircraftitem.type : ''
      let amenities = this.aircraftitem.amenities
        ? this.aircraftitem.amenities
        : ''
      formdata.append('type', type)
      formdata.append('amenities', amenities)
      formdata.append(
        'year_of_make',
        moment(this.aircraftitem.year_of_make).format('YYYY')
      )
      formdata.append(
        'interior_refurbished',
        moment(this.aircraftitem.interior_refurbished).format('YYYY-MM-DD')
      )
      formdata.append(
        'exterior_refurbished',
        moment(this.aircraftitem.exterior_refurbished).format('YYYY-MM-DD')
      )
      formdata.append('max_pax', this.aircraftitem.max_pax)
      formdata.append('max_range_nm', this.aircraftitem.max_range_nm)
      formdata.append(
        'cruise_speed_knots',
        this.aircraftitem.cruise_speed_knots
      )
      formdata.append('asset_category', this.assetCategory)

      this.aircraftitem.formdata = formdata
      await this.save({
        ...this.aircraftitem
      })
      if (this.saveAircraftError === null) {
        return router.push({
          name: 'aircrafts-list'
        })
      }
    },
    cancel() {
      return router.push({
        name: 'aircrafts-list'
      })
    },
    handleFileUpload() {
      this.files = document.querySelector('[type=file]').files
    },
    handleCloseOldAsset(old_asset) {
      this.aircraftitem.assets.splice(
        this.aircraftitem.assets.indexOf(old_asset),
        1
      )
      this.closedAsset.push(old_asset.id)
    }
  }
}
</script>
