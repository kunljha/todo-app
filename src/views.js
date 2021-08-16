import { getTodos, saveTodos, removeTodo, toggleTodo } from './todos'
import { getFilters } from './filters'

// Rendering elements via DOM
const renderTodos = () => {
	const todoEl = document.querySelector('#todos')
	const todos = getTodos()
	const filters = getFilters()

	// filtering todos
	const filteredTodos = todos.filter((todo) => {
		const searchTodo = todo.task
			.toLowerCase()
			.includes(filters.searchText.toLowerCase())
		const checkboxTodo = !filters.isChecked || !todo.completed
		return searchTodo && checkboxTodo
	})

	//clearing previous todos before showing next todos
	todoEl.innerHTML = ''

	// counting number of todos that are incomplete
	const falseTodos = filteredTodos.filter((todo) => !todo.completed)
	todoEl.appendChild(generateSummaryDOM(falseTodos))

	// adding elements via DOM to show them in browser
	if (filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			todoEl.appendChild(generateTodoDOM(todo))
		})
	} else {
		const zeroTodos = document.createElement('p')
		zeroTodos.textContent = 'No tasks remaining to complete.'
		zeroTodos.classList.add('empty-message')
		todoEl.appendChild(zeroTodos)
	}
}

// adding todos via DOM to show in Browser
const generateTodoDOM = (todo) => {
	// setup container Div
	const todoEl = document.createElement('label')
	const containerEl = document.createElement('div')
	const todoCheckbox = document.createElement('input')
	const todoText = document.createElement('span')
	const removeButton = document.createElement('button')

	// setup checkbox
	todoCheckbox.setAttribute('type', 'checkbox') //imp. to set a checkbox
	todoCheckbox.checked = todo.completed // to show tick-mark on checkbox
	containerEl.appendChild(todoCheckbox)
	todoCheckbox.addEventListener('change', () => {
		toggleTodo(todo.id)
		saveTodos()
		renderTodos()
	})

	// setup todoText
	todoText.textContent = todo.task
	containerEl.appendChild(todoText)

	// setup container
	todoEl.classList.add('list-item')
	containerEl.classList.add('list-item__container')
	todoEl.appendChild(containerEl)

	// setup removeButton
	removeButton.textContent = 'Remove'
	removeButton.classList.add('button', 'button--text')
	todoEl.appendChild(removeButton)
	removeButton.addEventListener('click', () => {
		removeTodo(todo.id)
		saveTodos()
		renderTodos()
	})

	return todoEl
}

// counting number of incomplete todos
const generateSummaryDOM = (falseTodos) => {
	const summaryText = document.createElement('h3')
	summaryText.classList.add('list-message')
	const ifPlural = falseTodos.length === 1 ? 'task' : 'tasks'
	summaryText.textContent = `You have ${falseTodos.length} ${ifPlural} left.`
	return summaryText
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }
