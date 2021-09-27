<template>
  <div class="container">
    <div id="companies-container">
      <base-spinner v-if="loading"></base-spinner>
      <div class="row">
        <div class="col">
          <div class="header-container">
            <div class="title">Companies</div>
            <div v-if="!showCompanyDetailOf && !showEmployeeDetailOf">
              <base-button
                type="button"
                stylevariant="primary"
                style="font-size:18px;font-family:MARKPROHEAVY;padding:5px 40px;"
              >
                Invite Company
              </base-button>
            </div>
          </div>
          <div
            v-if="
              (showCompanyDetailOf &&
                showCompanyDetailOf === companyInfo?.id) ||
                (showEmployeeDetailOf &&
                  showEmployeeDetailOf === employeeInfo?.id)
            "
          >
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" @click="showCompanyList">
                  Companies
                </li>
                <li
                  class="breadcrumb-item"
                  :class="{
                    active: !showEmployeeDetailOf
                  }"
                  @click="showCompanyDetail"
                >
                  {{ companyInfo?.name || employeeInfo?.company?.name }}
                </li>
                <li
                  v-if="
                    showEmployeeDetailOf &&
                      showEmployeeDetailOf === employeeInfo?.id
                  "
                  class="breadcrumb-item"
                  :class="{
                    active:
                      showEmployeeDetailOf &&
                      showEmployeeDetailOf === employeeInfo?.id
                  }"
                >
                  {{ employeeInfo?.first_name }}
                  {{ employeeInfo?.last_name }}
                </li>
              </ol>
            </nav>
          </div>
          <div class="error-container" v-if="error">{{ error }}</div>
        </div>
      </div>
      <employee-detail
        v-if="showEmployeeDetailOf && showEmployeeDetailOf === employeeInfo?.id"
      ></employee-detail>
      <company-detail
        v-else-if="
          showCompanyDetailOf && showCompanyDetailOf === companyInfo?.id
        "
      ></company-detail>
      <company-list v-else></company-list>
    </div>
  </div>
</template>

<script>
import CompanyList from "../../components/BackOffice/Company/list.vue";
import CompanyDetail from "../../components/BackOffice/Company/detail.vue";
import EmployeeDetail from "../../components/BackOffice/employee/detail.vue";

export default {
  components: { CompanyList, CompanyDetail, EmployeeDetail },
  data() {
    return { showCompanyDetailOf: null, showEmployeeDetailOf: null };
  },
  methods: {
    showCompanyList() {
      this.showCompanyDetailOf = null;
      this.showEmployeeDetailOf = null;
      this.$router.push(`/backoffice/dashboard/Companies`);
    },
    showCompanyDetail() {
      if (this.employeeInfo?.company?.id) {
        this.showEmployeeDetailOf = null;
        this.$router.push(
          `/backoffice/dashboard/Companies?companyId=${this.employeeInfo.company.id}`
        );
      }
    },
    functionToRunWhenParamsChange() {
      if (this.$route.query?.companyId) {
        this.showCompanyDetailOf = this.$route.query.companyId;
      }
      if (this.$route.query.employeeId) {
        this.showEmployeeDetailOf = this.$route.query.employeeId;
      }
    }
  },
  watch: {
    "$route.params": "functionToRunWhenParamsChange",
    error(val) {
      if (val) {
        window.scrollTo(0, 0);
      }
    },
    showCompanyDetailOf(val) {
      if (val) {
        this.$store.dispatch("company/getCompanyInfo", val);
      }
    },
    showEmployeeDetailOf(val) {
      if (val) {
        this.$store.dispatch("employees/employeeInfo", val);
      }
    }
  },
  computed: {
    loading() {
      return (
        this.$store.getters["company/loading"] ||
        this.$store.getters["enumerates/loading"] ||
        this.$store.getters["employees/loading"] ||
        this.$store.getters["payments/loading"]
      );
    },
    error() {
      return (
        this.$store.getters["company/error"] ||
        this.$store.getters["enumerates/error"] ||
        this.$store.getters["employees/error"] ||
        this.$store.getters["payments/error"]
      );
    },
    companyInfo() {
      return this.$store.getters["company/companyInfo"];
    },
    employeeInfo() {
      return this.$store.getters["employees/employeeInfo"];
    }
  },
  beforeMount() {
    this.$store.dispatch("enumerates/getCountriesEnumerates");
    this.$store.dispatch("enumerates/getCurrenciesEnumerates");
    this.$store.dispatch("enumerates/getTimezonesEnumerates");
    if (this.$route.query.companyId) {
      this.showCompanyDetailOf = this.$route.query.companyId;
    }
    if (this.$route.query.employeeId) {
      this.showEmployeeDetailOf = this.$route.query.employeeId;
    }
  }
};
</script>

<style scoped>
#companies-container .header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#companies-container .header-container .title {
  color: #150e4a;
  font-family: MARKPROMEDIUM;
  font-size: 24px;
}
</style>
