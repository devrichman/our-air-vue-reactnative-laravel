<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :sm="8" :md="6" class="mb-10 mr-10">
        <el-button icon="el-icon-view" @click="getActiveOptions">
          {{ active ? 'Voir options désactivés' : 'Voir options activés' }}
        </el-button>
      </el-col>
      <el-col :sm="8" :md="6" class="mb-10">
        <el-button type="success" icon="el-icon-circle-plus" @click="addOption">
          Ajouter une option
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="fetchLoading" :data="list.data">
      <el-table-column prop="icon" label="Icon" min-width="80" align="center">
        <template #default="scope">
          <i
            class="mdi"
            :class="'mdi-' + scope.row.icon"
            :style="'font-size: 18px; padding: 10px;'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="label" label="Nom" min-width="200">
      </el-table-column>
      <el-table-column prop="description" label="Description" min-width="450">
      </el-table-column>
      <el-table-column min-width="180" align="right">
        <template #default="scope">
          <el-row class="action-list">
            <el-button
              size="small"
              type="primary"
              title="Modifier"
              @click="editOption(list.data[scope.$index])"
            >
              <i class="icon ion-ios-create" />
            </el-button>
            <el-button
              v-if="active"
              size="small"
              type="warning"
              title="Désactiver"
              @click="showDisableModal(list.data[scope.$index])"
            >
              <i class="icon el-icon-takeaway-box" />
            </el-button>
            <el-button
              v-else
              size="small"
              type="success"
              title="Activer"
              :loading="disableLoading"
              @click="enableOption(list.data[scope.$index])"
            >
              <i v-show="!disableLoading" class="icon el-icon-takeaway-box" />
            </el-button>
            <el-button
              size="small"
              type="danger"
              title="Supprimer"
              @click="showDeleteModal(list.data[scope.$index])"
            >
              <i class="icon ion-ios-trash" />
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <paginator
      :meta="list.meta"
      :page-change="pageChange"
      :size-change="sizeChange"
    />

    <removal
      :on-delete="deleteOption"
      :show="confirmDeletion"
      :on-close="
        () => {
          confirmDeletion = false
        }
      "
      :delete-loading="deleteLoading"
    />

    <removal
      title="Veuillez confirmer la désactivation"
      type="warning"
      :on-delete="disableOption"
      :show="confirmDisablation"
      :on-close="
        () => {
          confirmDisablation = false
        }
      "
      :delete-loading="disableLoading"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Paginator from '@/components/Paginator'
import Removal from '@/components/Removal'

export default {
  name: 'OptionsList',
  components: { Removal, Paginator },
  data() {
    return {
      confirmDeletion: false,
      confirmDisablation: false,
      optionToRemove: null,
      optionToDisable: null,
      currentPage: 1,
      orderProp: 'id',
      order: 'asc',
      perPage: 10,
      filters: {},
      active: 1
    }
  },
  computed: {
    ...mapState('options', [
      'list',
      'selectedOption',
      'fetchLoading',
      'deleteLoading',
      'disableLoading'
    ])
  },
  mounted: function() {
    this.loadData()
    this.clearOption()
  },
  methods: {
    ...mapActions('options', [
      'fetchOptions',
      'disable',
      'destroy',
      'clearOption'
    ]),
    loadData() {
      this.fetchOptions({
        page: this.currentPage,
        perPage: this.perPage,
        order: this.order,
        orderProp: this.orderProp,
        filters: this.filters,
        active: this.active
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
    addOption() {
      this.$router.push('/options/save')
    },
    editOption(option) {
      this.$router.push('/options/save/' + option.id)
    },
    showDeleteModal(option) {
      this.optionToRemove = option
      this.confirmDeletion = true
    },
    showDisableModal(option) {
      this.optionToDisable = option
      this.confirmDisablation = true
    },
    getActiveOptions() {
      this.active = this.active ? 0 : 1
      this.loadData()
    },
    async deleteOption() {
      await this.destroy(this.optionToRemove.id)
      this.confirmDeletion = false
      this.loadData()
    },
    async disableOption() {
      await this.disable(this.optionToDisable.id)
      this.confirmDisablation = false
      this.loadData()
    },
    async enableOption(option) {
      await this.disable(option.id)
      this.loadData()
    }
  }
}
</script>

<style scoped>
.service-icon {
  margin: 0 5px;
}
</style>
