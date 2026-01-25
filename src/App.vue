<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
import DataBlock from "./components/DataBlock.vue";
import NewBlock from "./components/NewBlock.vue";
import AppSettings from "./components/AppSettings.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    store.load();
    return {
      store,
    };
  },
  components: {
    DataBlock,
    NewBlock,
    AppSettings,
  },
});
</script>

<template>
  <div id="root">
    <DataBlock
      v-for="(block, index) in store.blocks"
      :key="index"
      :block="block"
      :blockIndex="index"
    />
    <NewBlock v-if="store.getEditMode()"></NewBlock>

    <AppSettings></AppSettings>
  </div>
</template>

<style>
#root {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 10px;
  gap: 20px;
}
</style>
