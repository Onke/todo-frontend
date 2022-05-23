import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }

    const newTodo = await APIHelper.createTodo(todo);

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {
      completed: !todos.find((todo) => todo._id === id).completed,
    };
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form todo={todo} setTodo={setTodo} createTodo={createTodo} />
        </div>
        <div>
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
