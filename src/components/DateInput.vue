<template>
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
        v-model="dob"
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
      v-model="dob"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DateInput',

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      dob: this.value,
      dobMenu: false,
      requiredRule: [
        (v) => !!v || 'Field is required',
      ],
    };
  },

  methods: {
    save(date) {
      this.$refs.dobMenu.save(date);
      this.$emit('input', this.dob);
    },
  },

  watch: {
    dobMenu(val) {
      if (val) {
        setTimeout(() => { this.$refs.picker.activePicker = 'YEAR'; });
      }
    },
  },
};
</script>
