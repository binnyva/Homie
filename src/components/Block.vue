<template>
  <div :class="`block ${this.block.type}-block`">
    <div class="block-action-area" v-if="this.$store.getters.getEditMode()">
      <div class="block-action-holder">
        <a class="block-edit-action block-action" v-on:click="this.toggleEdit">{{ action_text }}</a>
        <span class="block-separator" v-if="editing">|</span>
        <a class="block-delete-action text-danger block-action" v-if="editing" v-on:click="this.deleteBlock">Delete</a>
      </div>
    </div>

    <input v-model="block.name" name="name" :disabled="!editing" class="block-name" v-on:keypress="this.handleKey" />
    <ul v-if="block.type === 'list'">
      <Item v-for="(item, index) in block.items" :key="index" :block_index="block_index" :item="item" :item_index="index"></Item>
    </ul>
    <div v-if="block.type === 'html'" v-html="block.html"></div>

    <NewItem :block_index="block_index" v-if="this.$store.getters.getEditMode()"></NewItem>
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
  },
  data: () => {
    return {
      editing: false,
      action_text: "Edit"
    }
  },
  methods: {
    handleKey: function(e) {
      if(e.keyCode === 13) {
        this.toggleEdit();
      }
    },
    toggleEdit: function () {
      if(this.editing) {
        this.editing = false
        this.action_text = "Edit"
        this.saveBlock()
      } else {
        this.action_text = "Save"
        this.editing = true
      }
    },

    deleteBlock: function() {
      if(confirm("Are you sure you wish to delete this Block?")) {
        this.$store.dispatch('DELETE_BLOCK', { block_index: this.block_index });
      }
    },

    saveBlock: function() {
      this.$store.dispatch('SET_BLOCK_BY_INDEX', { block_index: this.block_index, block: this.block });
    }
  }
}
</script>

<style>
.block {
  float: left;
  min-width: 10%;
  padding: 5px;
  border: 1px solid #999;
  margin: 5px;
  position: relative;
}
.list-block {
  width: 10%;
}

.block-action-area {
  position: absolute;
  text-align: right;
  width: 95%;
  display: none;
  margin: 0;
  padding: 0;
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
  margin: 0;
  padding: 0;
}
.block-name {
  background-color: transparent;
  font-size: x-large;
  border: 1px solid #666;
  color: #000;
  width: 100%
}
.block-name:disabled {
  border: 1px solid transparent;
}

</style>
 
