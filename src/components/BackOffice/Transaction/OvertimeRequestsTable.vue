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
              <span class="header-name">Hours Performed</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Date of Overtime</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Approval time</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Amount </span>
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
              {{ getHoursPerformed(row) }}
            </td>
            <td class="column-cell">
              {{ row?.date }}
            </td>
            <td class="column-cell">
              {{ getApprovedDate(row) }}
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ row?.company?.currency }}</span>
                {{ row?.amount }}
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
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["selectedCompany", "page_size", "getOvertimeListMethod"],
  data() {
    return {
      data: null,
      activePage: 1,
      totalPage: 0
    };
  },
  methods: {
    getApprovedDate(row) {
      return moment(row?.approved_at).format("DD/MM/YYYY, h:mm a");
    },
    getHoursPerformed(row) {
      return row?.duration?.length
        ? `${
            row.duration.substr(0, 2)?.length
              ? `${row.duration.substr(0, 2)}hr`
              : ""
          } ${
            row.duration.substr(3, 2)?.length
              ? `${row.duration.substr(3, 2)}min`
              : ""
          }`
        : "";
    },
    setPage(page) {
      this.activePage = page;
    }
  },
  watch: {
    activePage(val) {
      this.getOvertimeListMethod(val);
    },
    selectedCompany() {
      this.activePage = 1;
      this.getOvertimeListMethod(this.activePage);
    },
    overtimeList(res) {
      this.data = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    overtimeList() {
      return this.$store.getters["overtimes/overtimeList"];
    },
    loading() {
      return this.$store.getters["overtimes/loading"];
    }
  },
  beforeMount() {
    this.getOvertimeListMethod(this.activePage);
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
