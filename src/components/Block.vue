<template>
  <div class="block">
    <h4>{{ block.name }}</h4>
    <ul v-if="block.type === 'list'">
      <Item v-for="(item, index) in block.items" :key="index" :item="item" :index="index"></Item>
    </ul>
    <div v-if="block.type === 'html'" v-html="block.html"></div>

    <NewItem :block_index="index"></NewItem>
  </div>
</template>

<script>
import NewItem from "./NewItem"
import Item from "./Item"
export default {
  name: 'Block',
  props: ["index", "block"],
  components: {
    NewItem,
    Item
  }
}
</script>

<style>

</style>
 
