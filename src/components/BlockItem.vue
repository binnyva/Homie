<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  props: ["itemIndex", "item", "blockIndex"],
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
  methods: {
    handleKey(e) {
      if (e.keyCode === 13) {
        this.toggleEdit();
      }
    },
    toggleEdit() {
      if (this.editing) {
        this.actionText = "Edit";
        this.editing = false;
        // :TODO: if edited
        this.saveItem();
      } else {
        this.actionText = "Save";
        this.editing = true;
      }
    },

    deleteItem() {
      if (confirm("Are you sure you wish to delete this item?")) {
        this.store.deleteItem(this.blockIndex, this.itemIndex);
        this.actionText = "Edit";
        this.editing = false;
      }
    },

    saveItem() {
      this.store.setItem(this.blockIndex, this.itemIndex, this.item);
    },
  },
});
</script>

<template>
  <li class="item">
    <span v-if="item.type === 'link'">
      <a class="item-name" v-bind:href="item.url">{{ item.name }}</a>
      <a
        class="item-edit-action item-action"
        v-on:click="toggleEdit"
        v-if="store.getEditMode()"
        >{{ actionText }}</a
      >
      <span class="item-action" v-if="editing">|</span>
      <a
        class="item-delete-action text-danger item-action"
        v-if="editing"
        v-on:click="deleteItem"
        >Delete</a
      >
      <form class="item-edit-area" v-if="editing">
        <input
          type="text"
          class="input-text col-4 float-left"
          v-model="item.name"
          v-on:keypress="handleKey"
        />
        <input
          type="text"
          class="input-text col-8 float-left"
          v-model="item.url"
          v-on:keypress="handleKey"
        />
      </form>
    </span>
    <span v-if="item.type === 'html'" v-html="item.html"></span>

    <i class="handle bi bi-list" v-if="store.getEditMode()"></i>
  </li>
</template>

<style>
a.item-name {
  color: var(--bs-link-color);
  text-decoration: none;
}
.item-action {
  color: #999;
  font-size: xx-small;
  padding-left: 5px;
  display: none;
}
.item:hover .item-action {
  display: inline;
}
.input-text {
  padding: 0 !important;
}
.handle {
  float: right;
}
</style>
