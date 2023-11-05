import {useState} from "react";
import styles from "./index.module.css";
import {useTypedDispatch} from "app/redux";
import {TodosService} from "entities/Todo/api";

const Action = () => {
    const [text, setText] = useState("");
    const dispatch = useTypedDispatch();

    const handleCreateTodo = () => {
        const trimValue = text.trim();
        if (!trimValue) return;

        dispatch(TodosService.createTodo({text: trimValue, completed: false}));
        setText("");
    };

    return (
        <div className={styles.row}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTodo();
                }}
            >
                <input
                    type="text"
                    id="text"
                    placeholder="Add New Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                />
                <button className={styles.button} type="submit">
                    <svg
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                    >
                        <path
                            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Action;
