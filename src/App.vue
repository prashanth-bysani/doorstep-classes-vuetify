<template>
  <v-app>
    <!-- <navigation-panel /> -->
    <v-main>
      <!-- <v-overlay v-if="loading" z-index="7">
        <v-container v-if="loading">
          <v-row justify="center" align="center">
            <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
            <h4 class="pl-4">{{ loadLabel }}</h4>
          </v-row>
        </v-container>
      </v-overlay> -->
      <router-view />
    </v-main>
    <!-- <v-snackbar top centered app fixed :color="alertType" v-model="openAlert">{{
      alertContent
    }}</v-snackbar> -->
  </v-app>
</template>

<script>
import NavigationPanel from "./components/NavigationPanel.vue";
import { data, methods, AppBase } from "@/basefiles/AppBase.js";
import { toRefs } from "@vue/composition-api";
export default {
  name: "App",
  components: {
    NavigationPanel
  },
  setup() {
    AppBase({ floatOpen: false });
    publicMethods(data, methods);
    return { ...toRefs(data), ...methods };
  }
};
const publicMethods = (data, methods) => {
  methods.naviagteTo = routeName => {
    methods.navigate({ name: routeName });
  };
};
</script>
<style>
html{
  scroll-behavior: smooth;
}
a{text-decoration: none;} 
</style>