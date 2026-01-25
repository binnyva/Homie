<template>
  <div class="new-item item">
    <a class="new-item-prompt" v-if="!show_form" v-on:click="toggleForm"> + </a>

    <div class="new-item-form" v-if="show_form">
      <form v-on:submit="handleSubmit">
        <!-- :TODO: Type should be tabs. And there should be a divider type -->
        <select class="form-control" v-model="type" v-on:change="changeType">
          <option value="link">Type: Link</option>
          <option value="html">Type: HTML</option>
        </select>
        <div v-if="type === 'link'">
          <input
            type="text"
            placeholder="URL"
            class="form-control"
            v-model="url"
            ref="url"
            v-on:keyup="guessName"
          />
          <input
            type="text"
            placeholder="Text"
            class="form-control"
            v-model="name"
          />
        </div>
        <div v-if="type === 'html'">
          <textarea rows="5" class="form-control" v-model="html"></textarea>
        </div>
        <input type="submit" class="btn btn-primary btn-sm" value="Save" />
        <input
          type="button"
          class="btn btn-secondary btn-sm float-right"
          value="Cancel"
          v-on:click="toggleForm"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "NewItem",
  props: ["blockIndex"],
  setup() {
    return {
      store: useStore(),
    };
  },
  data: () => {
    return {
      name: "",
      url: "http://",
      html: "",
      type: "link",
      show_form: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const item = {
        name: this.name,
        url: this.url,
        html: this.html,
        type: this.type,
      };
      this.store.addItem(this.blockIndex, item);
      this.name = "";
      this.url = "http://";
      this.html = "";
      this.type = "link";
      this.toggleForm();
    },
    toggleForm() {
      this.show_form = this.show_form ? false : true;
      if (this.show_form) {
        const that = this;
        window.setTimeout(function () {
          that.$refs.url.focus();
        }, 200); // Wait a bit of time for the form to be created.
      }
    },

    guessName() {
      const matches = this.url.match(/https?:\/\/([^.]+).*/);
      let new_name = "";
      if (matches) new_name = matches[1];
      if (!this.name) {
        // :TODO: If no name, fetch the title of the given URL
        this.name = new_name[0].toUpperCase() + new_name.slice(1);
      } else if (new_name.toLowerCase().includes(this.name.toLowerCase()))
        this.name = new_name[0].toUpperCase() + new_name.slice(1);
    },

    changeType() {
      console.log(this.type);
    },
  },
});
</script>

<style>
.new-item-form {
  border: 1px solid #ddd;
  padding: 5px;
}
.new-item-prompt {
  text-decoration: none;
  color: #aaa;
}
</style>
