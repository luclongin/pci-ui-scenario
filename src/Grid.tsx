import { AgGridReact } from "ag-grid-react";
import {
	ColDef,
	ValueGetterParams,
	ValueFormatterParams,
} from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useRef } from "react";

/*
  #######################################################
              Value Formatters
  #######################################################
*/

/*
  Value formatter for "discovery_date" field
  Formatting dates to the following format: dd/mm/yyyy
*/
function dateFormatter(params: ValueFormatterParams) {
	// current date format is yyyy-mm-dd
	const dateToArray = params.value.split("T")[0].split("-");
	// new date format is dd/mm/yyyy
	const newDate =
		dateToArray[2] + "/" + dateToArray[1] + "/" + dateToArray[0];
	return newDate;
}

/*
  #######################################################
              Getter functions
  #######################################################
  NOTE:
  These are needed to filter Numbers (otherwise they're used as strings) and Equals filter doesn't work
  ----------
  Should be able to find a way to not duplicate all these functions,
  need to find the type of "field", weirdly ColDefField is not recognized from ag-grid-community library
*/

/*
  Value formatter for "pha" field
  Current format is Y, N, n/a, format to Yes, No and empty string
*/
function phaGetter(params: ValueGetterParams) {
	switch (params.data.pha) {
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

function h_magGetter(params: ValueGetterParams) {
	return params.data.h_mag != null ? Number(params.data.h_mag) : null;
}

function moid_auGetter(params: ValueGetterParams) {
	return params.data.moid_au != null ? Number(params.data.moid_au) : null;
}

function q_au_1Getter(params: ValueGetterParams) {
	return params.data.q_au_1 != null ? Number(params.data.q_au_1) : null;
}

function q_au_2Getter(params: ValueGetterParams) {
	return params.data.q_au_2 != null ? Number(params.data.q_au_2) : null;
}

function period_yrGetter(params: ValueGetterParams) {
	return params.data.period_yr != null ? Number(params.data.period_yr) : null;
}

function i_degGetter(params: ValueGetterParams) {
	return params.data.i_deg != null ? Number(params.data.i_deg) : null;
}

// Converting ISO dates to JS Date object for the date filtering to work
function dateFilterGetter(params: ValueGetterParams) {
  return new Date(params.data.discovery_date);
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

function dateComparator(
	date1: string,
	date2: string,
	nodeA: any,
	nodeB: any,
	isDescending: boolean
) {
	const date1Number = monthToComparableNumber(date1);
	const date2Number = monthToComparableNumber(date2);
	if (date1Number === null && date2Number === null) {
		return 0;
	}
	if (date1Number === null) {
		return -1;
	}
	if (date2Number === null) {
		return 1;
	}
	return date1Number - date2Number;
}

// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date: string) {
	const formattedDate = date.split("T")[0];
	const yearNumber = Number(formattedDate.split("-")[0]);
	const monthNumber = Number(formattedDate.split("-")[1]);
	const dayNumber = Number(formattedDate.split("-")[2]);
	return yearNumber * 10000 + monthNumber * 100 + dayNumber;
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
		filter: "agDateColumnFilter",
		comparator: dateComparator,
		filterValueGetter: dateFilterGetter,
	},
	{
		field: "h_mag",
		headerName: "H (mag)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: h_magGetter,
	},
	{
		field: "moid_au",
		headerName: "MOID (au)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: moid_auGetter,
	},
	{
		field: "q_au_1",
		headerName: "q (au)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: q_au_1Getter,
	},
	{
		field: "q_au_2",
		headerName: "Q (au)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: q_au_2Getter,
	},
	{
		field: "period_yr",
		headerName: "Period (yr)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: period_yrGetter,
	},
	{
		field: "i_deg",
		headerName: "Inclination (deg)",
		comparator: numberComparator,
		filter: "agNumberColumnFilter",
		valueGetter: i_degGetter,
	},
	{
		field: "pha",
		headerName: "Potentially Hazardous",
		valueGetter: phaGetter,
	},
	{ 
    field: "orbit_class", 
    headerName: "Orbit Class", 
    enableRowGroup: true
  },
];

/*
  #######################################################
                       Grid
  #######################################################
*/
const NeoGrid = (): JSX.Element => {
	const gridRef = useRef<AgGridReact>(null);

	const defaultColDef = useMemo<ColDef>(() => {
		return {
			sortable: true,
			filter: "agTextColumnFilter",
			menuTabs: ["filterMenuTab"],
		};
	}, []);

	/*
  For testing that clear sort works
	const clearFiltersSorters = useCallback(() => {
		gridRef.current!.columnApi.applyColumnState({
			defaultState: { sort: null },
		});
	}, []); */

	return (
		<>
			{/*<button id="" onClick={clearFiltersSorters}>
            Clear Filters and Sorters
      </button>*/}
			<div
				className="ag-theme-alpine"
				style={{ height: 900, width: 1920 }}
			>
				<AgGridReact
					ref={gridRef}
					rowData={data}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					rowGroupPanelShow={"always"}
					rowSelection={"multiple"}
				/>
			</div>
		</>
	);
};

export default NeoGrid;
