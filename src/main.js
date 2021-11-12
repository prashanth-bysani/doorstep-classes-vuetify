import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";
import YimoVueEditor from "yimo-vue-editor";
import { data } from "@/basefiles/AppBase.js";
import { E } from "yimo-vue-editor";
import firebaseUtils from "@/services/FirebaseUtils.js";

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(YimoVueEditor, {
  name: "v-editor",
  config: {
    lang: E.langs.en
  }
});
let app;
firebaseUtils.auth().onAuthStateChanged(async user => {
  if (user) {
    data.isAuthenticated = true;
    let userData = await firebaseUtils.getUserData(user.email);
    data. userData = userData;
  } else {
    data.isAuthenticated = false;
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
