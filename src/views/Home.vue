<template>
  <Drawer>
    <HomePage />
  </Drawer>
</template>

<script>
import HomePage from '../components/HomePage/index.vue';
import Drawer from '../components/Drawer/index.vue';

export default {
  name: 'Login',

  components: {
    HomePage,
    Drawer,
  },
};
</script>
