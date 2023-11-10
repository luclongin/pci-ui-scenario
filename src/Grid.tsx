import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

/*
  #######################################################
              Value Formatters
  #######################################################
*/

/*
  Value formatter for "discovery_date" field
  Formatting dates to US format: mm/dd/yyyy
*/
function dateFormatter(params: ValueFormatterParams) {
	// current date format is yyyy-mm-dd
	const dateToArray = params.value.split("T")[0].split("-");
	const newDate = dateToArray[1] + "/" + dateToArray[2] + "/" + dateToArray[0];
	return newDate;
}

/*
  Value formatter for "pha" field
  Current format is Y, N, n/a, format to Yes, No and empty string
*/
function phaFormatter(params: ValueFormatterParams) {
	switch (params.value) {
		case "Y":
			return "Yes";
			break;
		case "N":
			return "No";
			break;
		case "n/a":
			return "";
			break;
		default:
			return "ERR";
			break;
	}
}

/*
  #######################################################
              Column Definitions
  #######################################################
*/
const columnDefs: ColDef[] = [
	{ field: "designation", headerName: "Designation" },
	{
		field: "discovery_date",
		headerName: "Discovery Date",
		valueFormatter: (params) => dateFormatter(params),
	},
	{ field: "h_mag", headerName: "H (mag)" },
	{ field: "moid_au", headerName: "MOID (au)" },
	{ field: "q_au_1", headerName: "q (au)" },
	{ field: "q_au_2", headerName: "Q (au)" },
	{ field: "period_yr", headerName: "Period (yr)" },
	{ field: "i_deg", headerName: "Inclination (deg)" },
	{
		field: "pha",
		headerName: "Potentially Hazardous",
		valueFormatter: (params) => phaFormatter(params),
	},
	{ field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true },
];

/*
  #######################################################
                       Grid
  #######################################################
*/
const NeoGrid = (): JSX.Element => {
	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
			<AgGridReact
				rowData={data}
				columnDefs={columnDefs}
				rowGroupPanelShow={"always"}
			/>
		</div>
	);
};

export default NeoGrid;
