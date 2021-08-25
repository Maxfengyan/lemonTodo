<template>
  <div class="todo">
    <el-scrollbar always>
      <section class="content">
        <span
          v-for="(item, index) in inputArr"
          class="input input--hoshi"
          :class="{ 'input--filled': item.value }"
        >
          <svg-icon
            v-show="!item.status"
            class="square"
            name="square"
            @click="overTodo(index, $event)"
          />
          <svg-icon
            v-show="item.progress"
            class="square"
            style="z-index: 90"
            name="over"
          />
          <div class="input-icons">
            <i
              v-show="item.status"
              class="el-icon-check"
              @click="confirm(index)"
            ></i>
            <i
              :class="{ transform: !item.status }"
              class="el-icon-close"
              @click="handleSwitch(item.status, index)"
            ></i>
          </div>

          <input
            v-show="item.status"
            class="input__field input__field--hoshi"
            :class="{ 'input--filled': item.value }"
            type="text"
            spellcheck="false"
            v-model="item.value"
            placeholder="今天都要做什么呢？"
            @focus="inputFocus"
            @blur="inputBlur"
            @keydown.enter="confirm(index)"
          />
          <span
            v-show="!item.status"
            :class="{ overSpan: item.progress }"
            @click="edit(index, $event)"
            class="input__field input__field--hoshi input-span"
            >{{ item.value }}</span
          >
          <label class="input__label input__label--hoshi" :class="item.class">
            <span class="input__label-content input__label-content--hoshi"
              >{{ index + 1 }}.</span
            >
          </label>
        </span>
      </section>
    </el-scrollbar>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { addClass, removeClass } from "../../plugin/input/index";
import { onMounted, reactive, nextTick, ref, watch } from "vue";
export default {
  setup() {
    let inputArr = ref([
      {
        value: "",
        status: true,
        progress: false,
        class: {
          "input__label--hoshi-color-1": true,
        },
      },
    ]);

    // ipcRenderer.send("store:set", { key: "color", value: bgColor });
    ipcRenderer.invoke("store:get", "inputdata").then((res) => {
      if (res) {
        inputArr.value = JSON.parse(res);
      } else {
        setInputArr(inputArr.value);
      }
    });

    function setInputArr(inputArr) {
      ipcRenderer.send("store:set", {
        key: "inputdata",
        value: JSON.stringify(inputArr),
      });
    }

    // 确认
    const confirm = (index) => {
      if (!!inputArr.value[index].value) {
        inputArr.value[index].status = false;
        setInputArr(inputArr.value);
      }
    };
    const inputFocus = (el) => {
      addClass(el.target.parentNode, "input--filled");
    };
    const inputBlur = (el) => {
      if (el.target.value.trim() === "") {
        removeClass(el.target.parentNode, "input--filled");
      }
    };

    // 删除&&新增
    const handleSwitch = (status, index) => {
      // 新增
      var allLength = inputArr.value.length;
      if (!status) {
        if (inputArr.value[allLength - 1].value) {
          inputArr.value.push({
            index: index + 1,
            value: "",
            status: true,
            class: {
              ["input__label--hoshi-color-" + (allLength + 1)]: true,
            },
          });
        }
      } else {
        // 删除
        if (index > 0) {
          inputArr.value.splice(index, 1);
        } else {
          if (index == 0 && inputArr.value.length > 1) {
            inputArr.value.splice(index, 1);
          } else {
            inputArr.value[index].value = "";
          }
        }
      }
      setInputArr(inputArr.value);
    };

    const edit = async (index, event) => {
      inputArr.value[index].status = true;
      inputArr.value[index].progress = false;
      await nextTick();
      event.target.parentNode.querySelector("input").focus();
      setInputArr(inputArr.value);
    };
    // overTodo
    const overTodo = async (index, event) => {
      inputArr.value[index].progress = !inputArr.value[index].progress;
      if (!inputArr.value[index].progress) {
        inputArr.value[index].status = true;
        await nextTick();
        event.target.parentNode.querySelector("input").focus();
      }
      setInputArr(inputArr.value);
    };
    return {
      inputArr,
      confirm,
      handleSwitch,
      inputFocus,
      inputBlur,
      overTodo,
      edit,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.input-icons {
  position: absolute;
  right: 0;
  bottom: 1.2rem;
  font-size: 1.7rem;
  color: #b1b1b1;
  z-index: 100;
  i:nth-child(1) {
    margin-right: 0.2rem;
  }
  i {
    padding: 3px;
    transition: all 0.5s ease;
    border-radius: 50%;
    font-weight: bold;
    opacity: 0.8;
  }
  i:hover {
    // background: rgba(204, 203, 203,0.7);
    // background: rgba(255, 255, 255, 0.3);
    transform: scale(1.2);
    opacity: 1;
    color: #fae101 !important;
  }
}
section {
  overflow: hidden;
}
.input-span {
  cursor: default;
  text-overflow: ellipsis;
  padding-left: 4rem;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.6s ease;
}
.transform {
  transform: rotate(45deg) !important;
}
.square {
  position: absolute;
  left: 2rem;
  bottom: 0.8rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 100;
}
.overSpan {
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>
