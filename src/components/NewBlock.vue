<template>
  <div class="new-block block">
    <div class="new-block-prompt" v-if="!show_form" v-on:click="this.toggleForm"> + </div>

    <div class="new-block-form" v-if="show_form">
      <form v-on:submit="this.handleSubmit">
        <input type="text" placeholder="Name" class="form-control" id="block-name" v-model="name" />
        <select class="form-control" v-model="type">
          <option value="list">List Block</option>
          <option value="free">Free Style</option>
          </select>
        <input type="submit" class="btn btn-primary btn-sm" value="Save" />
        <input type="button" class="btn btn-secondary btn-sm float-right" value="Cancel" v-on:click="show_form = false" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewBlock',
  data: () => {
    return {
      name: "",
      type: "list",
      show_form: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const block = {
        name: this.name,
        type: this.type,
        items: []
      }
      this.$store.dispatch('ADD_BLOCK', block);
      this.toggleForm();
    },
    toggleForm() {
      this.show_form = (this.show_form) ? false : true
    }
  }
}
</script>

<style>
.new-block {
  border: 2px dashed #aaa !important;
  cursor: pointer;
}
.new-block-prompt {
  text-align: center;
  font-size: 2em;
  color: #aaa;
}
</style>
 
