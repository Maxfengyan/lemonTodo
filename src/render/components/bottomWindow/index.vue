<template>
  <div class="bottomWindow">
    <svg-icon
      :class="{ light: bgColor == '#fff' }"
      name="setting"
      color="e5e5e5"
      @click="shwoSetting"
    />
    <settinglist :show-status="status" />
  </div>
</template>

<script>
import Settinglist from "./components/settingList.vue";
import { ref } from "vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Settinglist,
  },
  computed: {
    ...mapGetters(["bgColor"]),
  },
  setup() {
    const status = ref(false);

    const shwoSetting = () => {
      status.value = !status.value;
    };

    return {
      status,
      shwoSetting,
    };
  },
};
</script>

<style lang="scss">
.bottomWindow {
  position: fixed;
  right: 6px;
  bottom: 8px;
  z-index: 9999;
  svg {
    width: 20px;
    height: 20px;
    margin: 0 3px;
    border-radius: 50%;
    padding: 5px;
    transition: all 0.5s ease;
    box-sizing: content-box;
  }
  svg:hover {
    background: #cccbcb;
    color: #212121 !important;
  }
}
</style>
