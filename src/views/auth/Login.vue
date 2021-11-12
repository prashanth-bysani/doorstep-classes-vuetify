<template>
  <v-container >
    <v-row justify="center" class="py-2">Login </v-row>
    <v-row justify="center">
      <v-col align="center" cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="login">
              <v-text-field
                v-model.trim="emailAddress"
                solo
                :rules="emailRules"
                label="E-mail"
                required
                clearable
              ></v-text-field>
              <v-text-field
                v-model.trim="password"
                solo
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="passwordRules"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
              <v-row>
                <v-col class="py-1">
                  <v-btn
                    block
                    :disabled="!valid"
                    color="primary"
                    @click="login"
                    type="submit"
                  >
                    login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { data, methods, AdminBase } from "@/basefiles/AdminBase.js";
import { toRefs } from "@vue/composition-api";
export default {
  setup(props, context) {
    let baseData = {
      valid: false,
      showPassword: false,
      openProfileData: false,
      password: "",
      emailAddress: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v || "").length >= 6 || "Password should have min 6 letters"
      ],
      profileData: {}
    };
    AdminBase(baseData);
    publicMethods(data, methods, context);
    return { ...toRefs(data), ...methods };
  }
};

const publicMethods = (data, methods, context) => {
  let fallback = methods.getRouteQuery().fallback;
  methods.login = () => {
    let isValid = context.refs.form.validate();
    if (isValid) {
      methods.showLoading("Logging in...");
      methods.firebaseUtils
        .auth()
        .signInWithEmailAndPassword(data.emailAddress, data.password)
        .then(
          () => {
            methods.hideLoading();
            methods.showAlert("Logged in", "success");
            if (fallback) {
              methods.navigateToFallback(fallback);
            } else {
              methods.navigate({ name: "Home" });
            }
          },
          err => {
            methods.hideLoading();
            if (err.code === "auth/user-not-found") {
              methods.showAlert("User does not exist", "error");
            } else if (err.code === "auth/invalid-email") {
              methods.showAlert("Enter proper mail id", "error");
            } else if (err.code === "auth/wrong-password") {
              methods.showAlert("Invalid password", "error");
            }
          }
        );
    }
  };
};
</script>
