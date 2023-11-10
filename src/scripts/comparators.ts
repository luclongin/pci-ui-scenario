/*
  #######################################################
              Sorting functions
  #######################################################
*/

// comparator for columns with numbers
export const numberComparator = (
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

// comparator for columns with dates
export function dateComparator(
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