<template>
  <Drawer>
    <ProductList />
  </Drawer>
</template>

<script>

import ProductList from '../../components/Products/Product.vue';
import Drawer from '../../components/Drawer/index.vue';

export default {
  name: 'Products',

  components: {
    ProductList,
    Drawer,
  },
  async created() {
    await this.$store.dispatch('products_fetchProduct');
  },
};
</script>
