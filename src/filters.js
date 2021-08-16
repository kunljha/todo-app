// Set up filters default object
const filters = {
	searchText: '',
	isChecked: false,
}

// getFilters
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = (updates) => {
	if (typeof updates.searchText === 'string') {
		filters.searchText = updates.searchText
	}

	if (typeof updates.isChecked === 'boolean') {
		filters.isChecked = updates.isChecked
	}
}

export { getFilters, setFilters }
