<template>
  <el-row
    v-if="meta !== undefined && meta.total > 10"
    type="flex"
    justify="end"
    class="mt-10"
  >
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :total="meta.total"
      :current-page="meta.current_page"
      :page-sizes="[10, 20, 50]"
      @current-change="pageChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    meta: {
      type: Object,
      default: () => {}
    },
    pageChange: {
      type: Function,
      default: () => {}
    },
    sizeChange: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
