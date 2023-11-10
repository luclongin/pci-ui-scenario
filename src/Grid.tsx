import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function dateFormatter(params: ValueFormatterParams) {
  // current date format is yyyy-mm-dd
	const dateToArray = params.value.split("T")[0].split("-");
  // return US date format (mm/dd/yyyy)
  const newDate = dateToArray[1] + "/" + dateToArray[2] + "/" + dateToArray[0];
  return newDate;
}

const columnDefs: ColDef[] = [
	{ field: "designation", headerName: "Designation" },
	{
		field: "discovery_date",
		headerName: "Discovery Date",
		valueFormatter: (params) => dateFormatter(params)
	},
	{ field: "h_mag", headerName: "H (mag)" },
	{ field: "moid_au", headerName: "MOID (au)" },
	{ field: "q_au_1", headerName: "q (au)" },
	{ field: "q_au_2", headerName: "Q (au)" },
	{ field: "period_yr", headerName: "Period (yr)" },
	{ field: "i_deg", headerName: "Inclination (deg)" },
	{ field: "pha", headerName: "Potentially Hazardous" },
	{ field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
