<template>
  <v-card>
    <v-card-title>
      Pedidos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        class="mr-6 search pb-2"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

      <v-dialog v-model="goToProducts" max-width="700px">
        <v-card>
          <template>
            <v-data-table
              :headers="headersP"
              :items="orders"
              :search="search"
              hide-default-footer
              no-data-text="Nenhum produto foi encontrado"
            ></v-data-table>
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="goToProducts = false; clearOrder()"
            >
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveProducts()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog persistent v-model="addDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="button" dark class="mb-2" v-bind="attrs" v-on="on">
            Fazer pedido
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ order.id ? `Editar pedido` : `Adicionar pedido` }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="order.waiter_id"
                      label="Garçom"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="order.tab"
                    label="Comanda"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="addDialog = false; clearOrder()"
            >
              Cancelar
            </v-btn>
            <v-btn color="white darken-1" text @click="clearOrder">
              Limpar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveOrder(); clearOrder()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteDialog" max-width="410px">
        <v-card>
          <v-card-title class="text-h5">Confirmar exclusão do pedido?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
      hide-default-footer
      no-data-text="Nenhum ambiente foi encontrado"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.cart="{ item }">
        <v-icon
          medium
          @click="editProducts(item)"
        >
          shopping_cart
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      deleteDialog: false,
      addDialog: false,
      goToProducts: false,
      search: '',
      headers: [
        { text: 'Cliente', value: 'user_name' },
        { text: 'Valor total', value: 'total', sortable: true },
        { text: 'Feito em', value: 'createdAt', sortable: true },
        {
          text: 'Produtos', value: 'cart', sortable: false, filterable: false,
        },
        {
          text: 'Ações', value: 'actions', sortable: false, filterable: false,
        },
      ],
      headersP: [
        { text: 'Nome', value: 'name' },
        { text: 'Ambiente', value: 'environment' },
        { text: 'Unidades', value: 'units' },
        { text: 'Valor Total', value: 'price' },
      ],
    };
  },
  created() {
    this.clearOrder();
  },
  computed: {
    orders() {
      const orders = this.$store.state.orders.orders?.map((order) => {
        const createdAt = order.createdAt
        .replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$3/$2/$1 - $4:$5')
        .substr(0, 18);
        const totalPrice = order.products
        .reduce((t, product) => t + product.products_ordereds.price, 0);
        return {
          id: order.id,
          user_name: order.tab.user.name,
          total: `R$${totalPrice}`,
          tab: order.tab.id,
          createdAt,
          name: order.products[0].name,
          is_available: order.products[0].is_available,
          price: `R$${order.products[0].price}`,
          environment: order.products[0].environment.name,
          units: order.products[0].products_ordereds.units,
        };
      });
      return orders;
    },
  },
  methods: {
    clearOrder() {
      this.order = {
        waiter_id: '',
        tab: '',
      };
    },
    editProducts(order) {
      this.order = order;
      this.goToProducts = true;
    },
    editItem(order) {
      this.order = order;
      this.addDialog = true;
    },
    async saveOrder() {
      const date = Date.UTC();
      this.order.updated_at = date;
      this.order.tab_id = Number(this.order.tab);
      this.order.waiter_id = Number(this.order.waiter_id);

      if (this.order.id) {
        console.log(this.order);
        await this.$store.dispatch('orders_updateOrder', this.order);
      } else {
        this.order.created_at = date;
        console.log(this.order);

        await this.$store.dispatch('orders_createOrder', this.order);
      }

      this.addDialog = false;
    },
    deleteItem(order) {
      this.orderToDelete = order.order;
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch('orders_deleteOrder', this.orderToDelete);
      this.deleteDialog = false;
    },
  },
};
</script>

<style scoped>
.search {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>
