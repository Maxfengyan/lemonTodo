import { createStore } from "vuex";
import getters from "./getters";
import skin from "./modules/skin";

export default createStore({
  modules: {
    skin,
  },
  getters,
});
