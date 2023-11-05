import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "./types.ts";

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: "",
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        todosFetching(state) {
            state.loading = true;
        },
        todosFetchingSuccess(state, action: PayloadAction<Todo[]>) {
            state.loading = false;
            state.error = "";
            state.todos = action.payload;
        },
        todosFetchingError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.unshift(action.payload);
        },
        removeTodo(state, action: PayloadAction<{ id: number }>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        toggleTodo(
            state,
            action: PayloadAction<{ id: number; completed: boolean }>,
        ) {
            const toggledTodo = state.todos.find(
                (todo) => todo.id === action.payload.id,
            );

            if (toggledTodo) {
                toggledTodo.completed = action.payload.completed;
            }
        },
    },
});

export const {
    todosFetching,
    todosFetchingSuccess,
    todosFetchingError,
    addTodo,
    removeTodo,
    toggleTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
