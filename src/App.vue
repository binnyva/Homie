<template>
  <div id="root">
    <Block v-for="(block, index) in this.blocks" :key="index" :block="block" :block_index="index"></Block>
    <NewBlock></NewBlock>
  </div>
</template>

<script>
import Block from './components/Block.vue'
import NewBlock from './components/NewBlock.vue'

export default {
  name: 'App',
  components: {
    Block,
    NewBlock
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
.block {
  width: 300px;
  padding: 5px;
  border: 2px solid #333;
  margin: 5px;
}
a {
  cursor: pointer;
}
</style>
