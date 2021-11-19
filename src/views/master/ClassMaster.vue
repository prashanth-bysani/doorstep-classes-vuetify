<template>
  <v-container>
    <v-btn fab bottom right color="primary" fixed @click="clicked"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel v-for="(item, i) in classList" :key="i">
          <v-expansion-panel-header
            ><v-row align="center"
              ><v-col cols="12" sm="6" md="6">{{ item.className }}</v-col>
              <v-col cols="12" sm="6" md="6" class="align-end"
                ><v-btn icon @click.stop="openDialogWithData(item)"
                  ><v-icon> mdi-pencil</v-icon></v-btn
                ></v-col
              ></v-row
            ></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>Class Name: {{ item.className }}</v-row>
            <v-row>Class Code: {{ item.classCode }}</v-row>
            <v-row>Subjects: {{ item.subjectList.join() }}</v-row>
            <v-row>Sections: {{ item.sectionList.join() }}</v-row>
            <v-row>Is Active: {{ item.isActive }}</v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Class details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Class Name*"
                  v-model="dialogData.className"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-chip
                v-for="(section, index) in dialogData.sectionList"
                :key="section"
                class="ma-2"
                close
                @click:close="removeItemAtIndex(dialogData.sectionList, index)"
              >
                {{ section }}
              </v-chip>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-row align="center">
                  <v-text-field label="Section" v-model="sectionInput" />
                  <v-btn
                    icon
                    @click="
                      checkAndPushData(dialogData.sectionList, 'sectionInput')
                    "
                    ><v-icon> mdi-plus </v-icon></v-btn
                  ></v-row
                >
              </v-col>
            </v-row>
            <v-row>
              <v-chip
                v-for="(subject, index) in dialogData.subjectList"
                :key="subject"
                class="ma-2"
                close
                @click:close="removeItemAtIndex(dialogData.subjectList, index)"
              >
                {{ subject }}
              </v-chip>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-row align="center">
                  <v-text-field label="Subject" v-model="subjectInput" />
                  <v-btn
                    icon
                    @click="
                      checkAndPushData(dialogData.subjectList, 'subjectInput')
                    "
                    ><v-icon> mdi-plus </v-icon></v-btn
                  ></v-row
                >
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveClassData">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { reactive, toRefs } from "@vue/composition-api";
import firebaseUtils from "@/services/FirebaseUtils.js";
import { data, methods, AdminBase } from "@/basefiles/AdminBase.js";
export default {
  setup() {
    const baseData = reactive({
      classList: [],
      dialog: false,
      dialogData: {
        className: "",
        classCode: "",
        subjectList: [],
        sectionList: [],
        isActive: true
      },
      subjectInput: "",
      sectionInput: ""
    });
    AdminBase(baseData);
    publicMethods(data, methods);
    methods.updateClasses();
    return {
      ...toRefs(data),
      ...methods
    };
  }
};
const publicMethods = (data, methods) => {
  methods.clicked = () => {
    data.dialog = true;
  };
  methods.updateClasses = () => {
    data.classList = [];
    firebaseUtils
      .firestore()
      .collection("class_data")
      .doc(data.userData.collegeCode)
      .collection("classes")
      .get()
      .then(snap => {
        snap.forEach(item => {
          data.classList.push(item.data());
        });
      });
  };
  methods.closeDialog = () => {
    data.dialog = false;
    methods.resetDialogData();
  };
  methods.saveClassData = () => {
    methods.showLoading("Adding/Updating data");
    data.dialogData.classCode = data.dialogData.className
      .replace(/\s+/g, "-")
      .toLowerCase();
    firebaseUtils
      .firestore()
      .collection("class_data")
      .doc(data.userData.collegeCode)
      .collection("classes")
      .doc(data.dialogData.classCode)
      .set(data.dialogData, { merge: true })
      .then(() => {
        methods.showAlert("Class Added Successfully", "succes");
        methods.updateClasses();
        methods.hideLoading();
        methods.closeDialog();
      });
  };
  methods.removeItemAtIndex = (listData, index) => {
    listData.splice(index, 1);
  };
  methods.checkAndPushData = (listData, itemKey) => {
    if (data[itemKey] && data[itemKey].trim !== "")
      listData.push(data[itemKey]);
    data[itemKey] = "";
  };
  methods.openDialogWithData = dialogData => {
    data.dialogData.className = dialogData.className;
    data.dialogData.classCode = dialogData.classCode;
    data.dialogData.subjectList = dialogData.subjectList;
    data.dialogData.sectionList = dialogData.sectionList;
    data.dialogData.isActive = dialogData.isActive;
    data.dialog = true;
  };
  methods.resetDialogData = () => {
    data.dialogData.className = "";
    data.dialogData.classCode = "";
    data.dialogData.subjectList = [];
    data.dialogData.sectionList = [];
    data.subjectInput = "";
    data.sectionInput = "";
    data.dialogData.isActive = true;
  };
};
</script>
<style scoped>
.align-end {
  text-align: end;
}
</style>
