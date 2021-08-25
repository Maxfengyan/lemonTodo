const { ipcRenderer } = require("electron");
const state = {
  bgColor: "#212121",
};

const mutations = {
  SET_BGCOLOR: (state: any, bgcolor: any) => {
    state.bgColor = bgcolor;
  },
};

const actions = {
  Changebgcolor(context: any, bgColor: any) {
    ipcRenderer.send("store:set", { key: "color", value: bgColor });
    context.commit("SET_BGCOLOR", bgColor);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
