import React from "react";

const Form = ({ todo, setTodo, createTodo }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Enter a task"
        className="task-input"
        value={todo}
        onChange={({ target }) => setTodo(target.value)}
      />
      <button className="button-add" type="submit" onClick={createTodo}>
        Add
      </button>
    </form>
  );
};

export default Form;
