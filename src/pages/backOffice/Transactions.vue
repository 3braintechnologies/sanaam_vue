<template>
  <div class="container">
    <div id="transactions-container">
      <base-spinner v-if="loading"></base-spinner>
      <div class="row">
        <div class="col">
          <div class="header-container">
            <div class="title">Transactions</div>
            <div
              class="filter-container"
              v-if="table !== 'SalariesTransfersTable'"
            >
              <div class="title">Filter by</div>
              <div style="width:180px;">
                <base-select
                  placeholder="All"
                  :options="getCompanyOptions"
                  field="selectedCompany"
                  :value="selectedCompany"
                  @change-value="setValue"
                  :style="getCompanySelectStyle"
                />
              </div>
            </div>
          </div>
          <div class="error-container" v-if="error">{{ error }}</div>
        </div>
      </div>

      <div style="position: absolute;">
        <div class="table-tab-contianer">
          <div class="LeftTab" @click="setTable('WithdrawalRequestsTable')">
            <img
              :src="
                table === 'WithdrawalRequestsTable'
                  ? '/images/Tab2.svg'
                  : '/images/Tab2Blue.svg'
              "
              alt="withDrawTab"
              @click="setTable('WithdrawalRequestsTable')"
            />
            <div class="block" @click="setTable('WithdrawalRequestsTable')">
              <div class="label">Withdrawal Requests</div>
              <div class="count">{{ getWithdrawalRequestsCount() }}</div>
            </div>
          </div>
          <div class="CenterTab" @click="setTable('OvertimeRequestsTable')">
            <img
              :src="
                table === 'OvertimeRequestsTable'
                  ? '/images/Tab2.svg'
                  : '/images/Tab2Blue.svg'
              "
              alt="withDrawTab"
              @click="setTable('OvertimeRequestsTable')"
            />
            <div class="block" @click="setTable('OvertimeRequestsTable')">
              <div class="label">Overtime Requests</div>
              <div class="count">{{ getOvertimeRequestCount() }}</div>
            </div>
          </div>
          <div class="RightTab" @click="setTable('SalariesTransfersTable')">
            <img
              :src="
                table === 'SalariesTransfersTable'
                  ? '/images/Tab2.svg'
                  : '/images/Tab2Blue.svg'
              "
              alt="withDrawTab"
              @click="setTable('SalariesTransfersTable')"
            />
            <div class="block" @click="setTable('SalariesTransfersTable')">
              <div class="label">Salaries Transfers</div>
              <div class="count">{{ getSalariesTransfersCount() }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:105px;">
        <div class="col">
          <!-- table -->
          <component
            :is="table"
            :selectedCompany="selectedCompany"
            :page_size="page_size"
            :getPaymentListMethod="getPaymentListMethod"
            :getCompanyListMethod="getCompanyListMethod"
            :getOvertimeListMethod="getOvertimeListMethod"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WithdrawalRequestsTable from "./WithdrawalRequestsTable.vue";
import OvertimeRequestsTable from "./OvertimeRequestsTable.vue";
import SalariesTransfersTable from "./SalariesTransfersTable.vue";

export default {
  components: {
    WithdrawalRequestsTable,
    OvertimeRequestsTable,
    SalariesTransfersTable
  },
  data() {
    return {
      selectedCompany: "default",
      table: "WithdrawalRequestsTable",
      page_size: 10
    };
  },
  methods: {
    setValue(val, field) {
      this[field] = val;
    },
    setTable(table) {
      this.table = table;
      if (table !== "SalariesTransfersTable") {
        this.getCompanyListMethod();
      }
    },
    getWithdrawalRequestsCount() {
      return this.$store.getters["payments/paymentList"]?.count;
    },
    getOvertimeRequestCount() {
      return this.$store.getters["overtimes/overtimeList"]?.count;
    },
    getSalariesTransfersCount() {
      return this.$store.getters["company/companyList"]?.count;
    },
    getPaymentListMethod(page) {
      let filters = { state: "PENDING", page, page_size: this.page_size };
      if (this.selectedCompany !== "default") {
        filters["company_id"] = this.selectedCompany;
      }
      this.$store.dispatch("payments/getPaymentList", filters);
    },
    getCompanyListMethod(page) {
      let filters = {};
      if (this.table === "SalariesTransfersTable") {
        filters = { page, page_size: this.page_size };
      }
      this.$store.dispatch("company/getCompanyList", filters);
    },
    getOvertimeListMethod(page) {
      let filters = { state: "APPROVED", page, page_size: this.page_size };
      if (this.selectedCompany !== "default") {
        filters["company_id"] = this.selectedCompany;
      }
      this.$store.dispatch("overtimes/getOvertimeList", filters);
    }
  },
  computed: {
    getCompanySelectStyle() {
      return `border-radius:22px;border:1px solid ${
        this.selectedCompany !== "default" ? "#3E83FB" : "#ECF3FF"
      };`;
    },
    getCompanyOptions() {
      return this.$store.getters["company/companyList"]?.data;
    },
    loading() {
      return (
        this.$store.getters["company/loading"] ||
        this.$store.getters["payments/loading"] ||
        this.$store.getters["overtimes/loading"] ||
        this.$store.getters["employees/loading"]
      );
    },
    error() {
      return (
        this.$store.getters["company/error"] ||
        this.$store.getters["payments/error"] ||
        this.$store.getters["overtimes/error"] ||
        this.$store.getters["employees/error"]
      );
    }
  },
  beforeMount() {
    this.getPaymentListMethod(1);
    this.getCompanyListMethod(1);
    this.getOvertimeListMethod(1);
  }
};
</script>

<style scoped>
#transactions-container .header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#transactions-container .header-container .title {
  color: #150e4a;
  font-family: MARKPROMEDIUM;
  font-size: 24px;
}
#transactions-container .header-container .filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#transactions-container .header-container .filter-container .title {
  color: #3e83fa;
  font-family: MARKPROMEDIUM;
  font-size: 16px;
  margin-right: 15px;
}
#transactions-container .table-tab-contianer {
  display: flex;
  align-items: center;
}
#transactions-container .table-tab-contianer .LeftTab {
  position: relative;
  top: 31px;
  left: -22px;
  cursor: pointer;
}
#transactions-container .table-tab-contianer .CenterTab {
  position: relative;
  top: 31px;
  left: -90px;
  cursor: pointer;
}
#transactions-container .table-tab-contianer .RightTab {
  position: relative;
  top: 31px;
  left: -155px;
  cursor: pointer;
}
#transactions-container .table-tab-contianer .block {
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
  font-family: MARKPROMEDIUM;
  cursor: pointer;
  padding: 15px;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 100%;
  position: absolute;
}
#transactions-container .table-tab-contianer .label {
  color: #3e83fb;
  font-size: 16px;
}
#transactions-container .table-tab-contianer .count {
  background: #3e83fb;
  color: #ffffff;
  font-size: 14px;
  border-radius: 20px;
  text-align: center;
  margin-left: 10px;
  line-height: 22px;
  padding: 0px 10px;
}
</style>
