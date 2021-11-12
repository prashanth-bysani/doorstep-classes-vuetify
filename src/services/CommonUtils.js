import { reactive } from "@vue/composition-api";

let createUUID = function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
let toDataURL = function(url) {
  return fetch(url, { mode: "no-cors" })
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};
let getData = (context, baseData) => {
  Object.assign((context.attrs || {}).data || {}, baseData);
  return {
    data: reactive((context.attrs || {}).data || {}),
    methods: (context.attrs || {}).methods || {}
  };
};
export { createUUID, toDataURL, getData };
