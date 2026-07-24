<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    return {
      store: useStore(),
    };
  },
  data() {
    return {
      editMode: false,
      importExportMode: false,
      error: null,
    };
  },
  methods: {
    importExportAction() {
      if (this.importExportMode === "Export") {
        this.importExportMode = false;
        this.$refs.textarea.value = "";
        return true;
      } else {
        const importJson = this.$refs.textarea.value;
        try {
          const blocks = JSON.parse(importJson);
          if (
            confirm(
              "This will replace ALL your current block and replace is with the blocks you are importing. Are you sure?"
            )
          ) {
            this.store.setBlocks(blocks);
            this.store.save();
            this.importExportMode = false;
          }
        } catch {
          this.error = "Provided Import JSON is not valid JSON.";
        }
      }
    },

    showImport() {
      this.importExportMode = "Import";
    },
    showExport() {
      this.importExportMode = "Export";
      const blocks = this.store.blocks;
      this.$refs.textarea.value = JSON.stringify(blocks);

      // Copy the JSON to clipboard
      this.$refs.textarea.select();
      document.execCommand("copy");
      this.error = "Block JSON copied to clipboard automatically.";
    },
    toggleSetting() {
      this.editMode = this.editMode ? false : true;

      this.store.setEditMode(this.editMode);
    },
  },
});
</script>

<template>
  <div class="settings-area">
    <div class="settings-button" v-on:click="toggleSetting">
      <i
        :class="{
          bi: true,
          'bi-gear': !editMode,
          'bi-gear-fill': editMode,
        }"
      ></i>
    </div>

    <div class="settings-options" v-show="editMode">
      <button v-on:click="showImport" class="btn btn-secondary">
        Import Blocks</button
      ><br />
      <button
        v-on:click="showExport"
        class="btn btn-secondary"
        title="Copies the JSON code for all blocks to clipboard"
      >
        Export Blocks
      </button>
    </div>

    <div
      id="settings-dialog"
      class="modal modal-dialog-centered"
      tabindex="-1"
      role="dialog"
      v-show="importExportMode"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3>{{ importExportMode }} Blocks</h3>
            <textarea id="block-json" ref="textarea"></textarea><br />
            <p class="error-text" v-show="error">{{ error }}</p>
          </div>
          <div class="modal-footer">
            <button v-on:click="importExportAction" class="btn btn-secondary">
              {{ importExportMode === "Import" ? "Import" : "Close" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.settings-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.settings-options {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
h3 {
  color: var(--dark);
}
#settings-dialog textarea {
  width: 100%;
  height: 200px;
  font-size: 80%;
}
.modal-dialog {
  width: 600px !important;
}
.settings-options button {
  margin-bottom: 5px;
}
</style>
