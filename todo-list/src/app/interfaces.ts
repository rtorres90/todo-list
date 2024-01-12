// Task interface representing an individual task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// TodoList interface representing a todo list
interface TodoList {
    title: string;
    tasks: Task[];
}
