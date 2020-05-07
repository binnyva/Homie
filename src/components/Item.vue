<template>
  <li class="item">
    <span v-if="item.type === 'link'">
      <a v-bind:href="item.url">{{ item.name }}</a>
      <a class="item-edit-action" v-on:click="this.toggleEdit">{{ action_text }}</a>
      <form class="item-edit-area" v-if="editing">
        <input type="text" class="input-text col-4 float-left" v-model="item.name" v-on:keypress="this.handleKey" />
        <input type="text" class="input-text col-8 float-left" v-model="item.url" v-on:keypress="this.handleKey" />
      </form>
    </span>
    <span v-if="item.type === 'html'" v-html="item.html"></span>
  </li>
  
</template>

<script>
export default {
  name: 'Item',
  props: ["item_index", "item", "block_index"],
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
        this.action_text = "Edit"
        this.editing = false
        // :TODO: if edited
        this.saveItem()
      } else {
        this.action_text = "Save"
        this.editing = true
      }
    },

    saveItem: function() {
      this.$store.dispatch('SET_ITEM', { block_index: this.block_index, index: this.index, item: this.item });
    }
  }
}
</script>

<style>
.item-edit-action {
  color: #999;
  font-size: xx-small;
  padding-left: 5px;
  display: none;
}
.item:hover .item-edit-action {
  display: inline;
}
.input-text {
  padding:0 !important;
}
</style>
 
