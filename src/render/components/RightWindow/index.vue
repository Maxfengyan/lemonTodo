<template>
  <div id="rightWindow">
    <svg-icon
      :class="{ light: bgColor == '#fff' }"
      name="mini"
      color="#e5e5e5"
      @click="minisize"
    />
    <svg-icon
      :class="{ light: bgColor == '#fff' }"
      name="fullscreen"
      color="#e5e5e5"
      @click="largest"
    />
    <svg-icon
      :class="{ light: bgColor == '#fff' }"
      name="close"
      color="#e5e5e5"
      @click="close"
    />
  </div>
</template>

<script>
const { remote, app, ipcRenderer } = require("electron");
import { mapGetters } from "vuex";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
export default {
  computed: {
    ...mapGetters(["bgColor"]),
  },
  setup() {
    remote.getCurrentWindow().setResizable(true);
    const largestValue = ref(false);
    const minisize = () => {
      remote.getCurrentWindow().minimize();
    };
    const largest = () => {
      if (!largestValue.value) {
        remote.getCurrentWindow().maximize();
        largestValue.value = true;
      } else {
        remote.getCurrentWindow().unmaximize();
        largestValue.value = false;
      }
    };

    const close = () => {
      ElMessageBox.confirm("确定要关闭吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ipcRenderer.send("destroyed");
      });
    };
    return { minisize, largest, close };
  },
};
</script>

<style lang="scss">
#rightWindow {
  position: fixed;
  box-sizing: content-box;
  right: 6px;
  top: 8px;
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
