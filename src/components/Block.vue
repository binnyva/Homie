<template>
  <div class="block">
    <h4>{{ block.name }}</h4>
    <ul v-if="block.type === 'list'">
      <Item v-for="(item, index) in block.items" :key="index" :block_index="block_index" :item="item" :item_index="index"></Item>
    </ul>
    <div v-if="block.type === 'html'" v-html="block.html"></div>

    <NewItem :block_index="block_index"></NewItem>
  </div>
</template>

<script>
import NewItem from "./NewItem"
import Item from "./Item"
export default {
  name: 'Block',
  props: ["block_index", "block"],
  components: {
    NewItem,
    Item
  }
}
</script>

<style>
.block ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
 
