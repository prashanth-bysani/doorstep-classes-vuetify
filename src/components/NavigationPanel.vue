<template>
  <v-navigation-drawer expand-on-hover app>
    <v-list>
      <v-list-item @click="navigateTo">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group prepend-icon="mdi-account-circle">
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, value], i) in admins"
            :key="i"
            link
            @click="naviagteTo(value)"
          >
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <v-list-item v-if="isAuthenticated" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sign Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { data, methods } from "@/basefiles/AppBase.js";
export default {
  name: "navigation-panel",
  setup() {
    const baseData = reactive({
      admins: [
        ["Add Students", "mdi-plus-outline", "AddStudents"],
        [
          "Absentees Alert",
          "mdi-message-arrow-right-outline",
          "AbsenteesAlert"
        ],
        ["Send Results", "mdi-book-open-variant", "ResultsAlert"]
      ]
    });
    publicMethods(data, methods);
    return { ...toRefs(baseData), ...toRefs(data), ...methods };
  }
};
const publicMethods = (data, methods) => {
  methods.navigateTo = routeName => {
    methods.navigate({ name: routeName });
  };
};
</script>

<style lang="scss" scoped></style>
