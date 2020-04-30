<template>
  <li class="item">
    <span v-if="item.type === 'link'">
      <a v-bind:href="item.url">{{ item.name }}</a>
    </span>
    <span v-if="item.type === 'html'" v-html="item.html"></span>
  </li>
  
</template>

<script>
export default {
  name: 'Item',
  props: ["index", "item", "block_index"]
}
</script>

<style>

</style>
 
