import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.scss";
// import ElementUI from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// import "./theme/index.css";
import router from "./router";
import svgIcon from "./plugin/icons/svgIcon.vue";
import ElementUI from "./elementui";
import store from "./store/index";
// vite 使用 esm 编译 import, electron 及 node.js 内置模块用 require 形式
const electron = require("electron");

/* ipc.send("store:set", { key: "foo.bar", value: "👩" });
ipc.invoke("store:get", "foo").then((res: string) => {
  console.log(res);
}); */
/* ipc.send("store:delete", "foo");
ipc.invoke("store:get", "foo").then((res: string) => {
  console.log(res);
}); */

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementUI);
app.component("svg-icon", svgIcon);
app.mount("#app");
