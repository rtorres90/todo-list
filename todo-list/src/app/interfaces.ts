// Task interface representing an individual task
export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// TodoList interface representing a todo list
export interface TodoList {
    title: string;
    tasks: Task[];
}
