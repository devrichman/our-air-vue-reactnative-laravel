<template>
  <el-dialog :title="title" :visible="show" width="30%" @close="onClose">
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button :loading="deleteLoading" :type="type" @click="onDelete">
            Confirmer
          </el-button>
          <el-button type="text" @click="onClose">Annuler</el-button>
        </el-col>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Removal',
  props: {
    title: {
      type: String,
      default: 'Veuillez confirmer la suppression'
    },
    type: {
      type: String,
      default: 'danger'
    },
    show: {
      type: Boolean,
      default: false
    },
    onDelete: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    deleteLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
