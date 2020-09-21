<template>
  <div class="aside-wrapper">
    <div class="aside-header">
      <router-link :to="{ name: 'home' }">
        <img width="100%" height="100%" src="@/assets/images/logo.png" />
      </router-link>
    </div>
    <el-menu :router="true" :default-active="$route.path.split('/')[0]">
      <template v-for="(menu, key) in menus">
        <template>
          <template v-if="menu.hasOwnProperty('subs')">
            <el-submenu :key="key.toString()" :index="key.toString()">
              <template slot="title">
                <i class="icon" :class="menu.icon" />
                <span class="hidden-collapsed">{{ menu.title }}</span>
              </template>
              <template v-for="(sub, subKey) in menu.subs">
                <el-menu-item
                  :key="key.toString() + '-' + subKey.toString()"
                  :index="sub.route"
                >
                  <i class="icon" :class="menu.icon" />
                  <span class="hidden-collapsed">{{ sub.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="key.toString()" :index="menu.route">
              <i class="icon" :class="menu.icon" />
              <span class="hidden-collapsed">{{ menu.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      menus: [
        {
          title: 'Accueil',
          icon: 'ion-ios-home',
          route: '/home'
        },
        {
          title: 'Dossiers',
          icon: 'ion-ios-albums',
          route: '/bookings'
        },
        {
          title: 'Clients',
          icon: 'ion-ios-people',
          route: '/clients'
        },
        {
          title: 'Options',
          icon: 'ion-ios-wine',
          route: '/options'
        },
        {
          title: 'Appareils',
          icon: 'ion-ios-pin',
          route: '/aircrafts'
        },
        {
          title: "Cat. d'appareils",
          icon: 'ion-ios-jet',
          route: '/flights/categories'
        },
        {
          title: 'Prestataires',
          icon: 'ion-ios-contacts',
          route: '/contractors'
        },
        {
          title: 'Paramètres',
          icon: 'ion-ios-settings',
          route: '/settings'
        },
        {
          title: 'Traductions',
          icon: 'ion-ios-flag',
          route: '/locales'
        }
      ]
    }
  },
  methods: {
    ...mapActions('common', ['toggleAside'])
  }
}
</script>

<style scoped lang="scss">
.el-menu {
  .icon {
    font-size: 1.2rem;
    margin-right: 15px;

    &:before {
      min-width: 25px;
      text-align: center;
    }
  }
}
</style>
