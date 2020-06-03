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
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  cursor: pointer;
}
</style>
