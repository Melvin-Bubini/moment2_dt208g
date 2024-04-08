import { TodoList } from "./TodoList";


// formuläret
const form: HTMLFormElement = document.getElementById('todoForm') as HTMLFormElement;

// knapp för att tömma listan på inlägg
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

function removeTodo (e: MouseEvent): void {
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

}


//Funktion för att hämta formulärdata och checka om den är korrekt ifylld
function addTodoList(): void {
    
}