// Set up filters default object
const filters = {
	searchText: '',
	isChecked: false,
}

// getFilters
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or isChecked properties
// Return value: none
const setFilters = ({ searchText, isChecked }) => {
	if (typeof searchText === 'string') {
		filters.searchText = searchText
	}

	if (typeof isChecked === 'boolean') {
		filters.isChecked = isChecked
	}
}

export { getFilters, setFilters }
