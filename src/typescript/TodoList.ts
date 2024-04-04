import { Todo } from "./interface";

export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3; // 1 för högsta prioritet, 2 för mellanprioritet, 3 för lägsta prioritet

    static todos: Todo[] = []; // En array av Todo-objekt

    constructor(task: string, completed: boolean, priority: 1 | 2 | 3) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    /*Metod som returnerar true om formuläret är rätt 
    ifyllt och då även sorterar och buckar till arrayen med todos.
    */
    public static addTodo(addNew: Todo): boolean {
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

    public static markTodoCompleted (todoIndex: number): void {
        const tempObject = this.todos[todoIndex];
        const updtdTodoList = new TodoList (tempObject.task, true, tempObject.priority);
        this.todos.splice(todoIndex, 1, updtdTodoList);
    }


    // public static getTodos(): Todo[] {

    // }
}

