<script>
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import DataBlock from './components/DataBlock.vue'
import NewBlock from './components/NewBlock.vue'
import AppSettings from './components/AppSettings.vue'

export default defineComponent({
  setup() {
    return {
      store: useStore()
    }
  },
  data() {
    return {
      blocks: []
    }
  },
  components: {
    DataBlock,
    NewBlock,
    AppSettings
  },
  created() {
    this.store.load()
    this.blocks = this.store.getAllBlocks()
    console.log(this.blocks)
  }
})
</script>

<template>
  <div id="root">
    <DataBlock
      v-for="(block, index) in this.blocks"
      :key="index"
      :block="block"
      :blockIndex="index"
    />
    <NewBlock v-if="this.store.getEditMode()"></NewBlock>

    <AppSettings></AppSettings>
  </div>
</template>
