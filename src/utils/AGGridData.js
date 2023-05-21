// AG Grid
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
const { Grid } = require("ag-grid-community");
const AGGridData = (data) => {
  console.log("data is here: ", data);
  const myData = data;
  // specify the columns with expandable rows and columns
  const columnDefs = [
    {
      headerName: "Post Title",
      field: "title",
      rowGroup: true,
    },
    {
      headerName: "Post Author",
      field: "author",
    },
    {
      headerName: "Details",
      field: "body",
    },
  ];

  const gridOptions = {
    columnDefs: columnDefs,
    rowData: myData,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    },
    autoGroupColumnDef: {
      headerName: "Post Title",
      field: "title",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
    },
    rowSelection: "single",
    onSelectionChanged: onSelectionChanged,
  };
  function onSelectionChanged() {
    const selectedRows = gridOptions.api.getSelectedRows();
    localStorage.setItem("postId", JSON.stringify(selectedRows[0].id));
    localStorage.setItem("postData", JSON.stringify(selectedRows[0]));
  }

  var eGridDiv = document.querySelector("#myGrid");
  new Grid(eGridDiv, gridOptions);
};

export default AGGridData;
