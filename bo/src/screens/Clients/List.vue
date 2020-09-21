<template>
  <el-row>
    <el-form>
      <el-row class="filters" :gutter="10">
        <el-col :span="8">
          <el-form-item label="Filter">
            <el-input
              v-model="filters"
              :loading="listLoading"
              placeholder="Name or Email"
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
        <el-button type="success" icon="el-icon-circle-plus" @click="addClient">
          Ajouter un client
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list.data"
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
        prop="users.id"
        sortable="custom"
        align="center"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Langue"
        min-width="75"
        prop="users.locale_id"
        sortable="custom"
        align="center"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.locale.iso.toUpperCase() }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Email"
        min-width="150"
        prop="users.email"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.email }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Client"
        min-width="200"
        prop="users.firstname"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.firstname }}
            {{ scope.row.lastname }}
          </span>
        </template>
      </el-table-column>

      <el-table-column min-width="75" align="center">
        <template slot-scope="scope">
          <el-row class="action-list">
            <el-button
              type="primary"
              size="small"
              @click="editClient(scope.row)"
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
      :meta="list.meta"
      :page-change="pageChange"
      :size-change="sizeChange"
    />
    <removal
      :on-delete="deleteUser"
      :show="confirmDeletion"
      :on-close="
        () => {
          confirmDeletion = false
        }
      "
      :delete-loading="deleteLoading"
    ></removal>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Paginator from '@/components/Paginator'
import Removal from '@/components/Removal'
import _ from 'lodash'

export default {
  name: 'ClientsList',
  components: { Removal, Paginator },
  data() {
    return {
      confirmDeletion: false,
      userToRemove: null,
      currentPage: 1,
      orderProp: 'users.id',
      order: 'asc',
      perPage: 10,
      filters: ''
    }
  },
  computed: {
    ...mapState('users', ['list', 'listLoading', 'deleteLoading'])
  },
  created() {
    this.debounceLoadData = _.debounce(this.loadData, 300)
  },
  mounted: function() {
    this.getList({})
    this.clearUser()
  },
  methods: {
    ...mapActions('users', ['getList', 'destroy', 'clearUser']),

    loadData() {
      this.getList({
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
    addClient() {
      this.$router.push('/clients/save')
    },
    editClient(user) {
      this.$router.push('/clients/save/' + user.id)
    },
    showDeleteModal(user) {
      this.userToRemove = user
      this.confirmDeletion = true
    },
    async deleteUser() {
      await this.destroy(this.userToRemove.id)
      this.confirmDeletion = false
      this.loadData()
    }
  }
}
</script>
