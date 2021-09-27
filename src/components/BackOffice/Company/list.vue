<template>
  <div id="company-list-container">
    <div class="row">
      <div class="col">
        <div
          class="block"
          v-for="each in data"
          :key="each.id"
          @click="setCompanyId(each.id)"
        >
          <div class="left">
            <div class="logoContainer">
              <img
                :src="each?.image ? each.image : '/images/no-image-found.png'"
                alt="comLogo"
              />
            </div>
            <div class="comInfoContainer">
              <div class="comName">{{ each?.name }}</div>

              <div class="comAdmin" v-if="each?.admins?.length">
                Admin:

                <span
                  class="comAdminName"
                  v-for="(rec, index) in each.admins"
                  :key="index"
                >
                  {{ rec?.first_name }} {{ rec?.last_name }}
                  <!-- {{ index < each.admins.length - 1 ? "," : "" }} -->
                </span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="empNumberContainer">
              <div class="label">Total Number of Employees</div>
              <div class="val" style="padding:10px 0px;">
                {{ each?.total_employees }}
              </div>
            </div>
            <div class="borderContainer" />
            <div class="empNumberContainer">
              <div class="label">Total Monthly Net Salaries</div>
              <div class="val" style="padding:10px 0px;">
                <span class="currency">{{ each?.currency }}</span>
                {{ each?.net_salaries }}
              </div>
            </div>
            <div class="borderContainer" />
            <div class="empNumberContainer">
              <div class="label">Account Status</div>
              <div class="val" style="padding:10px 0px;">
                <span style="font-size:12px;">Activated</span>
                {{ each?.is_active }}
              </div>
            </div>
          </div>
        </div>
        <base-pagination
          :activePage="activePage"
          :totalPage="totalPage"
          @set-page="setPage"
        ></base-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["set-company-id"],
  data() {
    return { data: [], activePage: 1, totalPage: 0, page_size: 10 };
  },
  methods: {
    setCompanyId(id) {
      this.$emit("set-company-id", id);
    },
    setPage(page) {
      this.activePage = page;
    },
    getCompanyListMethod(page) {
      let filters = { page, page_size: this.page_size };
      this.$store.dispatch("company/getCompanyList", filters);
    }
  },
  watch: {
    activePage(val) {
      this.getCompanyListMethod(val);
    },
    companyListData(res) {
      this.data = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    companyListData() {
      return this.$store.getters["company/companyList"];
    }
  },
  beforeMount() {
    this.getCompanyListMethod(1);
  }
};
</script>

<style scoped>
#company-list-container {
  margin-top: 30px;
}
#company-list-container .block {
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 15px;
  padding: 15px 30px;
  display: flex;
  margin-bottom: 15px;
}
#company-list-container .block .left {
  flex: 0.5;
  display: flex;
  align-items: center;
}
#company-list-container .block .left .logoContainer {
  height: 85px;
  width: 85px;
  border-radius: 50%;
  border: 1px solid #ecf3ff;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#company-list-container .block .left .logoContainer img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
}
#company-list-container .block .left .comInfoContainer {
  margin-left: 25px;
  color: #150e4a;
}
#company-list-container .block .left .comInfoContainer .comName {
  font-size: 22px;
  font-family: MARKPROBOLD;
  margin-bottom: 10px;
}
#company-list-container .block .left .comInfoContainer .comAdmin {
  font-size: 12px;
  font-family: MARKPRO;
}
#company-list-container .block .left .comInfoContainer .comAdmin .comAdminName {
  font-family: MARKPROBOLD;
}
#company-list-container .block .right {
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#company-list-container .block .right .empNumberContainer {
  color: #150e4a;
}
#company-list-container .block .right .empNumberContainer .label {
  font-size: 12px;
  font-family: MARKPRO;
}
#company-list-container .block .right .empNumberContainer .val {
  font-size: 16px;
  font-family: MARKPROHEAVY;
}
#company-list-container .block .right .empNumberContainer .val .currency {
  font-size: 10px;
  position: relative;
  bottom: 4px;
  margin-right: 2px;
}
#company-list-container .block .right .borderContainer {
  border: 1px solid #ecf3ff;
  height: 57px;
}
</style>
