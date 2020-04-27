<template>
  <div class="block">
    <h3>{{ block.name }}</h3>
    <NewLine></NewLine>
  </div>
</template>

<script>
import NewLine from "./NewLine"
export default {
  name: 'Block',
  props: ["index", "block"],
  components: {
    NewLine
  },
  data: () => {
    return {
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
 
