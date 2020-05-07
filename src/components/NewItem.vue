<template>
  <div class="new-item item">
    <a class="new-item-prompt" v-if="!show_form" v-on:click="this.toggleForm"> + </a>

    <div class="new-item-form" v-if="show_form">
      <form v-on:submit="this.handleSubmit">
        <select class="form-control" v-model="type">
          <option value="link">Type: Link</option>
          <option value="html">Type: HTML</option>
          </select>
        <div v-if="this.type === 'link'">
            <input type="text" placeholder="URL" class="form-control" v-model="url" />
            <input type="text" placeholder="Text" class="form-control" v-model="name" />
        </div>
        <div v-if="this.type === 'html'">
            <textarea rows="5" class="form-control" v-model="html"></textarea>
        </div>
        <input type="submit" class="btn btn-primary btn-sm" value="Save" />
        <input type="button" class="btn btn-secondary btn-sm float-right" value="Cancel" v-on:click="this.toggleForm" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewItem',
  props: ["block_index"],
  data: () => {
    return {
      name: "",
      url: "http://",
      html: "",
      type: "link",
      show_form: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const item = {
        name: this.name,
        url: this.url,
        html: this.html,
        type: this.type
      }
      this.$store.dispatch('ADD_ITEM', { item, block_index: this.block_index });
      this.toggleForm();
    },
    toggleForm() {
      this.show_form = (this.show_form) ? false : true
      if(this.show_form) {
        // :TODO: Focus on the URL field.
      }
    }
  }
}
</script>

<style>
.new-item-form {
  border: 1px solid #ddd;
  padding: 5px;
}
.new-item-prompt {
  color: #aaa;
}
</style>
 
