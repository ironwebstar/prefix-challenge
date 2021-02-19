<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="12">
        <p class="text-h5">Prefix Software Feature Assessment</p>
      </v-col>
    </v-row>
    <v-form lazy-validation ref="form" v-model="formModel">
      <v-row v-if="form" justify="center" align="start">
        <v-col sm="12" md="6" class="pr-5">
          <div class="font-weight-bold text-h6 pb-4">Info</div>
          <v-text-field
            v-model="form.name"
            required
            outlined
            label="Name"
            :rules="[...nameRules, ...requiredRule]"
          ></v-text-field>

          <v-menu
            ref="dobMenu"
            v-model="dobMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.dateOfBirth"
                label="Date of Birth"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
                :rules="requiredRule"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="form.dateOfBirth"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-checkbox v-model="form.male" label="Male" />
        </v-col>

        <v-col sm="12" md="6" class="pl-5">
          <div class="font-weight-bold text-h6 pb-4">Configuration</div>
          <v-text-field
            v-model="form.color"
            hide-details
            outlined
            required
            class="pa-0 mb-5"
            label="Color"
            :rules="requiredRule"
          >
            <template v-slot:append>
              <v-menu
                v-model="colorMenu"
                top
                nudge-bottom="105"
                nudge-left="16"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <div :style="swatchStyle" v-on="on" />
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker v-model="form.color" flat />
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
          <v-text-field
            v-model="form.size"
            outlined
            label="Size"
            class="py-2"
            :rules="[...requiredRule, ...sizeRules]"
          />

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
        </v-col>
      </v-row>
    </v-form>

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

export default {
  name: 'Home',

  data() {
    return {
      title: 'Prefix Software Feature Assessment',
      form: null,
      dobMenu: false,
      colorMenu: false,
      formModel: false,
      colorMask: '!#XXXXXX',
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

  watch: {
    dobMenu(val) {
      if (val) {
        setTimeout(() => { this.$refs.picker.activePicker = 'YEAR'; });
      }
    },
  },

  methods: {
    ...mapMutations({ set_form: 'form/SET_FORM_DATA' }),

    save(date) {
      this.$refs.dobMenu.save(date);
    },

    async saveForm() {
      if (this.validForm) await this.set_form(this.form);
    },

    resetForm() {
      this.form = JSON.parse(JSON.stringify(this.formData));
    },
  },

  computed: {
    ...mapGetters({
      formData: 'form/formData',
    }),

    validForm() {
      return this.$refs.form.validate();
    },

    swatchStyle() {
      return {
        backgroundColor: this.form.color,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: this.colorMenu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    },
  },

  mounted() {
    this.resetForm();
  },
};
</script>
