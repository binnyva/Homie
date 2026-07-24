<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { VueDraggable } from "vue-draggable-plus";
import NewItem from "./NewItem.vue";
import BlockItem from "./BlockItem.vue";

/** @type {import("vue").Component} */
const Draggable = VueDraggable;

export default defineComponent({
  setup() {
    return {
      store: useStore(),
    };
  },
  data() {
    return {
      editing: false,
      actionText: "Edit",
    };
  },
  props: ["blockIndex", "block"],
  components: {
    NewItem,
    BlockItem,
    VueDraggable: Draggable,
  },
  methods: {
    handleKey(e) {
      if (e.keyCode === 13) {
        this.toggleEdit();
      }
    },
    toggleEdit() {
      if (this.editing) {
        this.editing = false;
        this.actionText = "Edit";
        this.saveBlock();
      } else {
        this.actionText = "Save";
        this.editing = true;
      }
    },

    saveOrder() {
      this.saveBlock();
    },

    deleteBlock() {
      if (confirm("Are you sure you wish to delete this Block?")) {
        this.store.deleteBlock(this.blockIndex);
      }
    },

    saveBlock() {
      this.store.setBlockByIndex(this.blockIndex, this.block);
    },
  },
});
</script>

<template>
  <div :class="`block ${block.type}-block`">
    <div class="block-action-area" v-if="store.getEditMode()">
      <div class="block-action-holder">
        <a class="block-edit-action block-action" v-on:click="toggleEdit">{{
          actionText
        }}</a>
        <span class="block-separator" v-if="editing">|</span>
        <a
          class="block-delete-action text-danger block-action"
          v-if="editing"
          v-on:click="deleteBlock"
          >Delete</a
        >
      </div>
    </div>

    <input
      v-model="block.name"
      name="name"
      :disabled="!editing"
      class="block-name"
      v-on:keypress="handleKey"
      v-show="block.name || editing"
    />
    <ul v-if="block.type === 'list'">
      <VueDraggable
        v-model="block.items"
        group="items"
        handle=".handle"
        @end="saveOrder"
      >
        <!-- v-model="block.items"> -->
        <BlockItem
          v-for="(item, index) in block.items"
          :key="index"
          :blockIndex="blockIndex"
          :item="item"
          :item_index="index"
        ></BlockItem>
      </VueDraggable>
    </ul>
    <div v-if="block.type === 'html'" v-html="block.html"></div>

    <NewItem :blockIndex="blockIndex" v-if="store.getEditMode()"></NewItem>
  </div>
</template>

<style>
.block {
  width: 15%;
  padding: 5px;
  /* border: 1px solid var(--bs-secondary-color); */
}

.block-action-area {
  position: absolute;
  display: none;
  margin: 0;
  padding: 0;
  right: 10px;
}
.block-action-holder {
  display: inline;
  padding: 0;
  margin: 0;
  background-color: #eee;
  border-radius: 3px;
}
.block:hover .block-action-area {
  display: block;
}
.block-separator {
  color: #999;
  font-size: xx-small;
}
.block-action {
  color: #999;
  font-size: xx-small;
  padding: 0 5px;
  display: inline;
}
.block ul {
  list-style: none;
  margin: 0 0 0 2px;
  padding: 0;
}
.block-name {
  background-color: transparent;
  font-size: x-large;
  border: 1px solid #666;
  color: var(--light);
  width: 100%;
}
.block-name:disabled {
  border: 1px solid transparent;
}
</style>
