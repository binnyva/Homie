import { defineStore } from 'pinia'

type Block = {
  items: Item[]
}
type Item = {
  name: string
  url: string
}

export const useStore = defineStore('main', {
  state: () => ({
    blocks: [] as Block[],
    editMode: false
  }),

  getters: {
    getAllBlocks: (state) => () => {
      return state.blocks
    },

    getBlockByIndex: (state) => (index: number) => {
      return state.blocks[index]
    },

    getEditMode: (state) => () => {
      return state.editMode
    }
  },

  actions: {
    setBlocks(blocks: Block[]) {
      this.blocks = blocks
      this.save()
    },

    setBlockByIndex(index: number, block: Block) {
      this.blocks[index] = block
      this.save()
    },

    addBlock(block: Block) {
      this.blocks.push(block)
      this.save()
    },

    deleteBlock(index: number) {
      this.blocks = this.blocks.splice(index, 1)
      this.save()
    },

    addItem(blockIndex: number, item: Item) {
      this.blocks[blockIndex].items.push(item)
      this.save()
    },

    setItem(blockIndex: number, itemIndex: number, item: Item) {
      this.blocks[blockIndex].items[itemIndex] = item
      this.save()
    },

    deleteItem(blockIndex: number, itemIndex: number) {
      this.blocks[blockIndex].items = this.blocks[blockIndex].items.splice(itemIndex, 1)
      this.save()
    },

    setEditMode(editMode: boolean) {
      this.editMode = editMode
    },

    save() {
      window.localStorage.setItem('blocks', JSON.stringify(this.blocks))
    },

    load() {
      const blocks = JSON.parse(window.localStorage.getItem('blocks') ?? '{}')
      this.blocks = blocks
    }
  }
})
