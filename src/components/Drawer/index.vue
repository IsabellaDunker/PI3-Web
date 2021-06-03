<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      app
    >

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-container>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.dispatch('setDrawer', value);
      },
    },
  },
};
</script>
