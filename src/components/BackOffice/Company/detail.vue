<template>
  <div id="company-detail-view">
    <div class="block">
      <div class="left">
        <div class="logoContainer">
          <img
            :src="
              companyInfo.image
                ? companyInfo.image
                : '/images/no-image-found.png'
            "
            alt="comLogo"
          />
        </div>
        <div class="comInfoContainer">
          <div class="comName">{{ companyInfo?.name }}</div>
          <div v-if="companyInfo.admins?.length">
            <div class="flexContainer">
              <div class="label">Admin:</div>
              <div class="val">
                <span>
                  {{ companyInfo.admins[0]?.first_name }}
                  {{ companyInfo.admins[0]?.last_name }}
                </span>
                <a href="#" class="changeLink">
                  Change
                </a>
              </div>
            </div>
            <div class="flexContainer" style="margin-top:10px;">
              <div class="label">Email:</div>
              <div class="val">
                <span>{{ companyInfo.admins[0]?.email }}</span>
              </div>
            </div>
            <div class="flexContainer" style="margin-top:10px;">
              <div class="label">Phone Number:</div>
              <div class="val">
                {{ companyInfo.admins[0]?.profile?.phone }}
              </div>
            </div>
          </div>
          <div class="flexContainer" style="margin-top:10px;">
            <div class="label">Country:</div>
            <div class="val">
              {{
                companyInfo?.country && countriesEnumerates?.length
                  ? countriesEnumerates.find(
                      each => each.id === companyInfo.country
                    ).name
                  : ""
              }}
            </div>
          </div>
          <div class="flexContainer" style="margin-top:10px;">
            <div class="label">Currency:</div>
            <div class="val">
              {{
                companyInfo?.currency && currenciesEnumerates?.length
                  ? currenciesEnumerates.find(
                      each => each.id === companyInfo.currency
                    ).name
                  : ""
              }}
            </div>
          </div>
          <div class="flexContainer" style="margin-top:10px;">
            <div class="label">Time zone:</div>
            <div class="val">
              {{
                companyInfo?.timezone && timezonesEnumerates?.length
                  ? timezonesEnumerates.find(
                      each => each.id === companyInfo.timezone
                    ).name
                  : ""
              }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Account:</div>
            <div class="val">
              <span style="font-size:12px;">Activated</span>
              {{ companyInfo.is_active }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <div class="empNumberContainer" style="margin-bottom:20px;">
            <div class="label">Total Number of Employees</div>
            <div class="val" style="padding:10px 0px;">
              {{ companyInfo.total_employees }}
            </div>
          </div>
          <div class="empNumberContainer">
            <div class="label">Total Monthly Net Salaries</div>
            <div class="val" style="padding:10px 0px;">
              <span class="currency">{{ companyInfo.currency }}</span>
              {{ companyInfo.net_salaries }}
            </div>
          </div>
        </div>
        <div class="borderContainer" />
        <div>
          <div class="empNumberContainer" style="margin-bottom:20px;">
            <div class="label">Days designated as Work Days</div>
            <div class="val" style="padding:10px 0px;">
              {{ companyInfo.days }}
              {{
                companyInfo?.formula
                  ? companyInfo.formula === "CALENDAR-DAYS"
                    ? "Calendar Days"
                    : companyInfo.formula === "BUSINESS-DAYS"
                    ? "Working Days"
                    : ""
                  : ""
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="table-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="header-cell">
              <span class="header-name">Employee Name</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Bank Name</span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Net Monthly Salary </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Total Withdrawn </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Leaves </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Deductions </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Remaining Balance </span>
            </th>
            <th scope="col" class="header-cell">
              <span class="header-name">Account Status </span>
            </th>
          </tr>
        </thead>

        <tbody v-for="(record, index) in employeeListData" :key="index">
          <tr class="table-row">
            <td class="column-cell">
              <div class="employee-name">
                {{ record?.first_name }} {{ record?.last_name }}
                <span v-if="record?.is_admin" class="admin-tube">Admin</span>
              </div>
            </td>
            <td class="column-cell">
              <div class="bank-name" v-if="record?.banks?.length">
                {{ record.banks[0].name }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ companyInfo.currency }}</span>
                {{ record?.profile?.salary }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ companyInfo.currency }}</span>
                {{ record?.profile?.withdrawals }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ companyInfo.currency }}</span>
                {{ record?.profile?.leaves }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                <span class="currency">{{ companyInfo.currency }}</span>
                {{ record?.profile?.deductions }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary" style="font-family:MARKPROHEAVY;">
                <span class="currency">{{ companyInfo.currency }}</span>
                {{ record?.profile?.balance }}
              </div>
            </td>
            <td class="column-cell">
              <div class="salary">
                {{ record.is_active }}
              </div>
            </td>
          </tr>
        </tbody>

        <tbody
          v-if="!loading && (!employeeListData || !employeeListData.length)"
        >
          <tr class="no-data-container">
            <div class="no-data-text">No data found</div>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      aria-label="Page navigation example"
      v-if="totalPage && employeeListData && employeeListData.length"
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
export default {
  data() {
    return {
      employeeListData: null,
      page_size: 10,
      activePage: 1,
      totalPage: 0
    };
  },
  methods: {
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
    },
    getPaymentListMethod(page) {
      let filters = {
        page,
        page_size: this.page_size,
        company_id: this.$store.getters["company/companyInfo"]?.id
      };
      this.$store.dispatch("employees/getEmployeeList", filters);
    }
  },
  watch: {
    activePage(val) {
      this.getPaymentListMethod(val);
    },
    employeeList(res) {
      this.employeeListData = res?.data?.length ? res.data : null;
      this.totalPage = res?.count ? Math.ceil(res.count / this.page_size) : 0;
    }
  },
  computed: {
    employeeList() {
      return this.$store.getters["employees/employeeList"];
    },
    companyInfo() {
      return this.$store.getters["company/companyInfo"];
    },
    loading() {
      return (
        this.$store.getters["company/loading"] ||
        this.$store.getters["employees/loading"] ||
        this.$store.getters["enumerates/loading"]
      );
    },
    countriesEnumerates() {
      return this.$store.getters["enumerates/countriesEnumerates"];
    },
    currenciesEnumerates() {
      return this.$store.getters["enumerates/currenciesEnumerates"];
    },
    timezonesEnumerates() {
      return this.$store.getters["enumerates/timezonesEnumerates"];
    }
  },
  beforeMount() {
    this.getPaymentListMethod(1);
  }
};
</script>

<style scoped>
#company-detail-view {
  margin-top: 30px;
}
#company-detail-view .block {
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  margin-bottom: 15px;
}
#company-detail-view .block .left {
  flex: 0.6;
  display: flex;
}
#company-detail-view .block .left .logoContainer {
  height: 85px;
  width: 85px;
  border-radius: 50%;
  border: 1px solid #ecf3ff;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#company-detail-view .block .left .logoContainer img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
}
#company-detail-view .block .left .comInfoContainer {
  margin-left: 25px;
  color: #150e4a;
  width: 60%;
}
#company-detail-view .block .left .comInfoContainer .comName {
  font-size: 22px;
  font-family: MARKPROBOLD;
  margin-bottom: 10px;
}
#company-detail-view .block .left .comInfoContainer .flexContainer {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: MARKPRO;
}
#company-detail-view .block .left .comInfoContainer .flexContainer .changeLink {
  color: #3e83fb;
  font-family: MARKPRO;
  margin-left: 5px;
  display: none;
}
#company-detail-view .block .left .comInfoContainer .flexContainer .label {
  font-family: MARKPRO;
  flex: 0.5;
}
#company-detail-view .block .left .comInfoContainer .flexContainer .val {
  font-family: MARKPROBOLD;
  flex: 0.5;
}
#company-detail-view .block .right {
  flex: 0.4;
  display: flex;
  justify-content: space-between;
}
#company-detail-view .block .right .empNumberContainer {
  color: #150e4a;
}
#company-detail-view .block .right .empNumberContainer .label {
  font-size: 12px;
  font-family: MARKPRO;
}
#company-detail-view .block .right .empNumberContainer .val {
  font-size: 16px;
  font-family: MARKPROHEAVY;
}
#company-detail-view .block .right .empNumberContainer .val .currency {
  font-size: 10px;
  position: relative;
  bottom: 4px;
  margin-right: 2px;
}
#company-detail-view .block .right .borderContainer {
  border: 1px solid #ecf3ff;
  height: 133px;
}
#company-detail-view .table {
  background-color: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 15px;
}

#company-detail-view .header-name {
  color: #150e4a;
  font-size: 13px;
  font-family: MARKPROHEAVY;
  opacity: 0.3;
}
#company-detail-view .employee-name {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#company-detail-view .bank-name {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#company-detail-view .salary {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#company-detail-view .salary .currency {
  font-size: 10px;
  position: relative;
  bottom: 3px;
}
#company-detail-view .admin-tube {
  color: #22d559;
  background-color: #e4fdec;
  font-size: 10px;
  font-family: MARKPROBOLD;
  border-radius: 10px;
  padding: 3px 5px;
}
</style>
