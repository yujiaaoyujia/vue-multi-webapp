<template>
  <article id="home">
    <VanDropdownMenu>
      <VanDropdownItem v-model="value" :options="option"></VanDropdownItem>
    </VanDropdownMenu>
  </article>
</template>

<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem } from 'vant'

Vue.use(DropdownMenu).use(DropdownItem)

export default {
  name: 'home',
  data() {
    return {
      value: 1,
      option: [
        { text: '选项A', value: 1 },
        { text: '选项B', value: 2 },
        { text: '选项C', value: 3 },
      ],
    }
  },

  components: {
    VanDropdownMenu: DropdownMenu,
    VanDropdownItem: DropdownItem,
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/var'

.test {
  display: block
  width: 750px
  height: 300px
  background: $blue
  &.ignore {
    max-height: 200px
  }
}
</style>
