import { ValueGetterParams } from "ag-grid-community";
/*
  #######################################################
              Getter functions
  #######################################################
  
  These are needed to filter columns of numbers, otherwise the numbers remain in String format
  Should be able to find a way to not duplicate all these functions,
  need to find the type of "field", weirdly ColDefField is not recognized from the ag-grid-community library

*/

// getter for "pha" column
export function phaGetter(params: ValueGetterParams) {
    //Current format is Y, N, n/a, format to Yes, No and empty string
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
	}
}

// getter for "h_mag" column
export function h_magGetter(params: ValueGetterParams) {
	return params.data.h_mag != null ? Number(params.data.h_mag) : null;
}

// getter for "moid_au" column
export function moid_auGetter(params: ValueGetterParams) {
	return params.data.moid_au != null ? Number(params.data.moid_au) : null;
}

// getter for "q_au_1" column
export function q_au_1Getter(params: ValueGetterParams) {
	return params.data.q_au_1 != null ? Number(params.data.q_au_1) : null;
}

// getter for "q_au_2" column
export function q_au_2Getter(params: ValueGetterParams) {
	return params.data.q_au_2 != null ? Number(params.data.q_au_2) : null;
}

// getter for "period_yr" column
export function period_yrGetter(params: ValueGetterParams) {
	return params.data.period_yr != null ? Number(params.data.period_yr) : null;
}

// getter for "i_deg" column
export function i_degGetter(params: ValueGetterParams) {
	return params.data.i_deg != null ? Number(params.data.i_deg) : null;
}

// Converting ISO dates to JS Date object for the date filtering to work
export function dateFilterGetter(params: ValueGetterParams) {
	return new Date(params.data.discovery_date);
}
