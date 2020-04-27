<template>
  <div class="new-line line">
    <div class="new-line-prompt" v-if="!show_form" v-on:click="this.toggleForm"> + </div>
    <div class="new-line-form" v-if="show_form">
      <form v-on:submit="this.handleSubmit">
        <label>Type</label>
        <select class="form-control" v-model="line_type">
          <option value="link">Link</option>
          <option value="html">HTML</option>
          </select>
        <div v-if="this.line_type === 'link'">
            <input type="text" placeholder="URL" class="form-control" v-model="line_url" />
            <input type="text" placeholder="Text" class="form-control" v-model="line_name" />
        </div>
        <div v-if="this.line_type === 'html'">
            <textarea rows="5" class="form-control" v-model="line_html"></textarea>
        </div>
        <input type="submit" class="btn btn-primary" value="Save" />
        <input type="button" class="btn btn-secondary float-right" value="Cancel" v-on:click="this.toggleForm" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newline',
  data: () => {
    return {
      line_name: "",
      line_url: "http://",
      line_html: "",
      line_type: "link",
      show_form: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

    },
    toggleForm() {
      this.show_form = (this.show_form) ? false : true
    }
  }
}
</script>

<style>

</style>
 
