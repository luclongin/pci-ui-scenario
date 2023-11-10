import { ValueFormatterParams } from "ag-grid-community";

/*
  #######################################################
              Value Formatters
  #######################################################
*/

/*
  Value formatter for "discovery_date" field
  Formatting dates to the following format: dd/mm/yyyy
*/
export function dateFormatter(params: ValueFormatterParams) {
	// current date format is yyyy-mm-dd
	const dateToArray = params.value.split("T")[0].split("-");
	// new date format is dd/mm/yyyy
	const newDate =
		dateToArray[2] + "/" + dateToArray[1] + "/" + dateToArray[0];
	return newDate;
}
