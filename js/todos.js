'use strict';

// DOM Manipulation
let todos = readingTodos();

// filtering
const filters = {
	searchText: '',
	isChecked: false,
};

renderTodos(todos, filters); // to show initial todos to user

// All Event-Listerner in ToDo-App

// event-listener for filtering todos
document.querySelector('#filter-todo').addEventListener('input', (e) => {
	filters.searchText = e.target.value;
	renderTodos(todos, filters);
});

// event-listener for adding todos
document.querySelector('#add-todo').addEventListener('submit', (e) => {
	e.preventDefault(); // prevents default actions of submit, like page reload
	const todoText = e.target.elements.addTodo.value.trim();
	if (todoText.length > 0) {
		todos.push({
			id: uuidv4(),
			task: todoText,
			completed: false,
		});

		savedTodos(todos); // adding new todos in localStorage
		renderTodos(todos, filters);
		e.target.elements.addTodo.value = '';
	}
});

// event-listener to show incomplete todos
document.querySelector('#tasks-left').addEventListener('change', (e) => {
	filters.isChecked = e.target.checked;
	renderTodos(todos, filters);
});
