<template>
  <v-form lazy-validation ref="form" v-model="formModel">

    <div v-if="Array.isArray(data)">
      <div
        v-for="(item, index) in data"
        :key="index"
      >
        <v-row>
          <p class="font-weight-bold text-uppercase pt-10">Query {{ index + 1 }}</p>
        </v-row>
        <v-row
          v-for="(value, name) in item"
          :key="name"
        >
          <date-input
            v-if="name === 'dateOfBirth'"
            v-model="item[name]"
          />

          <color-input
            v-else-if="name === 'color'"
            v-model="item[name]"
          />

          <v-checkbox
            v-else-if="typeof value === 'boolean'"
            v-model="item[name]"
            :label="name"
          />

          <v-text-field
            v-else
            v-model="item[name]"
            required
            outlined
            :label="name"
            :rules="[...requiredRule]"
          ></v-text-field>
        </v-row>
      </div>
    </div>
    <div v-else>
      <v-row
        v-for="(value, name) in data"
        :key="name"
      >
        <date-input
          v-if="name === 'dateOfBirth'"
          v-model="data[name]"
          :key="data[name]"
        />

        <color-input
          v-else-if="name === 'color'"
          v-model="data[name]"
          :key="data[name]"
        />

        <v-checkbox
          v-else-if="typeof value === 'boolean'"
          v-model="data[name]"
          :label="name"
          :key="data[name]"
        />

        <v-text-field
          v-else-if="typeof data[name] === 'string' && data[name].length > 500"
          v-model="data[name]"
          required
          outlined
          type="textarea"
          :label="name"
          :rules="getRules(name)"
          :key="data[name]"
        ></v-text-field>

        <v-text-field
          v-else
          v-model="data[name]"
          required
          outlined
          :label="name"
          :rules="getRules(name)"
          :key="data[name]"
        ></v-text-field>
      </v-row>
    </div>
    <v-divider />

    <div class="d-flex justify-end text-capitalize mt-5">
      <v-btn
        depressed
        class="text-capitalize mr-4"
        @click="saveForm"
      >
        <v-icon class="mr-4" size="15">mdi-content-save</v-icon>
        Save
      </v-btn>
      <v-btn
        depressed
        class="text-capitalize"
        @click="resetForm"
      >
        <v-icon class="mr-4" size="15">mdi-lock-reset</v-icon>
        Reset
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex';

import ColorInput from '@/components/ColorInput.vue';
import DateInput from '@/components/DateInput.vue';

export default {
  name: 'FormObject',

  components: {
    ColorInput,
    DateInput,
  },

  props: {
    form: {
      type: [Object, Array],
      required: true,
    },
  },

  data() {
    return {
      data: null,
      formModel: false,
      requiredRule: [
        (v) => !!v || 'Field is required',
      ],
      nameRules: [
        (v) => v.length > 5 || 'Name must be more than 5 characters',
      ],
      sizeRules: [
        (v) => (!Number.isNaN(Number(v)) && typeof (Number(v)) === 'number') || 'Size must be Number.',
      ],
    };
  },

  methods: {
    ...mapMutations({ set_form: 'form/SET_FORM_DATA' }),

    async saveForm() {
      if (this.validForm) await this.set_form(this.data);
    },

    resetForm() {
      this.data = JSON.parse(JSON.stringify(this.form));
    },

    getRules(input) {
      let rules = [...this.requiredRule];

      if (input === 'size') rules = [...rules, ...this.sizeRules];
      else if (input === 'name') rules = [...rules, ...this.nameRules];

      return rules;
    },
  },

  computed: {
    validForm() {
      return this.$refs.form.validate();
    },
  },

  mounted() {
    this.resetForm();
  },
};
</script>
