<template>
  <div>
    <div id="table-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="header-cell">
              <span class="header-name">Company Name</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Total Net Salaries</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Total Withdrawn</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Remaining Balance</span>
            </th>
          </tr>
        </thead>

        <tbody v-for="(row, index) in data" :key="index">
          <tr class="table-row">
            <td class="column-cell">
              {{ row?.name }}
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.currency }}</span>
                {{ row?.net_salaries }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.currency }}</span>
                {{ row?.withdrawals }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.currency }}</span>
                {{ row?.balance }}
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
    <nav
      aria-label="Page navigation example"
      v-if="totalPage && data && data.length"
    >
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: activePage === 1 }"
          @click="prevPage"
        >
          <span class="page-link"
            ><span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li
          class="page-item"
          v-for="page in totalPage"
          :key="page"
          :class="{ active: page === activePage }"
          @click="changePage(page)"
        >
          <span class="page-link">
            {{ page }}
          </span>
        </li>
        <li
          class="page-item"
          :class="{ disabled: activePage === totalPage }"
          @click="nextPage"
        >
          <span class="page-link"
            ><span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["page_size", "getCompanyListMethod"],
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
    prevPage() {
      if (this.activePage > 1) {
        this.activePage = this.activePage - 1;
      }
    },
    changePage(page) {
      this.activePage = page;
    },
    nextPage() {
      if (this.activePage < this.totalPage) {
        this.activePage = this.activePage + 1;
      }
    }
  },
  watch: {
    activePage(val) {
      this.getCompanyListMethod(val);
    },
    companyList(res) {
      this.data = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    companyList() {
      return this.$store.getters["company/companyList"];
    },
    loading() {
      return this.$store.getters["company/loading"];
    }
  },
  beforeMount() {
    this.getCompanyListMethod(this.activePage);
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
</style>
