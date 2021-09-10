<template>
  <div id="transactions-container">
    <base-spinner v-if="loading"></base-spinner>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="header-container">
            <div class="title">Transactions</div>
            <div className="filter-container">
              <div className="title">Filter by</div>
              <div style="width:180px;margin-right:15px;">
                <base-select
                  placeholder="Select Company"
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
    </div>

    <div class="row" style="margin-top:25px;">
      <div class="col">
        <base-table
          :data="tableData"
          :columns="tableColumns"
          :fullRadius="true"
          :showSubTableFor="0"
          ><base-table
            :data="tableData"
            :columns="tableColumns"
            :subTable="true"
          ></base-table>
        </base-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      selectedCompany: "default",
      tableData: [{ id: 1 }, { id: 2 }, { id: 3 }],
      tableColumns: [
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          HeaderCell: data => {
            return `<b style="color:red;"> ${data} </b>`;
          },
          Cell: data => {
            return `<b style="color:red;">Employee Name ${data}</b>`;
          }
        },
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          Cell: (data, row, index) => {
            return "Employee Name " + index;
          }
        },
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          Cell: (data, row, index) => {
            return "Employee Name " + index;
          }
        },
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          Cell: (data, row, index) => {
            return "Employee Name " + index;
          }
        },
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          Cell: (data, row, index) => {
            return "Employee Name " + index;
          }
        }
      ]
    };
  },
  computed: {
    getCompanySelectStyle() {
      return `border-radius:22px;border:1px
solid ${this.selectedCompany !== "default" ? "#3E83FB" : "#ECF3FF"};`;
    }
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
</style>
