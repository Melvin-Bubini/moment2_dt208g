import { TodoList } from "./TodoList";


// formuläret
const form: HTMLFormElement = document.getElementById('todoForm') as HTMLFormElement;

// knapp för att tömma listan på inlägg7
const delete_localStrgBtn: HTMLButtonElement = document.getElementById('delete_localStrgBtn') as HTMLButtonElement;

// divar för att läsa in data till html
const todoDiv: HTMLDivElement = document.getElementById('todoDiv') as HTMLDivElement;

const todoCompleted: HTMLDivElement = document.getElementById('todoCompleted') as HTMLDivElement;

// Knappar för att väja lista över ofärdiga eller färdiga
const completedBtn: HTMLDivElement = document.getElementById('completed_btn') as HTMLDivElement;
const todoBtn: HTMLDivElement = document.getElementById('todo_btn') as HTMLDivElement;

//För att dölja eller visa vilken lista som visas
const todoListDivs: HTMLDivElement = document.getElementById('todoListDivs') as HTMLDivElement;
const completedListDivs: HTMLDivElement = document.getElementById('completedListDivs') as HTMLDivElement;

//Bygger upp sidan från localstorage och aktiverar eventlisteners
document.addEventListener('DOMContentLoaded', () => {
    //Bygger upp sidan från localstorage
    buildList();

    //Eventlistener för att kunna ta bort inlägg eller markera som klara
    todoDiv.addEventListener('click', (e) => {
        removeTodo(e);
    });

    //Eventlistener för att kunna ta bort inlägg eller markera som klara
    todoCompleted.addEventListener('click', (e) => {
        removeTodo(e);
    });

    //Eventlistener för att visa ofärdiga inlägg och dölja klara
    todoBtn.addEventListener('click', (e) => {
        todoListDivs.style.display = "block";
        todoBtn.style.textDecoration = "underline";
        completedListDivs.style.display = "none";
        completedBtn.style.textDecoration = "none";
    });

    //Eventlistener för att visa klara inlägg och dölja ofärdiga    
    completedBtn.addEventListener('click', (e) => {
        todoListDivs.style.display = "none";
        todoBtn.style.textDecoration = "none";
        completedBtn.style.textDecoration = "underline";
        completedListDivs.style.display = "block";
    });

    //Eventlistener som tömmer localstorage, rensar html-sidan och resetar arrayen med inlägg.
    delete_localStrgBtn.addEventListener('click', (e) => {
        localStorage.clear();
        todoDiv.innerHTML = "";
        todoCompleted.innerHTML = "";
        TodoList.clearTodos();
    });

    /*Lägg till händelselyssnare på formuläret som tar bort default
     beteende från det och kör funktionen för att spara inlägg vid klicka på submit*/
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodoList();
    });

});

//Funktion som tar bort inlägg eller markerar som klara

function removeTodo(e: MouseEvent): void {
    if ((e.target as HTMLButtonElement).classList.contains('remove-todo')) {
        let index = Number((e.target as HTMLElement).title);
        //skickar med index för inlägget till removeTodo funktionen i klassen todolist
        TodoList.removeTodo(index);
    }
    if ((e.target as HTMLButtonElement).classList.contains('box')) {
        //Skickar med index till metoden marktodocompleted och resettar med metoden savetolocalstorage
        TodoList.markTodoCompleted(Number((e.target as HTMLElement).id));
        TodoList.saveToLocalStorage();
    }
    //Bygger upp sidan med nya arrayen
    buildList();
}


//Funktion som bygger upp todo-inläggen på sidan
function buildList(): void {
    // laddar från localstorage
    TodoList.loadFromLocalStorage();
    // hämtar arrayen med todos
    let tempArray = TodoList.getTodos();

    // rensar rensar html-elementen
    todoDiv.innerHTML = "";
    todoCompleted.innerHTML = "";

    // så länge arrayen har element i sig så byggs innehåller från arrayen
    if (tempArray.length > 0) {
        for (let i = 0; i < tempArray.length; i++) {
            let box: string = "";
            let disabled: string = "";
            let newDiv: HTMLDivElement = document.createElement("div");
            let whichDiv: HTMLDivElement = todoDiv;
            //Om objektet är markerat som complete blir checkboxen ifylld, disabled och den appends till en annan div.
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


//Funktion för att hämta formulärdata och checka om den är korrekt ifylld
function addTodoList(): void {
    // hämtar input data från inputfälten
    const taskInput = document.getElementById('todoInput') as HTMLInputElement;
    const priorityInput = document.getElementById('priorityInput') as HTMLInputElement;
    // completedInput sätts till false som default
    const completedInput: boolean = false;

    // sparar värden från input-datan
    const task: string = taskInput.value;
    const priority: number = parseInt(priorityInput.value);

    // skapar ett objekt med constructorn i klassen TodoList
    const newTodoList = new TodoList(task, completedInput, priority);

    /*Skickar med nya objectet till metoden för att se om det är korrekt ifyllt. 
    Isåfall läggs objektet till i arrayen och sorteras efter prioritet. Annars får man en
    alert*/

    if (TodoList.addTodo(newTodoList)) {
        //Arrayen sparas till localstorage och sidan byggs upp med den nya arrayen
        TodoList.saveToLocalStorage();
        buildList();

        //Rensar ifyllda uppgifter i formuläret
        taskInput.innerHTML = "";
        priorityInput.innerHTML = "";
    }
    else {
        alert('Du måste fylla i både en uppgift och en prioritet!');
    }
}

