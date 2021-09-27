<template>
  <div id="transaction-history-table">
    <div class="tab">
      <img src="/images/Tab2.svg" alt="withDrawTab" />
      <span class="table-title">Transaction History</span>
    </div>
    <div id="table-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="header-cell">
              <span class="header-name">Date</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Time </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Transaction Type </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Amount </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Withdraw Fee </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Available Amount </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Status </span>
            </th>
          </tr>
        </thead>

        <tbody v-for="(row, index) in transactionHistoryData" :key="index">
          <tr class="table-row">
            <td class="column-cell">{{ getDate(row?.created_at) }}</td>
            <td class="column-cell">{{ getTime(row?.created_at) }}</td>
            <td class="column-cell">{{ row?.intent }}</td>
            <td class="column-cell">
              <span class="currency">
                {{ row?.company?.currency }}
              </span>
              {{ row?.amount }}
            </td>
            <td class="column-cell">
              <span class="currency">
                {{ row?.company?.currency }}
              </span>
              {{ row?.fees }}
            </td>
            <td class="column-cell">
              <span class="currency">
                {{ row?.company?.currency }}
              </span>
              1000
            </td>
            <td class="column-cell">
              <span class="success-tube">{{ row?.state }}</span>
            </td>
          </tr>
        </tbody>

        <tbody
          v-if="
            !loading &&
              (!transactionHistoryData || !transactionHistoryData.length)
          "
        >
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
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      transactionHistoryData: null,
      page_size: 10,
      activePage: 1,
      totalPage: 0
    };
  },
  methods: {
    getDate(val) {
      return val ? moment(val).format("DD/MM/YYYY") : "N/A";
    },
    getTime(val) {
      return val ? moment(val).format("h:mm a") : "N/A";
    },
    getPaymentListMethod(page) {
      let filters = { page, page_size: this.page_size };
      if (this.$route.query.employeeId) {
        filters["employee_id"] = this.$route.query.employeeId;
      }
      this.$store.dispatch("payments/getPaymentList", filters);
    }
  },
  watch: {
    activePage(val) {
      this.getPaymentListMethod(val);
    },
    paymentList(res) {
      this.transactionHistoryData = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    paymentList() {
      return this.$store.getters["payments/paymentList"];
    }
  },
  beforeMount() {
    this.getPaymentListMethod(1);
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
.table .header-name {
  color: #150e4a;
  font-size: 13px;
  font-family: MARKPROHEAVY;
  opacity: 0.3;
}
#transaction-history-table .tab {
  position: relative;
  top: 31px;
  left: -22px;
  cursor: pointer;
}
#transaction-history-table .tab .table-title {
  border-radius: 10px 10px 0px 0px;
  font-family: MARKPROMEDIUM;
  font-size: 16px;
  color: #3e83fb;
  cursor: pointer;
  padding: 15px;
  top: 50%;
  left: 14%;
  transform: translate(-50%, -50%);
  position: absolute;
}
#transaction-history-table .currency {
  font-size: 8px;
  position: relative;
  bottom: 3px;
  margin-right: 2px;
}
#transaction-history-table .success-tube {
  color: #22d559;
  font-size: 10px;
  font-family: MARKPROBOLD;
  border-radius: 14px;
  background-color: #e4fdec;
  text-align: center;
  padding: 2px 8px;
}
</style>
