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
  },
};
</script>
