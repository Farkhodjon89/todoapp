import "./App.module.css";
import {useTypedDispatch, useTypedSelector} from "app/redux";
import {useEffect} from "react";
import styles from "./App.module.css";
import TodoList from "pages/main/ui/TodoList";
import Header from "pages/main/ui/Header";
import Action from "pages/main/ui/Action";
import {TodosService} from "entities/Todo/api";

const App = () => {
    const {todos, loading} = useTypedSelector((state) => state.todos);
    const fetch = useTypedDispatch();

    useEffect(() => {
        fetch(TodosService.fetchTodos());
    }, []);

    return (
        <div className={styles.app}>
            <Header/>
            <div className={styles.wrapper}>
                <div className="action">
                    <Action/>
                </div>
                <div className={styles.content}>
                    {loading ? <h1>Loading...</h1> : <TodoList todos={todos}/>}
                </div>
            </div>
        </div>
    );
};

export default App;
