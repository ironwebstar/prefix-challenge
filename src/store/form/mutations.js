import Vue from 'vue';

export const SET_FORM_DATA = (state, data) => {
  state.formData = JSON.parse(JSON.stringify(data));
};

export const SET_FORM_NAME = (state, name) => {
  Vue.set(state.formData, 'name', name);
};
