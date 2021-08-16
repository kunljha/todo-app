// Setup the empty todos array
let todos = []

// loadTodos
const loadTodos = () => {
	const todosJSON = localStorage.getItem('todos')

	// setting try-catch to handle error if somehow localStorage data changes
	// and shows error in console
	try {
		return todosJSON ? JSON.parse(todosJSON) : []
	} catch (e) {
		return []
	}
}

// saveTodos, adding/updating todos in localStorage
const saveTodos = () => {
	localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
const getTodos = () => todos

// createTodo
const createTodo = (text) => {
	if (todoText.length > 0) {
		todos.push({
			id: uuidv4(),
			task: todoText,
			isCompleted: false,
		})

		saveTodos(todos) // adding new todos in localStorage
	}
}

// removeTodo
const removeTodo = (id) => {
	const todoIndex = todos.findIndex((todo) => todo.id === id)

	if (todoIndex > -1) {
		todos.splice(todoIndex, 1)
	}
	saveTodos()
}

// toggleTodo
const toggleTodo = (id) => {
	const todo = todos.find((todo) => todo.id === id)

	if (todo) {
		todo.completed = !todo.completed
	}
}

// Make sure to call loadTodos and setup the exports
todos = loadTodos()

export { saveTodos, getTodos, createTodo, removeTodo, toggleTodo }
