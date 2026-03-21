"use client";

import { FormEvent, useMemo, useState } from "react";
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

    setTodos((current) => [{ id: Date.now(), text, done: false }, ...current]);
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

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos],
  );
  const completedCount = todos.length - pendingCount;
  const completionRate = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Daily Planner</p>
          <h1 className={styles.title}>Ship your day, one task at a time.</h1>
          <p className={styles.subtitle}>Capture tasks quickly, track momentum, and clear what matters.</p>
        </section>

        <section className={styles.stats} aria-label="Task stats">
          <article className={styles.statCard}>
            <p className={styles.statLabel}>Total</p>
            <p className={styles.statValue}>{todos.length}</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statLabel}>Open</p>
            <p className={styles.statValue}>{pendingCount}</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statLabel}>Done</p>
            <p className={styles.statValue}>{completedCount}</p>
          </article>
        </section>

        <section className={styles.progressWrap} aria-label="Completion progress">
          <div className={styles.progressHead}>
            <p>Progress</p>
            <p>{completionRate}%</p>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${completionRate}%` }} />
          </div>
        </section>

        <form className={styles.form} onSubmit={addTodo}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Write a task..."
            aria-label="New todo"
          />
          <button className={styles.addButton} type="submit" disabled={input.trim().length === 0}>
            Add task
          </button>
        </form>

        {todos.length === 0 ? (
          <p className={styles.empty}>No tasks yet. Add one to get started.</p>
        ) : (
          <ul className={styles.list}>
            {todos.map((todo) => (
              <li className={todo.done ? `${styles.item} ${styles.itemDone}` : styles.item} key={todo.id}>
                <label className={styles.checkboxWrap}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.done ? styles.doneText : styles.todoText}>{todo.text}</span>
                </label>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
