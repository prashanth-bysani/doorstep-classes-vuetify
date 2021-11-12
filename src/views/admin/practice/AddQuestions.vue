<template>
  <v-container>
    <!-- <loading :label="loadingLabel" v-if="loading" /> -->
    <v-text-field id="exam-code" label="Exam Code" v-model="examCode" />
    <v-text-field id="subject" label="Subject" v-model="subject" />
    <!-- <textarea v-model="questionData.question" /> -->
    <div class="question-editor">
      <v-editor v-model="questionData.question"></v-editor>
    </div>
    <v-text-field label="Add Option" @on_action="addOption"/>
    <div
      v-for="(option, index) in questionData.options"
      :key="`option${index + 1}`"
    >
      <v-text-field
        :id="`option-${index + 1}`"
        :label="`Option ${index + 1} Value`"
        v-model="option.value"
        :value="option.value"
      />
      <div class="option-editor">
        <vue-editor v-model="option.optionContent"></vue-editor>
      </div>
    </div>
    <div>
      <label>Correct Answer</label>
    </div>
    <!-- <RadioGroup
      :options="questionData.options.map(value => value.value)"
      v-model="questionData.answer"
    /> -->
    <v-radio-group v-model="questionData.answer">
      <v-radio
        v-for="item in questionData.options.map(value => value.value)"
        :key="item"
        :label="item"
        :value="item"
      ></v-radio>
    </v-radio-group>
    <div class="option-editor">
      <vue-editor v-model="questionData.solution"></vue-editor>
    </div>
    <v-text-field
      :label="
        (this.$route.query || {}).qid ? 'Update Question' : 'Add Question'
      "
      @on_action="addQuestion"
    />
  </v-container>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  data() {
    return {
      questionData: {
        question: "",
        options: [],
        answer: ""
      },
      subject: "",
      examCode: "",
      loadingLabel: "Loading Question...",
      loading: true
    };
  },
  beforeCreate() {
    if (!(this.$store.state.userData || {}).isAdmin) {
      this.$router.replace({ name: "Home" });
    } else if ((this.$route.query || {}).qid) {
      firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.$route.query.examCode)
        .collection("questions")
        .doc(this.$route.query.qid)
        .get()
        .then(snap => {
          this.questionData = snap.data().questionData;
          this.subject = snap.data().subject;
          this.examCode = snap.data().examCode;
          this.loading = false;
        });
    }
  },
  mounted() {
    if (!(this.$route.query || {}).qid) this.loading = false;
  },
  methods: {
    addOption() {
      if (!this.questionData.options) {
        this.questionData.options = [];
      }
      this.questionData.options.push({
        value: `${this.questionData.options.length + 1}`,
        optionContent: ""
      });
    },
    addQuestion() {
      if ((this.$route.query || {}).qid)
        this.loadingLabel = "Updating Question...";
      else this.loadingLabel = "Adding Question...";
      this.loading = true;
      firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.examCode)
        .set({
          collegeCode: this.$store.state.userData.collegeCode
        });
      let questionCollection = firebaseUtils
        .firestore()
        .collection("questions_info")
        .doc(this.examCode)
        .collection("questions");
      let dataObject = {
        questionData: this.questionData,
        subject: this.subject,
        examCode: this.examCode
      };
      if ((this.$route.query || {}).qid) {
        questionCollection
          .doc(this.$route.query.qid)
          .set(dataObject, { merge: true })
          .then(() => {
            this.loading = false;
            window.close();
          });
      } else {
        questionCollection.add(dataObject).then(() => {
          this.loading = false;
          this.questionData = {
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
};
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
