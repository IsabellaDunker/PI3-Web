<template>
  <Drawer>
    <EnvironmentList />
  </Drawer>
</template>

<script>

import EnvironmentList from '../../components/Environments/Environments.vue';
import Drawer from '../../components/Drawer/index.vue';

export default {
  name: 'Environments',

  components: {
    EnvironmentList,
    Drawer,
  },
  async created() {
    await this.$store.dispatch('environments_fetchEnvironments');
  },
};
</script>
