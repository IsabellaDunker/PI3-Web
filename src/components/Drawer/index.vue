<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item class="drawer-title">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="page in pages"
          :key="`drawer-list-${page.title}`"
          link :to="page.route"
        >
          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: 'Teste',
      pages: [
        {
          title: 'Home',
          route: '/',
        },
        {
          title: 'Usuários',
          route: '/users',
        },
        {
          title: 'Ambientes',
          route: '/environments',
        },
        {
          title: 'Produtos',
          route: '/products',
        },
      ],
    };
  },
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

<style scoped>
.drawer-title {
  min-height: 64px !important;
}
</style>
