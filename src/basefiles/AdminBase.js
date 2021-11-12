import { data as appData, methods as appMethods } from "@/basefiles/AppBase.js";
import { reactive } from "@vue/composition-api";
let data = {};
let methods = {};
let AdminBase = function(baseData) {
  Object.assign(data, baseData);
  data = reactive(data);
  Object.assign(data, appData);
  Object.assign(methods, appMethods);
  methods.checkAuth();
  // publicMethods(data, methods);
};

// const publicMethods = (data, methods) => {};

export { data, methods, AdminBase };
