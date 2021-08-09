'use strict'

// Reading Todos
const readingTodos = () => {
	const todosJSON = localStorage.getItem('todos')

	// setting try-catch to handle error if somehow localStorage data changes
	// and shows error in console
	try {
		return todosJSON ? JSON.parse(todosJSON) : []
	} catch (e) {
		return []
	}
}

// counting number of incomplete todos
const summary = (falseTodos) => {
	const summaryText = document.createElement('h3')
	summaryText.classList.add('list-message')
	const ifPlural = falseTodos.length === 1 ? 'task' : 'tasks'
	summaryText.textContent = `You have ${falseTodos.length} ${ifPlural} left.`
	return summaryText
}

const toggleTodos = (id) => {
	const todo = todos.find((todo) => todo.id === id)

	if (todo) {
		todo.completed = !todo.completed
	}
}

// adding/updating todos in localStorage
const savedTodos = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodos = (id) => {
	const todoIndex = todos.findIndex((todo) => todo.id === id)

	if (todoIndex > -1) {
		todos.splice(todoIndex, 1)
	}
}

// adding todos via DOM to show in Browser
const addTodos = (todo) => {
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
		toggleTodos(todo.id)
		savedTodos(todos)
		renderTodos(todos, filters)
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
		removeTodos(todo.id)
		savedTodos(todos)
		renderTodos(todos, filters)
	})

	return todoEl
}

// Rendering Elements via DOM
const renderTodos = (todos, filters) => {
	const todoEl = document.querySelector('#todos')

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
	todoEl.appendChild(summary(falseTodos))

	// adding elements via DOM to show them in browser
	if (filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			todoEl.appendChild(addTodos(todo))
		})
	} else {
		const zeroTodos = document.createElement('p')
		zeroTodos.textContent = 'No tasks remaining to complete.'
		zeroTodos.classList.add('empty-message')
		todoEl.appendChild(zeroTodos)
	}
}
