<template>
  <el-container>
    <el-aside>
      <v-aside />
    </el-aside>
    <el-container>
      <el-header>
        <v-header />
      </el-header>
      <el-container>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import VAside from '@/screens/Aside'
import VHeader from '@/screens/Header'

export default {
  components: {
    VAside,
    VHeader
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables';
.el-main {
  background-color: rgba($color-main, 0.05);
}
</style>
