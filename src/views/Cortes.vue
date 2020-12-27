<template>
  <div class="mb-2 mt-20 md:mx-16">
    <h2 class="title is-2">Cortes de caja</h2>
    <form @submit.prevent="handleCreate()">
      <div class="flex flex-wrap my-2">
        <!-- Formulario -->
        <div class="w-full px-2 md:mb-2 md:w-6/12">
          <p class="text-2xl">
              Total de Ventas desde el ultimo corte:
              <span class="font-bold">
                  ${{ cashouts.currentAmount }}
              </span>
        </p>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="p-2 w-full">
          <b-field>
            <b-button
              class="w-1/12 mr-5"
              type="is-success"
              native-type="submit"
              >Crear corte</b-button
            >
          </b-field>
        </div>
      </div>
    </form>
    <div class="px-2 mt-5">
      <b-table
        ref="instTable"
        :data="cashouts"
        :loading="isLoading"
        :paginated="true"
        :per-page="8"
        :show-detail-icon="true"
        detail-key="id"
        hoverable
        bordered
        striped
      >
        <b-table-column
          field="id"
          label="Código"
          :searchable="true"
          width="40"
          numeric
          sortable
          v-slot="props"
          >{{ props.row.id }}</b-table-column
        >
        <b-table-column
          field="user.full_name"
          :searchable="true"
          label="Usuario"
          v-slot="props"
          >{{ props.row.user.full_name }}</b-table-column
        >
        <b-table-column
          field="date"
          :searchable="true"
          label="Fecha"
          v-slot="props"
          >{{ props.row.date }}</b-table-column
        >
        <b-table-column
          field="total_sales"
          :searchable="true"
          label="Ventas Totales"
          v-slot="props"
          >${{ props.row.total_sales }}</b-table-column
        >
        <b-table-column label="Acciónes" v-slot="props">
          <b-button
            @click="handleDelete(props.row)"
            type="is-success"
            icon-right="file-document"
          />
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapState("cashouts", ["cashouts"]),
  },
  async created() {
    this.isLoading = true;
    await this.fetchCashouts();
    await this.fetchCurrentAmount();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("cashouts", {
      fetchCashouts: "fetch",
      createCashout: "store",
      fetchCurrentAmount: "fetchCurrent",
    }),
    async handleCreate() {
      try {
        let data = await this.createCashout();
        await this.fetchCurrentAmount();
        this.$buefy.toast.open({
          message: "Corte de caja creado",
          type: "is-success",
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: "Error al crear corte de caja",
          type: "is-danger",
        });
      }
    },
  },
};
</script>