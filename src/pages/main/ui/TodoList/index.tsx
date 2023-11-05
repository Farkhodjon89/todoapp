import TodoItem from "../TodoItem";
import { Todo } from "../../../../entities/Todo/model/types.ts";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
