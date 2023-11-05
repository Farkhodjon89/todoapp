import {Todo} from "src/entities/Todo/model/types";
import styles from "./index.module.css";
import {useTypedDispatch} from "app/redux";
import {TodosService} from "entities/Todo/api";

const TodoItem = ({todo: {text, completed, id}}: { todo: Todo }) => {
    const dispatch = useTypedDispatch();
    const handleCheckedUpdate = () => {
        dispatch(TodosService.updateTodo(id, {completed: !completed}));
    };

    const handleRemove = () => {
        dispatch(TodosService.deleteTodo(id));
    };

    return (
        <div className={styles.row}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={completed}
                onChange={handleCheckedUpdate}
            />
            <span className={styles.text}>{text}</span>
            <span className={styles.delete} onClick={handleRemove}>
        <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={24}
            height={24}
        >
          <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
              fill="currentColor"
          />
        </svg>
      </span>
        </div>
    );
};

export default TodoItem;
