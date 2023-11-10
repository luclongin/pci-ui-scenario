import { AgGridReact } from "ag-grid-react";
import {
	ColDef,
	ValueFormatterParams
} from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo } from "react";
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
              Sorting functions
  #######################################################
*/

/* Sort definitions:
  designation: alphabetical
  discovery_date: date
  h_mag: number
  moid_au: number
  q_au_1: number
  q_au_2: number
  period_yr: number
  i_deg: number
  pha: alphabetical
  orbit_class: alphabetical
*/

const numberComparator = (
	valueA: number | null | undefined,
	valueB: number | null | undefined,
	nodeA: any,
	nodeB: any,
	isDescending: boolean
) => {
	// do not forget to account for null values
	const newValueA = valueA == null ? 0 : valueA;
	const newValueB = valueB == null ? 0 : valueB;
	return newValueA - newValueB;
};


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
	{
		field: "h_mag",
		headerName: "H (mag)",
		comparator: numberComparator,
	},
	{ field: "moid_au", headerName: "MOID (au)", comparator: numberComparator },
	{
		field: "q_au_1",
		headerName: "q (au)",
		comparator: numberComparator,
	},
	{
		field: "q_au_2",
		headerName: "Q (au)",
		comparator: numberComparator,
	},
	{
		field: "period_yr",
		headerName: "Period (yr)",
		comparator: numberComparator,
	},
	{
		field: "i_deg",
		headerName: "Inclination (deg)",
		comparator: numberComparator,
	},
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
	// enable sorting on all columns by default
	const defaultColDef = useMemo<ColDef>(() => {
		return {
			sortable: true,
		};
	}, []);

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
			<AgGridReact
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowGroupPanelShow={"always"}
				rowSelection={"multiple"}
			/>
		</div>
	);
};

export default NeoGrid;
