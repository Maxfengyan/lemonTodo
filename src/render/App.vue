<template>
  <router-view></router-view>
</template>

<script lang="ts">
const { ipcRenderer } = require("electron");
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { mapGetters, useStore } from "vuex";
export default defineComponent({
  name: "app",
  computed: {
    ...mapGetters(["bgColor"]),
  },
  watch: {
    bgColor(val) {
      document.querySelector("#app").style.background = val;
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    router.push("/");
    ipcRenderer.invoke("store:get", "color").then((res) => {
      if (res) {
        store.dispatch("skin/Changebgcolor", res);
      }
    });
  },
});
</script>
<style lang="scss">
@import "./style/variable.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 15px;
  // background: transparent;
  border-radius: 16px !important;
}
html {
  border-radius: 16px;
  // background: transparent;
}
#app {
  width: 100vw;
  height: 100vh;
  background: $bgColor;
  border-radius: 16px;
  // transition: all 0.6s ease;
  overflow: hidden;
}
</style>
