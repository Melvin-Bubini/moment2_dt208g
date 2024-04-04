export interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3; // 1 för högsta prioritet, 2 för mellanprioritet, 3 för lägsta prioritet
}