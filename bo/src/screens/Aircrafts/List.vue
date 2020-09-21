<template>
  <el-row>
    <el-form>
      <el-row class="filters" :gutter="10">
        <el-col :span="8">
          <el-form-item label="Filtres">
            <el-input
              v-model="filters"
              :loading="listAircraftLoading"
              placeholder="Nom"
              clearable
              @input="filterData"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="6" :offset="18" class="mb-10">
        <el-button
          type="success"
          icon="el-icon-circle-plus"
          @click="addAircraft"
        >
          Ajouter un appareil
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listAircraftLoading"
      :data="aircraftlist.data"
      :default-sort="{
        prop: orderProp,
        order: order === 'asc' ? 'ascending' : 'descending'
      }"
      fit
      stripe
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        min-width="50"
        prop="aircrafts.id"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Type / Nom"
        min-width="250"
        prop="aircrafts.type"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.type }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Catégorie" min-width="250" sortable="custom">
        <template slot-scope="scope">
          <span>
            {{ scope.row.category.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="75" align="center">
        <template slot-scope="scope">
          <el-row class="action-list">
            <el-button
              type="primary"
              size="small"
              @click="editAircraft(scope.row)"
            >
              <i class="icon ion-ios-create"></i>
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="showDeleteModal(scope.row)"
            >
              <i class="icon ion-ios-trash"></i>
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <paginator
      :meta="aircraftlist.meta"
      :page-change="pageChange"
      :size-change="sizeChange"
    />
    <removal
      :on-delete="deleteAircraft"
      :show="confirmDeletion"
      :on-close="
        () => {
          confirmDeletion = false
        }
      "
      :delete-loading="deleteAircraftLoading"
    ></removal>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Paginator from '@/components/Paginator'
import Removal from '@/components/Removal'
import _ from 'lodash'

export default {
  name: 'AircraftsList',
  components: { Removal, Paginator },
  data() {
    return {
      confirmDeletion: false,
      aircraftToRemove: null,
      currentPage: 1,
      orderProp: 'aircrafts.id',
      order: 'asc',
      perPage: 10,
      filters: ''
    }
  },
  computed: {
    ...mapState('aircrafts', [
      'aircraftlist',
      'listAircraftLoading',
      'deleteAircraftLoading'
    ])
  },
  created() {
    this.debounceLoadData = _.debounce(this.loadData, 300)
  },
  mounted: function() {
    this.getAircraftList({})
    this.clearAircraft()
  },
  methods: {
    ...mapActions('aircrafts', ['getAircraftList', 'destroy', 'clearAircraft']),

    loadData() {
      this.getAircraftList({
        page: this.currentPage,
        perPage: this.perPage,
        order: this.order,
        orderProp: this.orderProp,
        filters: this.filters
      })
    },
    pageChange(current) {
      this.currentPage = current
      this.loadData()
    },
    sizeChange(size) {
      this.perPage = size
      this.loadData()
    },
    sortChange({ prop, order }) {
      this.orderProp = prop
      this.order = order === 'descending' ? 'desc' : 'asc'
      this.loadData()
    },
    filterData() {
      this.debounceLoadData()
    },
    addAircraft() {
      this.$router.push('/aircrafts/save')
    },
    editAircraft(aircraft) {
      this.$router.push('/aircrafts/save/' + aircraft.id)
    },

    showDeleteModal(aircraft) {
      this.aircraftToRemove = aircraft
      this.confirmDeletion = true
    },
    async deleteAircraft() {
      await this.destroy(this.aircraftToRemove.id)
      this.confirmDeletion = false
      this.loadData()
    }
  }
}
</script>
