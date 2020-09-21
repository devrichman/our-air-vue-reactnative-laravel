<template>
  <el-row>
    <el-form>
      <el-row class="filters" :gutter="10">
        <el-col :span="6">
          <el-form-item label="Client">
            <el-select
              v-model="filters.user_id"
              :loading="userListLoading"
              placeholder="Filtrer par client"
              clearable
              @change="filterData"
            >
              <el-option
                v-for="item in userList.data"
                :key="item.id"
                :label="item.firstname + ' ' + item.lastname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
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
      <el-table-column min-width="20" align="center">
        <template slot-scope="scope">
          <span>
            <service-icon :code="scope.row.service.code"></service-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Réservation"
        min-width="100"
        prop="bookings.created_at"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.created_at | datetime }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Client"
        min-width="150"
        prop="users.firstname"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.client.firstname }}
            {{ scope.row.client.lastname }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Statut"
        min-width="100"
        prop="status"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.status.label }}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="50" align="center">
        <template slot-scope="scope">
          <el-row class="action-list">
            <el-col :xs="24" :sm="24" :lg="12">
              <el-button size="small" @click="editBooking(scope.row.id)">
                <i class="icon ion-ios-eye"></i>
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12">
              <el-button
                type="danger"
                size="small"
                @click="showDeleteModal(scope.row.id)"
              >
                <i class="icon ion-ios-trash"></i>
              </el-button>
            </el-col>
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
      :on-delete="deleteBooking"
      :show="confirmDeletion"
      :on-close="
        () => {
          confirmDeletion = false
        }
      "
      :delete-loading="deleteLoading"
    />
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ServiceIcon from '@/components/ServiceIcon'
import Paginator from '@/components/Paginator'
import Removal from '@/components/Removal'
import _ from 'lodash'
import router from '@/router'

export default {
  name: 'BookingsList',
  components: { Paginator, ServiceIcon, Removal },
  data() {
    return {
      confirmDeletion: false,
      bookingIdToRemove: null,
      currentPage: 1,
      orderProp: 'bookings.created_at',
      order: 'asc',
      perPage: 10,
      filters: {}
    }
  },
  computed: {
    ...mapState('bookings', ['list', 'listLoading', 'deleteLoading']),
    ...mapState('users', { userList: 'list', userListLoading: 'listLoading' })
  },
  created() {
    this.debounceLoadData = _.debounce(this.loadData, 300)
  },
  mounted: function() {
    this.loadData()
    this.getUserList({})
  },
  methods: {
    ...mapActions('bookings', ['getList', 'destroy']),
    ...mapActions('users', { getUserList: 'getList' }),
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
    editBooking(bookingId) {
      return router.push({
        name: 'booking-save',
        params: {
          id: bookingId
        }
      })
    },
    showDeleteModal(bookingId) {
      this.bookingIdToRemove = bookingId
      this.confirmDeletion = true
    },
    async deleteBooking() {
      await this.destroy(this.bookingIdToRemove)
      this.confirmDeletion = false
      this.loadData()
    }
  }
}
</script>
