<template>
  <div>
    <div id="table-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="header-cell">
              <span class="header-name">Employee Name</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Company Name</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Request Date</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Amount</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Fees</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Net</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Withdraw Amount</span>
            </th>
          </tr>
        </thead>

        <tbody v-for="(row, index) in data" :key="index">
          <tr class="table-row">
            <td class="column-cell">
              {{ row?.employee?.name }}
            </td>
            <td class="column-cell">
              {{ row?.company?.name }}
            </td>
            <td class="column-cell">
              {{ getCreatedDate(row) }}
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.company?.currency }}</span>
                {{ row?.amount }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.company?.currency }}</span>
                {{ row?.fees }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.company?.currency }}</span>
                {{ row?.net }}
              </div>
            </td>
            <td class="column-cell">
              <div class="withdraw-action">
                <div
                  class="salary"
                  style="fontFamily:MARKPROHEAVY;marginRight:10px;flex:0.5;"
                >
                  <span class="currency">{{ row?.company?.currency }}</span>
                  {{ row?.total }}
                </div>
                <base-button
                  v-if="row?.total"
                  type="button"
                  stylevariant="secondary3"
                  style="height:28px;font-size:10px;font-family:MARKPROBOLD;flex:0.5;"
                  data-bs-toggle="modal"
                  data-bs-target="#withdrawalRequestsModal"
                  @click="getWithdrawalInfo(row?.id)"
                >
                  Transfer
                </base-button>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-if="!loading && (!data || !data.length)">
          <tr class="no-data-container">
            <div class="no-data-text">No data found</div>
          </tr>
        </tbody>
      </table>
    </div>
    <base-pagination
      :activePage="activePage"
      :totalPage="totalPage"
      @set-page="setPage"
    ></base-pagination>
    <withdrawal-requests-modal
      :getPaymentListMethod="getPaymentListMethod"
    ></withdrawal-requests-modal>
  </div>
</template>

<script>
import moment from "moment";
import WithdrawalRequestsModal from "./WithdrawalRequestsModal.vue";

export default {
  props: ["selectedCompany", "page_size", "getPaymentListMethod"],
  components: { WithdrawalRequestsModal },
  data() {
    return {
      data: null,
      activePage: 1,
      totalPage: 0
    };
  },
  methods: {
    getCreatedDate(row) {
      return moment(row?.created_at).format("DD/MM/YYYY");
    },
    setPage(page) {
      this.activePage = page;
    },
    getWithdrawalInfo(id) {
      this.$store.dispatch("payments/getPaymentInfo", id);
    }
  },
  watch: {
    activePage(val) {
      this.getPaymentListMethod(val);
    },
    selectedCompany() {
      this.activePage = 1;
      this.getPaymentListMethod(this.activePage);
    },
    paymentList(res) {
      this.data = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    settleSuccess() {
      return this.$store.getters["payments/settleSuccess"];
    },
    paymentList() {
      return this.$store.getters["payments/paymentList"];
    },
    loading() {
      return this.$store.getters["payments/loading"];
    }
  },
  beforeMount() {
    this.getPaymentListMethod(this.activePage);
  }
};
</script>

<style scoped>
.table {
  margin-bottom: auto;
  background-color: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 0px 10px 10px 10px;
}
.header-name {
  font-size: 13px;
  font-family: MARKPROHEAVY;
  opacity: 0.3;
  color: #150e4a;
}
.salary {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
.currency {
  font-size: 10px;
  position: relative;
  bottom: 3px;
}
.withdraw-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
