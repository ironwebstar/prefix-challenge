<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="12">
        <p class="text-h5">Prefix Software Feature Assessment</p>
      </v-col>
    </v-row>
    <v-row v-if="formData" justify="center" align="start" :key="formChanged">
      <v-col sm="12" md="8" class="pr-5">
        <dynamic-form :form="formData" />
      </v-col>

      <v-col sm="12" md="4" class="pr-5">
        <p class="text-caption grey--text">Select example query to populate the dynamic form.</p>
        <div @click="setFormData(query1)">
          <div class="font-weight-bold mt-6 cursor-pointer">Example 1</div>
          <xmp>{{ query1 }}</xmp>
        </div>
        <div @click="setFormData(query2)">
          <div class="font-weight-bold mt-6 cursor-pointer">Example 2</div>
          <xmp>{{ query2 }}</xmp>
        </div>
        <div @click="setFormData(query3)">
          <div class="font-weight-bold mt-6 cursor-pointer">Example 3</div>
          <xmp>{{ query3 }}</xmp>
        </div>
        <div @click="setFormData(query4)">
          <div class="font-weight-bold mt-6 cursor-pointer">Example 4 (Multiple Query)</div>
          <xmp>{{ query4 }}</xmp>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-10" />

    <v-row class="mt-5 pt-5">
      <v-col cols="12">
        <div class="font-weight-bold text-h6 pb-4">JSON Query which is saved on vuex store</div>
        <code>
          {{ formData }}
        </code>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import DynamicForm from '@/components/DynamicForm.vue';

import {
  query1, query2, query3, query4,
} from '@/store/mock-input';

export default {
  name: 'Home',

  components: {
    DynamicForm,
  },

  data() {
    return {
      query1,
      query2,
      query3,
      query4,
      title: 'Prefix Software Feature Assessment',
      formChanged: true,
    };
  },

  methods: {
    ...mapMutations({
      setFormData: 'form/SET_FORM_DATA',
    }),
  },

  watch: {
    formData() {
      this.formChanged = !this.formChanged;
    },
  },

  computed: {
    ...mapGetters({
      formData: 'form/formData',
    }),
  },
};
</script>
