<template>
  <el-row>
    <el-col :span="4">
      <h1>Club Airways</h1>
    </el-col>
    <el-col :span="1" :offset="19">
      <el-button size="medium" :loading="logoutLoading" @click="logout">
        <i v-if="!logoutLoading" class="icon ion-ios-log-out"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['logoutLoading'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
