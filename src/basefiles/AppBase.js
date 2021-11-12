import { reactive, getCurrentInstance } from "@vue/composition-api";
import firebaseUtils from "@/services/FirebaseUtils.js";
import { createUUID } from "@/services/CommonUtils.js";
let data = {
  alertContent: "Sample Info",
  alertType: "info",
  openAlert: false,
  loading: false,
  loadLabel: "Loading..."
};
let methods = {};
let AppBase = function(appData) {
  data = reactive({ ...data, ...appData });
  publicBaseMethods(data, methods);
};
const publicBaseMethods = (data, methods) => {
  methods.createUUID = createUUID;
  methods.firebaseUtils = firebaseUtils;
  uiMethods(data, methods);
  utilMethods(data, methods);
  routeMethods(data, methods);
  authMethods(data, methods);
};

const routeMethods = (data, methods) => {
  let instance = getCurrentInstance();
  let router = instance.proxy.$router;
  methods.navigate = (routeData, fromFallback) => {
    methods.showLoading("");
    let routeInstance = router.resolve(routeData);
    if (fromFallback) {
      window.open(routeInstance.href, "_self");
      return;
    }
    let authCheck = routeInstance.route.meta["isAuthRequired"];
    if (authCheck && !data.isAuthenticated) {
      let fallbackData = {
        name: routeData.name,
        params: routeData.params,
        query: routeData.query
      };
      routeData = { name: "Login" };
      routeData.query = { fallback: methods.encrypt(fallbackData, "1011010") };
    }
    routeInstance = router.resolve(routeData);
    window.open(routeInstance.href, "_self");
  };
  methods.navigateToFallback = encrypted => {
    methods.navigate(methods.decrypt(encrypted, "1011010"), true);
  };
  methods.getRouteParam = key => {
    let currentInstance = getCurrentInstance();
    return (currentInstance.proxy.$route.params || {})[key];
  };
  methods.getRouteQuery = () => {
    let currentInstance = getCurrentInstance();
    return currentInstance.proxy.$route.query || {};
  };
  methods.getCurrentRoute = () => {
    let currentInstance = getCurrentInstance();
    return currentInstance.proxy.$route;
  };
};

const uiMethods = (data, methods) => {
  methods.showLoading = loadingLabel => {
    if (!data.loading) {
      data.loading = true;
    }
    data.loadLabel = loadingLabel;
  };
  methods.hideLoading = () => {
    data.loading = false;
    data.loadLabel = "Loading...";
  };
  methods.showAlert = (alertContent, alertType) => {
    data.alertContent = alertContent || "Sample Info";
    data.alertType = alertType || "info";
    switch (alertType) {
      case "info":
        data.alertType = "primary";
        break;
      default:
        data.alertType = alertType;
        break;
    }
    data.openAlert = true;
  };
};

const utilMethods = (data, methods) => {
  methods.encrypt = (object, key) => {
    // eslint-disable-next-line no-undef
    return CryptoJS.AES.encrypt(JSON.stringify(object), key).toString();
  };
  methods.decrypt = (encrypted, key) => {
    // eslint-disable-next-line no-undef
    var decrypted = CryptoJS.AES.decrypt(encrypted, key);
    // eslint-disable-next-line no-undef
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  };
  methods.formatDate = dateValue => {
    if (dateValue) {
      try {
        return dateValue.toDate().toLocaleString();
      } catch (exception) {
        return dateValue;
      }
    }
  };
};
const authMethods = (data, methods) => {
  methods.logout = () => {
    methods.showLoading("Signing Out...");
    methods.firebaseUtils
      .auth()
      .signOut()
      .then(() => {
        methods.hideLoading();
        methods.navigate({ name: "Login" });
      });
  };
  methods.checkAuth = () => {
    let currentRoute = methods.getCurrentRoute();
    let authCheck = currentRoute.meta["isAuthRequired"];
    if (!authCheck) {
      return;
    }
    if (authCheck && !data.isAuthenticated) {
      methods.navigate(currentRoute);
    }
  };
};
export { data, methods, AppBase };
