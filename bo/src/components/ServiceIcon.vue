<template>
  <i
    class="icon"
    :class="'ion-ios-' + getIcon()"
    :style="'font-size: ' + size + 'px'"
  />
</template>

<script>
export default {
  name: 'ServiceIcon',
  props: {
    code: {
      type: String,
      default: 'help'
    },
    size: {
      type: Number,
      default: 25
    }
  },
  methods: {
    getIcon() {
      switch (this.code) {
        case 'flight':
          return 'jet'
        case 'car':
          return 'car'
        case 'yacht':
          return 'boat'
        case 'helicopter':
          return 'nuclear'
        default:
          return 'help'
      }
    }
  }
}
</script>
