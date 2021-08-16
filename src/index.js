import { renderTodos } from './views'
import { setFilters } from './filters'
import { createTodo } from './todos'

// Render initial todos
renderTodos()

// event-listener for filtering todos
document.querySelector('#filter-todo').addEventListener('input', (e) => {
	setFilters({
		searchText: e.target.value,
	})
	renderTodos()
})

// event-listener to show incomplete todos
document.querySelector('#tasks-left').addEventListener('change', (e) => {
	setFilters({
		isChecked: e.target.checked,
	})
	renderTodos()
})

// event-listener for adding todos
document.querySelector('#add-todo').addEventListener('submit', (e) => {
	e.preventDefault() // prevents default actions of submit event, like page reload
	const todoText = e.target.elements.addTodo.value.trim()
	createTodo(todoText)
	renderTodos()
	e.target.elements.addTodo.value = ''
})

window.addEventListener('storage', (e) => {
	if (e.key === 'todos') {
		renderTodos()
	}
})
