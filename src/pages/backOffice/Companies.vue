<template>
  <div class="container">
    <div id="companies-container">
      <base-spinner v-if="loading"></base-spinner>
      <div class="row">
        <div class="col">
          <div class="header-container">
            <div class="title">Companies</div>
            <div v-if="!showCompanyDetailOf">
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
              showCompanyDetailOf && showCompanyDetailOf === companyInfo?.id
            "
          >
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" @click="setCompanyId(null)">
                  Companies
                </li>
                <li class="breadcrumb-item active">
                  {{ companyInfo?.name }}
                </li>
              </ol>
            </nav>
          </div>
          <div class="error-container" v-if="error">{{ error }}</div>
        </div>
      </div>
      <company-detail
        v-if="showCompanyDetailOf && showCompanyDetailOf === companyInfo?.id"
      ></company-detail>
      <company-list v-else @set-company-id="setCompanyId"></company-list>
    </div>
  </div>
</template>

<script>
import CompanyList from "../../components/BackOffice/Company/list.vue";
import CompanyDetail from "../../components/BackOffice/Company/detail.vue";

export default {
  components: { CompanyList, CompanyDetail },
  data() {
    return { showCompanyDetailOf: null };
  },
  methods: {
    setCompanyId(id) {
      if (id) {
        this.showCompanyDetailOf = id;
        this.$store.dispatch("company/getCompanyInfo", id);
      } else {
        this.showCompanyDetailOf = null;
      }
    }
  },
  watch: {
    error(val) {
      if (val) {
        window.scrollTo(0, 0);
      }
    }
  },
  computed: {
    loading() {
      return (
        this.$store.getters["company/loading"] ||
        this.$store.getters["enumerates/loading"] ||
        this.$store.getters["employees/loading"]
      );
    },
    error() {
      return (
        this.$store.getters["company/error"] ||
        this.$store.getters["enumerates/error"] ||
        this.$store.getters["employees/error"]
      );
    },
    companyInfo() {
      return this.$store.getters["company/companyInfo"];
    }
  },
  beforeMount() {
    this.$store.dispatch("enumerates/getCountriesEnumerates");
    this.$store.dispatch("enumerates/getCurrenciesEnumerates");
    this.$store.dispatch("enumerates/getTimezonesEnumerates");
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
