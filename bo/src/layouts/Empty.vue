<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" class="mb-30">
        <el-col :xs="12" :sm="9" :md="6" :lg="3">
          <img
            width="100%"
            height="100%"
            src="@/assets/images/logo-black.png"
          />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :md="12" :lg="6">
          <slot />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables';
.el-container {
  background-color: $color-main;
  justify-content: center;
  align-items: center;

  .el-main {
    background-color: $color-white;
  }
}
</style>
