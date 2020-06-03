<template>
  <div class="settings-area">
    <div class="settings-button" v-on:click="this.toggleSetting" :is="this.gear"></div>
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
      gear: "b-icon-gear"
    }
  },
  methods: {
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
</style>
 
