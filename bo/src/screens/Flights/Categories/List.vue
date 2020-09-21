<template>
  <el-row>
    <el-form>
      <el-row class="filters" :gutter="10">
        <el-col :span="8">
          <el-form-item label="Filtres">
            <el-input
              v-model="filters"
              :loading="listCategoryLoading"
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
          @click="addCategory"
        >
          Ajouter une catégorie d'appareil
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listCategoryLoading"
      :data="categorylist.data"
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
        prop="flight_categories.id"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Nom"
        min-width="250"
        prop="flight_categories.name"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column min-width="75" align="center">
        <template slot-scope="scope">
          <el-row class="action-list">
            <el-button
              type="primary"
              size="small"
              @click="editCategory(scope.row)"
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
      :meta="categorylist.meta"
      :page-change="pageChange"
      :size-change="sizeChange"
    />
    <removal
      :on-delete="deleteCategory"
      :show="confirmDeletion"
      :on-close="
        () => {
          confirmDeletion = false
        }
      "
      :delete-loading="deleteCategoryLoading"
    ></removal>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Paginator from '@/components/Paginator'
import Removal from '@/components/Removal'
import _ from 'lodash'

export default {
  name: 'FlightsCategoriesList',
  components: { Removal, Paginator },
  data() {
    return {
      confirmDeletion: false,
      categoryToRemove: null,
      currentPage: 1,
      orderProp: 'flight_categories.id',
      order: 'asc',
      perPage: 10,
      filters: ''
    }
  },
  computed: {
    ...mapState('flights', [
      'categorylist',
      'listCategoryLoading',
      'deleteCategoryLoading'
    ])
  },
  created() {
    this.debounceLoadData = _.debounce(this.loadData, 300)
  },
  mounted: function() {
    this.getCategoryList({})
    this.clearCategory()
  },
  methods: {
    ...mapActions('flights', ['getCategoryList', 'destroy', 'clearCategory']),

    loadData() {
      this.getCategoryList({
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
    addCategory() {
      this.$router.push('/flights/categories/save')
    },
    editCategory(category) {
      this.$router.push('/flights/categories/save/' + category.id)
    },

    showDeleteModal(category) {
      this.categoryToRemove = category
      this.confirmDeletion = true
    },
    async deleteCategory() {
      await this.destroy(this.categoryToRemove.id)
      this.confirmDeletion = false
      this.loadData()
    }
  }
}
</script>
