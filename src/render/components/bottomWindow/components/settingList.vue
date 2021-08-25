<template>
  <div class="setting">
    <ul>
      <transition name="skin" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            effect="dark"
            content="切换皮肤"
            placement="left-start"
          >
            <svg-icon
              :class="{ light: modelIcon == 'moon' }"
              name="skin"
              @click="tabSkin"
              color="rgb(229, 229, 229)"
            />
          </el-tooltip>
        </li>
      </transition>
      <transition name="transparent" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            effect="dark"
            content="通透模式"
            placement="left-start"
          >
            <svg-icon
              :class="{ light: modelIcon == 'moon' }"
              :name="transparentIcon"
              color="rgb(229, 229, 229)"
              @click="transparent"
            />
          </el-tooltip>
        </li>
      </transition>
      <transition name="moon" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            effect="dark"
            :content="modelName"
            placement="left-start"
          >
            <svg-icon
              :class="{ light: modelIcon == 'moon' }"
              :name="modelIcon"
              @click="tabModel"
            />
          </el-tooltip>
        </li>
      </transition>
      <transition name="foldRight" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            effect="dark"
            :content="clock ? '隐藏时钟' : '显示时钟'"
            placement="left-start"
          >
            <svg-icon name="fold1" @click="foldRight"
          /></el-tooltip>
        </li>
      </transition>
      <!-- <transition name="foldLeft" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            style="transform: rotate(180deg)"
            effect="dark"
            content="隐藏TODO"
            placement="left-start"
          >
            <svg-icon name="fold1" @click="foldLeft"
          /></el-tooltip>
        </li>
      </transition> -->
      <transition name="lemon" mode="out-in">
        <li v-show="show">
          <el-tooltip
            class="item"
            effect="dark"
            content="柠檬TODO"
            placement="left-start"
          >
            <svg-icon name="lemon" @click="openInfo"
          /></el-tooltip>
        </li>
      </transition>
    </ul>
  </div>
  <softwareinfo :dialog-value="dialogStatus" @handledialog="changeDialog" />
</template>

<script>
// const { remote } = require("electron");
import Softwareinfo from "./softwareInfo.vue";
import { ElMessage } from "element-plus";
import { watch, ref, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    showStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    Softwareinfo,
  },
  setup(props) {
    const store = useStore();
    const bgColor = store.getters.bgColor;
    const show = ref(false);
    const clock = ref(true);
    const todo = ref(true);
    const dialogStatus = ref(false);
    const modelName = bgColor === "#fff" ? ref("夜间模式") : ref("白天模式");
    const modelIcon = bgColor === "#fff" ? ref("moon") : ref("light");
    const transparentIcon =
      bgColor === "transparent" ? ref("closetransparent") : ref("transparent");

    const tabModel = () => {
      transparentIcon.value = "transparent";
      const icon = modelIcon.value === "light" ? "moon" : "light";
      const lightName = modelIcon.value === "light" ? "夜间模式" : "白天模式";
      const color = modelIcon.value === "light" ? "#fff" : "#212121";
      modelIcon.value = icon;
      console.log(modelIcon.value);
      modelName.value = lightName;
      store.dispatch("skin/Changebgcolor", color);
    };

    const transparent = () => {
      if (store.getters.bgColor === "transparent") {
        store.dispatch("skin/Changebgcolor", "#212121");
        transparentIcon.value = "transparent";
        modelIcon.value = "light";
      } else {
        store.dispatch("skin/Changebgcolor", "transparent");
        transparentIcon.value = "closetransparent";
        modelIcon.value = "light";
      }
    };

    // foldRight
    const foldRight = () => {
      if (clock.value) {
        document.querySelector(".right").classList.add("foldRightAnimation");
        document.querySelector(".left").style.width = "97%";
        clock.value = false;
      } else {
        document
          .querySelector(".right")
          .classList.add("foldRightBackAnimation");
        document.querySelector(".left").style.width = "50%";
        clock.value = true;
      }

      /* var getSize = remote.getCurrentWindow().getSize();
      remote.getCurrentWindow().setSize(getSize[1] / 2, 630); */
    };

    const openInfo = () => {
      dialogStatus.value = true;
    };

    const changeDialog = () => {
      dialogStatus.value = false;
    };

    const tabSkin = () => {
      ElMessage("正在开发，稍安勿躁，黑色挺好...");
    };
    watch(
      () => props.showStatus,
      (status) => {
        show.value = status;
      }
    );
    return {
      show,
      modelName,
      modelIcon,
      tabModel,
      transparent,
      transparentIcon,
      foldRight,
      clock,
      dialogStatus,
      openInfo,
      changeDialog,
      tabSkin,
    };
  },
});
</script>
<style lang="scss">
.el-popper {
  user-select: none;
}
</style>
<style lang="scss">
.light {
  color: #212121 !important;
}
.setting {
  position: fixed;
  user-select: none !important;
  bottom: 38px;
  right: 12px;
  width: 45px;
  box-sizing: content-box;
  // background: rgb(229, 229, 229, 0.1);
  // border-radius: 16px;
  ul {
    list-style-type: none;
    width: 100%;
    padding: 5px;
    margin: 0;
    box-sizing: content-box;
    li {
      padding: 10px;
      margin: 0;
      box-sizing: content-box;
      svg {
        outline: 0 !important;
      }
    }
  }
}
</style>
