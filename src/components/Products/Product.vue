<template>
  <v-card>
    <v-card-title>
      Produtos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        class="mr-6 search pb-2"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

      <v-dialog v-model="addDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Adicionar produto
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ product.id ? `Editar produto` : `Adicionar produto` }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="product.name"
                    label="Nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="product.image_url"
                    label="Imagem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="product.environment"
                    :items='environments'
                    label="Ambiente"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="product.price"
                    label="Preço"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="product.description"
                    label="Descrição"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="product.number"
                    label="Quantidade"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="product.unit_type"
                    :items='types'
                    label="Tipo unitário"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="product.is_available"
                    :items='available'
                    label="Disponibilidade"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="addDialog = false; clearProduct()"
            >
              Cancelar
            </v-btn>
            <v-btn color="white darken-1" text @click="clearProduct">
              Limpar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveProduct()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteDialog" max-width="410px">
        <v-card>
          <v-card-title class="text-h5">Confirmar exclusão do produto?</v-card-title>
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
      :items="products"
      :search="search"
      hide-default-footer
      no-data-text="Nenhum produto foi encontrado"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      deleteDialog: false,
      addDialog: false,
      search: '',
      environments: [
        'Cozinha',
        'Bar',
      ],
      types: [
        'l',
        'ml',
        'g',
        'kg',
      ],
      available: [
        'Sim',
        'Não',
      ],
      headers: [
        { text: 'Nome', value: 'name' },
        {
          text: 'Disponível',
          value: 'is_available',
          filterable: false,
          sortable: false,
        },
        { text: 'Ambiente', value: 'environment' },
        { text: 'Preço', value: 'price' },
        {
          text: 'Ações', value: 'actions', sortable: false, filterable: false,
        },
      ],
    };
  },
  created() {
    this.clearProduct();
  },
  computed: {
    products() {
      const products = this.$store.state.products.products?.map((product) => {
        const isAvailable = product.is_available ? 'Sim' : 'Não';
        const environment = product.environment_id === 2 ? 'Bar' : 'Cozinha';
        return {
          id: product.id,
          name: product.name,
          is_available: isAvailable,
          has_stock: product.has_stock,
          number: product.number,
          unit_type: product.unit_type,
          price: product.price,
          image_url: product.image_url,
          description: product.description,
          environment,
        };
      });
      return products;
    },
  },
  methods: {
    clearProduct() {
      this.product = {
        name: '',
        is_available: '',
        number: '',
        price: '',
        image_url: '',
        description: '',
        unit_type: '',
      };
    },
    editItem(product) {
      this.product = product;
      this.addDialog = true;
    },
    async saveProduct() {
      const environmentId = this.product.environment === 'Bar' ? 2 : 3;
      const available = this.product.is_available === 'Sim';
      this.product = {
        id: this.product.id,
        name: this.product.name,
        is_available: available,
        has_stock: true,
        number: this.product.number,
        unit_type: this.product.unit_type,
        price: Number(this.product.price),
        environment_id: environmentId,
      };
      if (this.product.id) {
        await this.$store.dispatch('products_updateProduct', this.product);
      } else {
        await this.$store.dispatch('products_createProduct', this.product);
      }

      this.addDialog = false;
    },
    deleteItem(product) {
      this.productToDelete = product.id;
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch('products_deleteProduct', this.productToDelete);
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
