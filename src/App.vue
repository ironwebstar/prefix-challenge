<template>
  <v-app>
    <v-app-bar fixed app class="mx-auto">
      <v-toolbar-title
        class="cursor-pointer"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-avatar size="40">
        <v-btn icon>
          <v-icon size="30">mdi-star</v-icon>
        </v-btn>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app class="mx-auto">
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <span>Footer</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    title: 'Prefix Software',
  }),
};
</script>
