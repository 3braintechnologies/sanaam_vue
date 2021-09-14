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
              <div class="withdraw-action">
                <div class="salary">
                  <span class="currency">{{ row?.currency }}</span>
                  {{ row?.balance }}
                </div>
                <div>
                  <img
                    :id="`expand_icon_${row?.id}`"
                    src="/images/chevron_dropdown_date.png"
                    alt="chevron_dropdown_date"
                    @click="setExpandId(row?.id)"
                    :style="
                      `transform:${
                        expandId === row?.id ? 'rotate(180deg)' : ''
                      };`
                    "
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr class="table-row" v-if="expandId === row?.id">
            <td class="column-cell" :colspan="4" style="padding:0px;">
              <table class="table sub-table">
                <thead>
                  <tr>
                    <th scope="col" class="header-cell">
                      <span class="header-name">Employee Name</span>
                    </th>
                    <th scope="col" class="header-cell">
                      <span class="header-name">Total Net Salary</span>
                    </th>
                    <th scope="col" class="header-cell">
                      <span class="header-name">Total Withdrawn</span>
                    </th>
                    <th scope="col" class="header-cell">
                      <span class="header-name">Leaves</span>
                    </th>
                    <th scope="col" class="header-cell">
                      <span class="header-name">Remaining Balance</span>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(row, index) in employeeData" :key="index">
                  <tr class="table-row">
                    <td class="column-cell">
                      {{ row?.first_name }} {{ row?.last_name }}
                    </td>
                    <td class="column-cell">
                      <div class="salary">
                        <span class="currency">{{
                          row?.company?.currency
                        }}</span>
                        {{ row?.profile?.salary }}
                      </div>
                    </td>
                    <td class="column-cell">
                      <div class="salary">
                        <span class="currency">{{
                          row?.company?.currency
                        }}</span>
                        {{ row?.profile?.withdrawals }}
                      </div>
                    </td>
                    <td class="column-cell">
                      <div class="salary">
                        <span class="currency">{{
                          row?.company?.currency
                        }}</span>
                        {{ row?.profile?.leaves }}
                      </div>
                    </td>
                    <td class="column-cell">
                      <div class="withdraw-action">
                        <div
                          class="salary"
                          style="flex:0.5;font-family:MARKPROHEAVY;"
                        >
                          <span class="currency">{{
                            row?.company?.currency
                          }}</span>
                          {{ row?.profile?.balance }}
                        </div>
                        <base-button
                          v-if="row?.profile?.balance"
                          type="button"
                          stylevariant="secondary3"
                          style="height:28px;font-size:10px;font-family:MARKPROBOLD;flex:0.5;"
                        >
                          Transfer
                        </base-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody
                  v-if="!loading && (!employeeData || !employeeData.length)"
                >
                  <tr class="no-data-container">
                    <div class="no-data-text">No data found</div>
                  </tr>
                </tbody>
              </table>
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
      totalPage: 0,
      employeeData: null,
      expandId: null
    };
  },
  methods: {
    setExpandId(id) {
      this.expandId = this.expandId === id ? null : id;
    },
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
    expandId(val) {
      if (val) {
        if (document.getElementById(`expand_icon_${val}`))
          document.getElementById(`expand_icon_${val}`).scrollIntoView();

        this.$store.dispatch("employees/getEmployeeList", { company_id: val });
      }
    },
    activePage(val) {
      this.getCompanyListMethod(val);
    },
    companyList(res) {
      this.data = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    },
    employeeList(res) {
      this.employeeData = res?.data?.length ? res.data : null;
    }
  },
  computed: {
    employeeList() {
      return this.$store.getters["employees/employeeList"];
    },
    companyList() {
      return this.$store.getters["company/companyList"];
    },
    loading() {
      return (
        this.$store.getters["company/loading"] ||
        this.$store.getters["employees/loading"]
      );
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
.sub-table {
  margin-bottom: 0px;
  box-shadow: none;
  border-radius: none;
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
.withdraw-action img {
  height: 19px;
  width: 19px;
  filter: brightness(0) invert(0);
  cursor: pointer;
}
</style>
