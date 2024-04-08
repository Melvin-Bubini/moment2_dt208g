"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
class TodoList {
    constructor(task, completed, priority) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }
    static addTodo(addNew) {
        if (addNew.task.length > 0 && addNew.priority >= 1 && addNew.priority <= 3) {
            this.todos.push(addNew);
            this.todos.sort((n1, n2) => {
                if (n1.priority > n2.priority) {
                    return 1;
                }
                if (n1.priority < n2.priority) {
                    return -1;
                }
                return 0;
            });
            return true;
        }
        else {
            return false;
        }
    }
    static markTodoCompleted(todoIndex) {
        const tempObject = this.todos[todoIndex];
        const updtdTodoList = new TodoList(tempObject.task, true, tempObject.priority);
        this.todos.splice(todoIndex, 1, updtdTodoList);
    }
}
exports.TodoList = TodoList;
TodoList.todos = [];
