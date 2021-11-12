<template>
  <v-container>
    <!-- <loading :label="loadingLabel" v-if="loading" /> -->
    <v-text-field id="exam-code" label="Exam Code" v-model="examCode" />
    <v-text-field id="subject" label="Subject" v-model="subject" />
    <v-row>
    <v-editor v-model="questionData.question"></v-editor>
    </v-row>
    <v-row><v-btn @click="addOption">Add Option</v-btn></v-row>
    <div
      v-for="(option, index) in questionData.options"
      :key="`option${index + 1}`"
    >
      <v-row><v-text-field
        :id="`option-${index + 1}`"
        :label="`Option ${index + 1} Value`"
        v-model="option.value"
        :value="option.value"
      /> <v-btn @click="deleteOption(index)">Delete</v-btn></v-row>
      <v-row>
      <v-editor v-model="option.optionContent"></v-editor>
      </v-row>
    </div>
    <v-row>
      <label>Correct Answer</label>
    </v-row>
    <v-radio-group v-model="questionData.answer">
      <v-radio
        v-for="item in questionData.options.map(value => value.value)"
        :key="item"
        :label="item"
        :value="item"
      ></v-radio>
    </v-radio-group>
    <v-editor v-model="questionData.solution"></v-editor>
    <v-btn @click="addQuestion">{{getRouteParam('qid') ? 'Update Question' : 'Add Question'}}</v-btn>
  </v-container>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import firebaseUtils from "@/services/FirebaseUtils.js";
import {data, methods, AdminBase} from "@/basefiles/AdminBase.js";
export default {
  setup() {
    const baseData = reactive({
      questionData: {
        question: "",
        options: [],
        answer: ""
      },
      subject: "",
      examCode: ""
    });
    AdminBase(baseData);
    publicMethods(data, methods);
    methods.fetchQuestionData();
    return {
      ...toRefs(data),
      ...methods
    };
  }
};
const publicMethods = (data, methods) => {
  methods.fetchQuestionData = () => {
    if (methods.getRouteParam("qid")) {
      firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(methods.getRouteParam("examCode"))
        .collection("questions")
        .doc(methods.getRouteParam("qid"))
        .get()
        .then(snap => {
          data.questionData = snap.data().questionData;
          data.subject = snap.data().subject;
          data.examCode = snap.data().examCode;
          data.loading = false;
        });
    }
  };
  methods.addOption = () => {
    if (!data.questionData.options) {
      data.questionData.options = [];
    }
    data.questionData.options.push({
      value: `${data.questionData.options.length + 1}`,
      optionContent: ""
    });
  };
  methods.deleteOption = index => {
    data.questionData.options.splice(index, 1);
  };
  methods.addQuestion = () => {
    if ((this.$route.query || {}).qid)
      methods.showLoading("Updating Question...");
    else methods.showLoading("Adding Question...");;
    firebaseUtils
      .firestore()
      .collection("questions_info")
      .doc(data.examCode)
      .set({
        collegeCode: data.userData.collegeCode
      });
    let questionCollection = firebaseUtils
      .firestore()
      .collection("questions_info")
      .doc(data.examCode)
      .collection("questions");
    let dataObject = {
      questionData: data.questionData,
      subject: data.subject,
      examCode: data.examCode
    };
    if ((this.$route.query || {}).qid) {
      questionCollection
        .doc(this.$route.query.qid)
        .set(dataObject, { merge: true })
        .then(() => {
          methods.hideLoading();
          window.close();
        });
    } else {
      questionCollection.add(dataObject).then(() => {
        methods.hideLoading();
        data.questionData = {
          question: "",
          isQuestionImage: false,
          imagePath: null,
          options: [],
          answer: null
        };
      });
    }
  }
}
</script>

<style scoped>
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
}
.question-editor {
  width: 500px;
}
.option-editor {
  width: 500px;
}
</style>
