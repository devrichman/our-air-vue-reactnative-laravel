<template>
  <div class="not-found">
    <el-row>
      <el-col class="logo">
        <img height="200px" src="@/assets/images/logo-black.png" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" justify="center">
      <el-col>
        <h1>
          Cette page n'existe pas ou la fonctionnalité n'est pas encore
          implémentée.
        </h1>
        <router-link to="home">Retour à la page d'accueil</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  margin: 0 auto;
  text-align: center;
  padding-top: 250px;
}
</style>
