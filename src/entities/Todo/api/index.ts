
import axios from "axios";
import {Todo, TodoApi} from "../model/types.ts";
import {
    addTodo,
    removeTodo,
    todosFetching,
    todosFetchingError,
    todosFetchingSuccess,
    toggleTodo,
} from "../model";
import {AppDispatch} from "app/store";

export const TodosService = {
    fetchTodos: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(todosFetching());
            const response = await axios.get<TodoApi[]>(
                "https://jsonplaceholder.typicode.com/todos?_limit=10",
            );
            dispatch(
                todosFetchingSuccess(
                    response.data.map(({id, title, completed}) => ({
                        id,
                        text: title,
                        completed,
                    })),
                ),
            );
        } catch (e: unknown) {
            dispatch(todosFetchingError((e as Error).message));
        }
    },
    createTodo: (newTodo: Omit<Todo, "id">) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<Todo>(
                "https://jsonplaceholder.typicode.com/todos",
                newTodo,
            );

            dispatch(
                addTodo({
                    ...response.data,
                    id: parseInt((Math.random() * 10000000000000).toString()),
                }),
            );
        } catch (e: unknown) {
            dispatch(todosFetchingError((e as Error).message));
        }
    },
    updateTodo:
        (id: number, fields: Partial<Omit<Todo, "id">>) =>
            async (dispatch: AppDispatch) => {
                try {
                    const response = await axios.patch<Todo>(
                        `https://jsonplaceholder.typicode.com/todos/${id}`,
                        {...fields},
                    );
                    dispatch(toggleTodo({id, completed: response.data.completed}));
                } catch (e: unknown) {
                    dispatch(todosFetchingError((e as Error).message));
                }
            },
    deleteTodo: (id: number) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
            );
            console.log(response);
            dispatch(removeTodo({id}));
        } catch (e: unknown) {
            dispatch(todosFetchingError((e as Error).message));
        }
    },
};
