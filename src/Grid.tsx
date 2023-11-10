import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useRef, useCallback } from "react";
import {
	phaGetter,
	h_magGetter,
	moid_auGetter,
	q_au_1Getter,
	q_au_2Getter,
	period_yrGetter,
	i_degGetter,
	dateFilterGetter,
} from "./scripts/getters";
import { dateFormatter } from "./scripts/formatters";
import { numberComparator, dateComparator } from "./scripts/comparators";

/*
  #######################################################
              Column Definitions
  #######################################################
*/
const columnDefs: ColDef[] = [
	{
		field: "designation",
		headerName: "Designation",
	},
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
		enableRowGroup: true,
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

	// Clear all filtering and sorting
	const clearAllFiltersSorters = useCallback(() => {
		gridRef.current!.columnApi.applyColumnState({
			defaultState: { sort: null },
		});
		gridRef.current!.api.setFilterModel(null);
	}, []);

	return (
		<>
			<button id="clear-button" onClick={clearAllFiltersSorters}>
				Clear Filters and Sorters
			</button>
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
