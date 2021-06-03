<template>
  <Drawer>
    <UsersList />
  </Drawer>
</template>

<script>

import UsersList from '../../components/Users/List.vue';
import Drawer from '../../components/Drawer/index.vue';

export default {
  name: 'Users',

  components: {
    UsersList,
    Drawer,
  },
  async created() {
    await this.$store.dispatch('users_fetchUsers');
  },
};
</script>
