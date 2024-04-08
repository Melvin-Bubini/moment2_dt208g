"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TodoList_1 = require("./TodoList");
const form = document.getElementById('todoForm');
const delete_localStrgBtn = document.getElementById('delete_localStrgBtn');
const todoDiv = document.getElementById('todoDiv');
const todoCompleted = document.getElementById('todoCompleted');
const completedBtn = document.getElementById('completed_btn');
const todoBtn = document.getElementById('todo_btn');
const todoListDivs = document.getElementById('todoListDivs');
const completedListDivs = document.getElementById('completedListDivs');
document.addEventListener('DOMContentLoaded', () => {
    buildList();
    todoDiv.addEventListener('click', (e) => {
        removeTodo(e);
    });
    todoCompleted.addEventListener('click', (e) => {
        removeTodo(e);
    });
    todoBtn.addEventListener('click', (e) => {
        todoListDivs.style.display = "block";
        todoBtn.style.textDecoration = "underline";
        completedListDivs.style.display = "none";
        completedBtn.style.textDecoration = "none";
    });
    completedBtn.addEventListener('click', (e) => {
        todoListDivs.style.display = "none";
        todoBtn.style.textDecoration = "none";
        completedBtn.style.textDecoration = "underline";
        completedListDivs.style.display = "block";
    });
    delete_localStrgBtn.addEventListener('click', (e) => {
        localStorage.clear();
        todoDiv.innerHTML = "";
        todoCompleted.innerHTML = "";
        TodoList_1.TodoList.clearTodos();
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodoList();
    });
});
function removeTodo(e) {
    if (e.target.classList.contains('remove-todo')) {
        let index = Number(e.target.title);
        TodoList_1.TodoList.removeTodo(index);
    }
    if (e.target.classList.contains('box')) {
        TodoList_1.TodoList.markTodoCompleted(Number(e.target.id));
        TodoList_1.TodoList.saveToLocalStorage();
    }
    buildList();
}
function buildList() {
    TodoList_1.TodoList.loadFromLocalStorage();
    let tempArray = TodoList_1.TodoList.getTodos();
    todoDiv.innerHTML = "";
    todoCompleted.innerHTML = "";
    if (tempArray.length > 0) {
        for (let i = 0; i < tempArray.length; i++) {
            let box = "";
            let disabled = "";
            let newDiv = document.createElement("div");
            let whichDiv = todoDiv;
            if (tempArray[i].completed === true) {
                box = "checked";
                disabled = "disabled";
                whichDiv = todoCompleted;
            }
            newDiv.classList.add(`priority${tempArray[i].priority}`);
            newDiv.innerHTML = `
        <p>${tempArray[i].task}</p>
        <p class="inline priority">Prioritet: ${tempArray[i].priority}</p>
        <label for="completed" class="inline">Färdig:</label>
        <input type="checkbox" class="inline box" ${disabled} ${box} id="${i}" name="completed">
        <button title="${i}" class="remove-todo">Ta bort</button>
        `;
            whichDiv.appendChild(newDiv);
        }
    }
}
function addTodoList() {
    const taskInput = document.getElementById('todoInput');
    const priorityInput = document.getElementById('priorityInput');
    const completedInput = false;
    const task = taskInput.value;
    const priority = parseInt(priorityInput.value);
    const newTodoList = new TodoList_1.TodoList(task, completedInput, priority);
    if (TodoList_1.TodoList.addTodo(newTodoList)) {
        TodoList_1.TodoList.saveToLocalStorage();
        buildList();
        taskInput.innerHTML = "";
        priorityInput.innerHTML = "";
    }
    else {
        alert('Du måste fylla i både en uppgift och en prioritet!');
    }
}
