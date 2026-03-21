"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) {
      return;
    }

    setTodos((current) => [
      { id: Date.now(), text, done: false },
      ...current,
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const pendingCount = todos.filter((todo) => !todo.done).length;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Todo App</h1>
        <p className={styles.subtitle}>{pendingCount} task(s) remaining</p>

        <form className={styles.form} onSubmit={addTodo}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add a new task"
            aria-label="New todo"
          />
          <button className={styles.addButton} type="submit">
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className={styles.empty}>No tasks yet.</p>
        ) : (
          <ul className={styles.list}>
            {todos.map((todo) => (
              <li className={styles.item} key={todo.id}>
                <label className={styles.checkboxWrap}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.done ? styles.doneText : styles.todoText}>
                    {todo.text}
                  </span>
                </label>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
