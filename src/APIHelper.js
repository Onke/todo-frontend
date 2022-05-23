import fetch from "node-fetch";

const API_URL = "http://localhost:9000/todos/";

function checkResponse(response) {
  if (response.ok) {
    return response;
  } else
    throw new Error(
      `The HTTP status of the reponse: ${response.status} (${response.statusText})`
    );
}

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function createTodo(task) {
  const newTask = {
    task: task,
    completed: false,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: headers,
  }).then(checkResponse);

  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);

  return res.json();
}

async function updateTodo(id, payload) {
  const res = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: headers,
  }).then(checkResponse);

  return res.json();
}

async function getAllTodos() {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: headers,
  }).then(checkResponse);

  return res.json();
}

console.log(createTodo);

export default { createTodo, deleteTodo, updateTodo, getAllTodos };
