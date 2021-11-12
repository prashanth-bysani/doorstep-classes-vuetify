<template>
  <v-flex>
    <v-app-bar app elevation="0" color="white" :style="{ opacity: 0.8 }">
      <v-toolbar-title>Company name Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="navigateToDiv('home')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon @click="navigateToDiv('contact')">
        <v-icon>mdi-phone</v-icon>
      </v-btn>
    </v-app-bar>
    <v-flex id="home"
      ><v-parallax id="home-background" src="@/assets/maxresdefault.jpg">
        45<v-row align="center"
          ><v-col align="center" cols="12" sm="12" md="6" lg="6"
            ><v-img
              transition="scale-transition"
              max-height="300"
              aspect-ratio="1"
              lazy-src="vuetify-loader"
              src="@/assets/machine.jpg"
            ></v-img> </v-col
          ><v-col align="center" sm="12" md="6" lg="6"
            ><v-flex transition="scale-transition">
              Our product contains the high nutriants
              sfsdf</v-flex
            ></v-col
          ></v-row
        >
      </v-parallax></v-flex
    >
    <div id="middle">
      <v-parallax
        id="middle-background"
        src="@/assets/machine.jpg"
      ></v-parallax>
    </div>
    <div id="others">
      <v-parallax
        id="others-background"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-parallax>
    </div>
    <v-footer id="contact" dark padless>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-row
          ><v-col
            ><iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7689.179634346952!2d80.03696137243122!3d15.506480345260956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4b0109ad050503%3A0x75f7b15e3b7c69aa!2sGandhi%20Park!5e0!3m2!1sen!2sin!4v1621359354648!5m2!1sen!2sin"
              width="400"
              height="300"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe></v-col
          >
            <v-col>
            <v-card-text class="white--text pt-0">
              <b>Contact</b>
            </v-card-text>
            </v-col><v-col>
             <v-card-text class="white--text pt-0">
               <b>Address</b>
              Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
              amet. Mauris cursus commodo interdum. Praesent ut risus eget metus
              luctus accumsan id ultrices nunc.
            </v-card-text>
          </v-col></v-row
        >
        <v-divider></v-divider>

        <v-card-text class="white--text">
          @Copyrights— <strong>Prashanth</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-flex>
</template>

<script>
import { toRefs } from "@vue/composition-api";

export default {
  setup() {
    let data = {};
    let methods= {};
    publicMethods(data, methods);
    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
const publicMethods = (data, methods) => {
  methods.navigateToDiv = (target) => {
    document.getElementById(target).scrollIntoView();
  };
};
</script>
<style>
#home-background .v-parallax__content {
  background: linear-gradient(315deg, black, transparent);
}
#middle-background .v-parallax__content {
  background: linear-gradient(45deg, black, transparent);
}
#others-background .v-parallax__content {
  background: linear-gradient(315deg, black, transparent);
}
</style>
