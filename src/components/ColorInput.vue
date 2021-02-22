<template>
  <v-text-field
    :value="color"
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
            <v-color-picker v-model="color" flat @input="handleInput" />
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'ColorInput',

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      color: this.value,
      colorMenu: false,
      requiredRule: [
        (v) => !!v || 'Field is required',
      ],
    };
  },

  methods: {
    handleInput() {
      console.log(this.color);
      this.$emit('input', this.color);
    },
  },

  computed: {
    swatchStyle() {
      return {
        backgroundColor: this.color,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: this.colorMenu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    },
  },
};
</script>
