/**
 * electron 主文件
 */
import { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import is_dev from "electron-is-dev";
import dotenv from "dotenv";
import Store from "electron-store";
const store = new Store();
ipcMain.on("store:set", async (e, args) => {
  store.set(args.key, args.value);
});

ipcMain.on("destroyed", async () => {
  app.exit();
});

ipcMain.handle("store:get", async (e, args) => {
  const value = await store.get(args);
  return value;
});
ipcMain.on("store:delete", async (e, args) => {
  store.delete(args);
});

dotenv.config({ path: join(__dirname, "../../.env") });

let win = null;

class createWin {
  // 创建浏览器窗口
  constructor() {
    win = new BrowserWindow({
      width: 850,
      height: 600,
      titleBarStyle: "hidden",
      useContentSize: true,
      fullscreenable: false,
      frame: false,
      center: true, // 是否出现在屏幕居中的位置
      resizable: false, // 是否允许拉伸大小
      // vibrancy: "ultra-dark",
      transparent: true,
      // backgroundColor: "#282c34",
      webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });

    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, "../../dist/render/index.html")}`; // vite 构建后的静态文件地址

    win.loadURL(URL);
    // win.webContents.openDevTools();
  }
}

app.whenReady().then(() => new createWin());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin();
  }
});
