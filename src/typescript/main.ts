 import { TodoList } from "./TodoList";



// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('form')! as HTMLFormElement;
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         addTodo();
//     });
// });

// function addTodo(): void {
//     const todoEl = document.getElementById('todoInput') as HTMLInputElement;
//     const priorityEl = document.getElementById('priorityInput') as HTMLInputElement;
//     const completedEl = document.getElementById('addTodoBtn') as HTMLButtonElement;

//     const todoInput = todoEl.value;
//     const priorityInput = priorityEl.value;
//     completedEl.addEventListener('click', function () {
//         const completedBtn = true;

//         if (todoInput && typeof priorityInput === "number" && priorityInput >= 1 && priorityInput <= 3 && completedBtn) {
//             const newTodo = new TodoList(todoInput, priorityInput, completedBtn)
//             TodoManager.addTodo(newTodo);
//             todoInput.value = ''; //rensar input fälten
//             priorityInput.value = '';

//             renderTodos();
//         }
//     });

// }

// function renderTodos(): void {

// }