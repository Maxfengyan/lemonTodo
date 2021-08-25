<template>
  <el-dialog
    v-model="dialogVisible"
    width="80%"
    :before-close="handleClose"
    style="height: 100%"
  >
    <el-scrollbar>
      <el-timeline>
        <el-timeline-item
          placement="top"
          icon="el-icon-info"
          type="success"
          size="large"
          timestamp="2021-07-25"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>软件信息</span>
                <el-tag
                  type="success"
                  class="card-tag"
                  effect="dark"
                  size="small"
                >
                  V0.0.1
                </el-tag>
              </div>
            </template>
            <div class="box-body">
              <el-row>
                <el-col :span="12">
                  <span
                    >name: &nbsp;&nbsp;<svg-icon
                      name="lemon"
                    />&nbsp;柠檬Todo</span
                  >
                </el-col>
                <el-col :span="12">
                  <span
                    >author:&nbsp;&nbsp;
                    <img :src="logo" /> &nbsp;MaFengYan</span
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <a href="javascript:void(0)" @click="open"
                    >source: &nbsp;&nbsp;<svg-icon
                      name="rocket"
                    />&nbsp;https://gitee.com/Maxfengyan/pc-todolist</a
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <a href="javascript:void(0)" @click="open"
                    >description: &nbsp;&nbsp;<svg-icon
                      name="cool1"
                    />&nbsp;一款颜值巨高的桌面端TodoList</a
                  >
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  tips<i class="el-icon-bottom"></i>:&nbsp;&nbsp;
                  <i class="over el-icon-check"></i>&nbsp;功能开发完成</el-col
                >
                <el-col :span="12">
                  <i class="noStart el-icon-minus"></i
                  >&nbsp;规划中(不想做)</el-col
                >
              </el-row>
            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          placement="top"
          type="primary"
          size="large"
          timestamp="2021-07-25"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>V0.0.1</span>
                <el-tag
                  type="primary"
                  class="card-tag"
                  effect="dark"
                  size="small"
                >
                  V0.0.1
                </el-tag>
              </div>
            </template>
            <div class="box-body">
              <el-row>
                <el-col :span="24">
                  <i class="over el-icon-check"></i>&nbsp;记录Todo
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="over el-icon-check"></i>&nbsp;显示时钟
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="over el-icon-check"></i
                  >&nbsp;夜间/日照模式(日照模式很丑，別用，凑功能的。)
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="over el-icon-check"></i>&nbsp;通透模式(同上↑)
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="over el-icon-check"></i>&nbsp;拉伸界面尺寸
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="noStart el-icon-minus"></i>&nbsp;换肤
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="noStart el-icon-minus"></i>&nbsp;todo时间提醒
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <i class="noStart el-icon-minus"></i>&nbsp;多设备同步
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
const { shell } = require("electron");
import { defineComponent, ref, watch, reactive } from "vue";
import { ElMessageBox } from "element-plus";
import logo from "../../../assets/logo.jpg";
export default defineComponent({
  emits: ["handledialog"],
  props: {
    dialogValue: {
      required: true,
      default: false,
    },
  },
  setup(props, context) {
    const dialogVisible = ref(false);
    const status = reactive({
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-info",
          header: "软件信息",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
        },
      ],
    });
    watch(
      () => props.dialogValue,
      (status) => {
        dialogVisible.value = status;
      }
    );
    const open = () => {
      shell.openExternal("https://gitee.com/Maxfengyan/pc-todolist");
    };
    const handleClose = (done) => {
      dialogVisible.value = false;
      context.emit("handledialog");
    };
    return {
      dialogVisible,
      handleClose,
      status,
      logo,
      open,
    };
  },
});
</script>
<style lang="scss">
.el-dialog {
  background: #282c35;
}
.el-timeline {
  margin-right: 20px;
}
.el-timeline-item__icon {
  font-size: 18px !important;
}
.el-timeline-item__node--large {
  width: 20px;
  height: 20px;
  left: 0 !important;
}
.el-timeline-item__tail {
  left: 9px !important;
}
.el-card {
  background: #21242b !important;
  border-radius: 10px !important;
  border: none;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 #424242 !important;
}
.el-dialog__body {
  padding: 30px 0 30px 20px !important;
  // padding-top: 30px !important;
  // height: 700px;
  height: 450px;
}
.el-dialog__header {
  padding: 0 20px 10px 20px !important;
}
.card-header {
  color: #b9b6b6;
  font-weight: bold;
  position: relative;
  font-size: 16px;
}
.el-card__header,
.el-collapse,
.el-collapse-item__header {
  border: none !important;
}
.box-body {
  color: #9c9a9a;
  svg,
  img {
    width: 20px !important;
    height: 20px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  img {
    border-radius: 50%;
    vertical-align: middle;
  }
}

.el-card__body {
  padding: 5px 20px !important;
}
.el-row {
  margin: 0 5px 16px 5px;
}
.card-tag {
  position: absolute;
  right: -8px;
  top: -5px;
}
.over {
  color: #67c23a;
  font-weight: bold;
}
.noStart {
  color: #f56c6c;
  font-weight: bold;
}
</style>
