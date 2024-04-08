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

    public static markTodoCompleted(todoIndex: number): void {
        const tempObject = this.todos[todoIndex];
        const updtdTodoList = new TodoList(tempObject.task, true, tempObject.priority);
        this.todos.splice(todoIndex, 1, updtdTodoList);
    }


    public static getTodos(): Todo[] {
        return this.todos;
    }

    //Metod som sparar arrayen till localstorage
    public static saveToLocalStorage(): void {
        localStorage.setItem("Todos key", JSON.stringify(this.todos));
    }


    //Laddar upp hela listan från arrayen och sparar över den till todos-arrayen
    public static loadFromLocalStorage(): void {
        if (localStorage.length > 0) {
            let tempTodos: Todo[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                let tempArray: any = JSON.parse(localStorage.getItem("Todos key")!);
                tempArray.forEach((element: Todo) => {
                    tempTodos.push(element);
                });
            }
            this.todos = tempTodos;
        }
    }


    //metod som rensar todos
    public static clearTodos(): void {
        let tempTodos: Todo[] = [];
        this.todos = tempTodos;
    }

    // metod som tar bort todos baserat på index
    public static removeTodo(index: number): void {
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
    }

}

