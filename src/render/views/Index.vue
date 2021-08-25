<template>
  <movearea />
  <rightwindow />
  <div class="content">
    <div class="left">
      <todo />
    </div>
    <div class="right">
      <clock />
    </div>
  </div>
  <bottomwindow />
</template>

<script lang="ts">
import movearea from "../components/MoveArea/index.vue";
import todo from "../components/Todo/index.vue";
import Rightwindow from "../components/RightWindow/index.vue";
import Bottomwindow from "../components/BottomWindow/index.vue";
import Clock from "../components/Clock/index.vue";
import { reactive, computed, ComputedRef } from "vue";
const version = require("process").versions.electron;
import { defineComponent } from "vue";

interface State {
  count: number;
  double: ComputedRef<number> | number;
  version: string;
}

export default defineComponent({
  name: "Index",
  components: {
    Clock,
    Rightwindow,
    Bottomwindow,
    movearea,
    todo,
  },
  setup() {
    const state: State = reactive({
      count: 0,
      double: computed(() => state.count * 2),
      version: version,
    } as State);

    function increment() {
      state.count++;
    }

    return {
      state,
      increment,
    };
  },
});
</script>

<style lang="scss" scoped>
.logo-box {
  width: 20%;
  margin-left: 130px;
}
.success {
  background: #00c13c;
  border: none;
  border-radius: 10px;
  padding: 10px 80px;
  color: #fff;
  text-decoration: none;
}
.content {
  height: calc(100% - 45px);
  width: 100%;
  position: absolute;
  top: 45px;
  overflow: hidden;
}
.left {
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease-in;
}
.right {
  width: 50%;
  height: 100%;
  float: right;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  transition: all 1s ease;
}
.foldRightAnimation {
  transform: translate3d(100%, 0, 0);
  transition: all 0.5s ease-in;
}
.foldRightBackAnimation {
  transform: translate3d(0, 0, 0);
  transition: all 0.5s ease-in;
}
.foldLeftAnimation {
  transform: translate3d(-100%, 0, 0);
  transition: all 0.5s ease-in;
}
.foldLeftBackAnimation {
  transform: translate3d(0, 0, 0);
  transition: all 0.5s ease-in;
}
</style>
