<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col align="center">
        <v-btn-toggle v-model="selectedRegime">
          <v-btn label="New Regime" value="new">
            New Regime
          </v-btn>

          <v-btn label="Old Regime" value="old">
            Old Regime
          </v-btn>
        </v-btn-toggle>
      </v-col></v-row
    >
    <v-container fluid v-if="selectedRegime === 'new'">
      <v-row justify="center" class="pa-6">
        <v-col cols="6" align="center">
          You have opted for New tax regime, Once you submit the form then tax
          will be calculated based on New tax regime which cannot be changed
          until next Financial year.
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="selectedRegime === 'old'">
      <v-form v-model="valid" :disabled="isViewMode">
      <v-row justify="center">
        <v-col cols="7" class="pl-0 pb-0">
           <v-card-title>Section 10 <v-btn
            icon
            small
            v-if="section10.length === 0"
            @click="addSectionAtIndex('section10', 0)"
          > <v-icon>mdi-plus</v-icon></v-btn></v-card-title>
        </v-col></v-row
      >
      <v-row
        justify="center"
        v-for="(sectionData, sectionIndex) in section10"
        :key="sectionIndex"
      >
        <v-col cols="2" class="pb-0 pt-0">
          <v-text-field
            v-model="sectionData['sectionName']"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="1" align-self="center" class="pb-0 pt-0">
          <v-btn
            icon
            small
            @click="addSectionAtIndex('section10', sectionIndex)"
          >
            <v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            small
            @click="removeSectionAtIndex('section10', sectionIndex)"
          >
            <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="4" class="pb-0 pt-0">
          <v-text-field label="Amount" type="number" prefix="₹" v-model="sectionData['amount']">
            <v-tooltip slot="append-outer" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  slot="activator"
                  color="primary"
                  v-on="on"
                  v-bind="attrs"
                  >mdi-information-outline</v-icon
                >
              </template>
              <span>{{ hintData["section10"] }}</span>
            </v-tooltip></v-text-field
          >
        </v-col></v-row
      >
      <v-row justify="center">
        <v-col cols="7" align-self="center" class="pl-0 pb-0 pt-0">
          <v-card-title>Section 80 <v-btn
            icon
            small
            v-if="section80.length === 0"
            @click="addSectionAtIndex('section80', 0)"
          > <v-icon>mdi-plus</v-icon></v-btn></v-card-title>
        </v-col></v-row
      >
      <v-row
        justify="center"
        v-for="(sectionData, sectionIndex) in section80"
        :key="sectionIndex"
      >
        <v-col cols="1" class="pb-0 pt-0">
          <v-text-field
            label="Section Code"
            v-model="sectionData['sectionCode']"
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="pb-0 pt-0">
          <v-text-field
            label="Name"
            v-model="sectionData['sectionName']"
          ></v-text-field>
        </v-col>
        <v-col cols="1" align-self="center" class="pb-0 pt-0">
          <v-btn
            icon
            small
            @click="addSectionAtIndex('section80', sectionIndex)"
          >
            <v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            small
            @click="removeSectionAtIndex('section80', sectionIndex)"
          >
            <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="4" class="pb-0 pt-0">
          <v-text-field label="Amount" prefix="₹" type="number" v-model="sectionData['amount']">
            <v-tooltip slot="append-outer" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  slot="activator"
                  color="primary"
                  v-on="on"
                  v-bind="attrs"
                  >mdi-information-outline</v-icon
                >
              </template>
              <span>{{ hintData["section80"] }}</span>
            </v-tooltip></v-text-field
          >
        </v-col></v-row
      >
       <v-row justify="center">
        <v-col cols="7" align-self="center" class="pl-0 pb-0 pt-0">
          <v-card-title>Other Sections<v-btn
            icon
            small
            v-if="otherSections.length === 0"
            @click="addSectionAtIndex('otherSections', 0)"
          > <v-icon>mdi-plus</v-icon></v-btn></v-card-title>
        </v-col></v-row
      >
      <v-row
        justify="center"
        v-for="(sectionData, sectionIndex) in otherSections"
        :key="sectionIndex"
      >
        <v-col cols="1" class="pb-0 pt-0">
          <v-text-field
            label="Section Code"
            v-model="sectionData['sectionCode']"
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="pb-0 pt-0">
          <v-text-field
            label="Name"
            v-model="sectionData['sectionName']"
          ></v-text-field>
        </v-col>
        <v-col cols="1" align-self="center" class="pb-0 pt-0">
          <v-btn
            icon
            small
            @click="addSectionAtIndex('otherSections', sectionIndex)"
          >
            <v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            small
            @click="removeSectionAtIndex('otherSections', sectionIndex)"
          >
            <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="4" class="pb-0 pt-0">
          <v-text-field label="Amount"  prefix="₹" type="number" v-model="sectionData['amount']">
            <v-tooltip slot="append-outer" right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  slot="activator"
                  color="primary"
                  v-on="on"
                  v-bind="attrs"
                  >mdi-information-outline</v-icon
                >
              </template>
              <span>{{ hintData["section80"] }}</span>
            </v-tooltip></v-text-field
          >
        </v-col></v-row
      >
      </v-form>
    </v-container>
    <v-row justify="center">
      <v-col align="center">
        <v-btn color="primary" @click="dialog = true">
          Submit
        </v-btn>
      </v-col></v-row
    >
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title>
          Confirmation
        </v-card-title>
        <v-card-text>Once Submitted cannot be changed</v-card-text>
        <v-card-text>Do you want to submit?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submitData">
            Submit
          </v-btn>
          <v-btn text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { reactive, set, toRefs } from "@vue/composition-api";
import { data, methods, AdminBase } from "@/basefiles/AdminBase.js";
export default {
  setup() {
    const baseData = reactive({
      selectedRegime: "new",
      hintData: {
        section10: "This is your name",
      },
      section10: [{ sectionName: "HRA", amount: null }],
      section80: [
        { sectionCode: "80CC", sectionName: "Insurance", amount: null },
      ],
      otherSections: [],
      dialog: false,
      isViewMode: false,
      dataLoading: false,
    });
    AdminBase(baseData);
    publicMethods(data, methods);
    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
const publicMethods = (data, methods) => {
  methods.submitData = () => {
    data.dialog = false;
    methods.showLoading("updating");
  };
  methods.addSectionAtIndex = (section, index) => {
    data[section].splice(index + 1, 0, {});
  };
  methods.removeSectionAtIndex = (section, index) => {
    data[section].splice(index, 1);
  };
};
</script>
<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>