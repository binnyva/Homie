<template>
  <div id="root">
    <Block v-for="(block, index) in this.blocks" :key="index" :block="block" :block_index="index"></Block>
    <NewBlock v-if="this.$store.getters.getEditMode()"></NewBlock>

    <Settings></Settings>
  </div>
</template>

<script>
import Block from './components/Block.vue'
import NewBlock from './components/NewBlock.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'App',
  components: {
    Block,
    NewBlock,
    Settings
  },
  data: () => {
    return {
      blocks: []
    }
  },
  created() {
    this.$store.dispatch('LOAD')
    this.blocks = this.$store.getters.getAllBlocks()
    console.log(this.blocks)
  }
}
</script>

<style>
body {
  color: var(--light) !important;
  background-color: #222 !important;
}
a {
  cursor: pointer;
  color: var(--info) !important;
}
</style>
