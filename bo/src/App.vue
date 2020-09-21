<template>
  <div id="app">
    <el-row
      v-if="booting"
      v-loading="booting"
      type="flex"
      align="center"
      justify="center"
      class="booting"
    >
      <el-col>
        <h2>Chargement de l'application</h2>
      </el-col>
    </el-row>
    <component :is="layout" v-else v-loading="globalLoading">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('common', ['booting', 'globalLoading']),
    layout() {
      return (this.$route.meta.layout || 'default') + '-layout'
    }
  }
}
</script>

<style lang="scss">
.booting {
  flex: 1;
  /*background-image: url('~@/assets/images/background.jpg');*/
  /*background-size: cover;*/

  .el-col {
    align-self: center;
    text-align: center;
  }

  .el-loading-mask {
    margin-top: -10%;
  }
}
</style>
