<template>
  <Drawer>
    <OrderList />
  </Drawer>
</template>

<script>

import OrderList from '../../components/Orders/Order.vue';
import Drawer from '../../components/Drawer/index.vue';

export default {
  name: 'Orders',

  components: {
    OrderList,
    Drawer,
  },
  async created() {
    await this.$store.dispatch('orders_fetchOrder');
    await this.$store.dispatch('orders_fetchTabs');
    await this.$store.dispatch('users_fetchUsers');
    await this.$store.dispatch('orders_fetchProduct');
  },
};
</script>
