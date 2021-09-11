<template>
  <base-table
    :data="tableData"
    :columns="tableColumns"
    :totalPage="totalPage"
    :activePage="activePage"
    :setActivePage="setActivePage"
  >
  </base-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ id: 1 }, { id: 2 }, { id: 3 }],
      tableColumns: [
        {
          Header: "Employee Name",
          accessor: "id",
          width: "20%",
          HeaderCell: data => {
            return `<div class="header-name">${data}</div>`;
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
      ],
      totalPage: 5,
      activePage: 1
    };
  },
  methods: {
    setActivePage(page) {
      this.activePage = page;
    }
  }
};
</script>

<style>
.header-name {
  font-size: 13px;
  font-family: MARKPROHEAVY;
  opacity: 0.3;
  color: #150e4a;
}
</style>
