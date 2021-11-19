<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10">
        <v-file-input
          small-chips
          solo
          label="Upload student data"
          @change="handleUpload"
          :disabled="uploading"
          show-size
        ></v-file-input> </v-col
      ><v-col cols="12" sm="2" align="end">
        <v-btn
          :loading="uploading"
          :disabled="uploading"
          color="primary"
          class="ma-1 white--text"
          @click="uploadStudentData"
        >
          Upload
          <v-icon right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </v-col></v-row
    >
    <v-card width="100vw">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="studentData"
        item-key="name"
        show-select
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import XLSX from "xlsx";
import firebaseUtils from "@/services/FirebaseUtils.js";
import { data, methods, AdminBase } from "@/basefiles/AdminBase.js";
export default {
  setup() {
    const baseData = reactive({
      studentData: [],
      selected: [],
      dataLoading: false,
      uploading: false,
      headers: [
        { text: "Admission Number", sortable: false, value: "AdmissionNo" },
        { text: "Student Name", sortable: false, value: "StudentName" },
        { text: "Mobile Number", sortable: false, value: "MobileNumber" },
        { text: "Email Address", sortable: false, value: "EmailAddress" },
        { text: "Parent Name", sortable: false, value: "ParentName" }
      ]
    });
    AdminBase(baseData);
    publicMethods(data, methods);
    return {
      ...toRefs(data),
      ...methods
    };
  }
};
const publicMethods = (data, methods) => {
  methods.handleUpload = event => {
    data.dataLoading = true;
    if (!event) {
      data.studentData = [];
      data.dataLoading = false;
    }
    var reader = new FileReader();
    reader.onload = function(file) {
      var dataSheet = new Uint8Array(file.target.result);
      var workbook = XLSX.read(dataSheet, { type: "array" });
      XLSX.utils
        .sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        .forEach(studentData => {
          data.studentData.push(studentData);
        }, this);
      data.dataLoading = false;
    };
    reader.readAsArrayBuffer(event);
  };

  methods.uploadStudentData = () => {
    data.uploading = true;
    if (data.studentData.length == 0) {
      data.uploading = false;
      methods.showAlert("No data available", "error");
    }
    data.studentData.forEach(item => {
      setTimeout(() => {
        firebaseUtils
          .auth()
          .createUserWithEmailAndPassword(
            item.EmailAddress,
            item.MobileNumber + ""
          )
          .then(() => {
            methods.showAlert(
              "Registeration success for " + item.StudentName,
              "success"
            );
          })
          .catch(() => {
            methods.showAlert("Registeration failed", "error");
          });
      }, 1000);
    });
    data.uploading = false;
  };
};
</script>
