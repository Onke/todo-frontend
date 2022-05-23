import React from "react";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <div>
      {todos.map(({ _id, task, completed }) => (
        <li
          key={_id}
          value={task}
          className={completed ? " list-item completed" : "list-item"}
        >
          <input
            type="text"
            value={task}
            className="list"
            onChange={(event) => event.preventDefault}
          />
          <div className="icons">
            <button
              className={"button-complete task-butto"}
              onClick={(event) => updateTodo(event, _id)}
            >
              <i className="fa fa-check-circle"></i>
            </button>

            <button
              className="button-delete task-button"
              onClick={(e) => deleteTodo(e, _id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodoList;
