<template>
  <div class="settings-area">
    <div class="settings-button" v-on:click="this.toggleSetting" :is="this.gear"></div>

    <div class="settings-options" v-show="this.edit_mode">
      <button v-on:click="this.showImport" class="btn btn-secondary">Import Blocks</button><br />
      <button v-on:click="this.export" class="btn btn-secondary" title="Copies the JSON code for all blocks to clipboard">Export Blocks</button>
    </div>

    <div id="settings-dialog" class="modal modal-dialog-centered" tabindex="-1" role="dialog" v-show="this.import_export_mode">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3>{{ this.import_export_mode }} Blocks</h3>
            <textarea id="block-json" ref="textarea"></textarea><br />
            <p class="error-text" v-show="this.error">{{ this.error }}</p>
          </div>
          <div class="modal-footer">
            <button v-on:click="this.importExportAction" class="btn btn-secondary">{{ this.import_export_mode === "Import" ? "Import" : "Close" }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconGear, BIconGearFill } from 'bootstrap-vue'

export default {
  name: 'Settings',
  components: {
    BIconGear, BIconGearFill
  },
  data: () => {
    return {
      edit_mode: false,
      import_export_mode: false,
      gear: "b-icon-gear",
      error: null
    }
  },
  methods: {
    importExportAction() {
      if(this.import_export_mode === "Export") {
        this.import_export_mode = false;
        this.$refs.textarea.value = "";
        return true

      } else {
        const import_json = this.$refs.textarea.value
        try {
          const blocks = JSON.parse(import_json);
          if(confirm("This will replace ALL your current block and replace is with the blocks you are importing. Are you sure?")) {
            this.$store.dispatch('SET_BLOCKS', { blocks: blocks });
            window.location.reload()
          }
        } catch(e) {
          this.error = "Provided Import JSON is not valid JSON.";
        }
      }
    },

    showImport() {
      this.import_export_mode = "Import"
    },
    export() {
      const blocks = this.$store.getters.getAllBlocks()
      this.$refs.textarea.value = JSON.stringify(blocks)
      this.import_export_mode = "Export"
      this.$bvModal.show("#settings-dialog")
    },
    toggleSetting() {
      this.edit_mode = (this.edit_mode) ? false : true
      if(this.edit_mode) {
        this.gear = "b-icon-gear-fill"
      } else {
        this.gear = "b-icon-gear"
      }

      this.$store.dispatch('SET_EDIT_MODE', { edit_mode: this.edit_mode });
    }
  }
}
</script>

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
  width:100%;
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
 
