<template>
  <base-table :data="tableData" :columns="tableColumns"> </base-table>
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
  }
};
</script>
