import React, { useState, useEffect } from "react";
import "./HabitList.css";

export default function HabitList() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Beber água", count: 0 },
          { id: 2, name: "Alongar", count: 0 },
          { id: 3, name: "Estudar", count: 0 },
        ];
  });

  const [newHabit, setNewHabit] = useState("");

  // Persistência
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Funções
  const increment = (id) =>
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, count: h.count + 1 } : h))
    );

  const decrement = (id) =>
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id && h.count > 0 ? { ...h, count: h.count - 1 } : h
      )
    );

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits((prev) => [...prev, { id: Date.now(), name: newHabit, count: 0 }]);
    setNewHabit("");
  };

  const removeHabit = (id) => setHabits((prev) => prev.filter((h) => h.id !== id));

  const resetAll = () => setHabits((prev) => prev.map((h) => ({ ...h, count: 0 })));

  return (
    <div className="container">
      <h1 className="header">Daily Boost 💫</h1>

      {/* Adicionar hábito */}
      <div className="add-habit">
        <input
          type="text"
          placeholder="Novo hábito..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Adicionar</button>
      </div>

      {/* Lista de hábitos */}
      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card">
            <span className="habit-name">{habit.name}</span>
            <div className="habit-controls">
              <button className="btn" onClick={() => decrement(habit.id)}>
                −1
              </button>
              <span className="count">{habit.count}</span>
              <button className="btn" onClick={() => increment(habit.id)}>
                +1
              </button>
              <button className="remove" onClick={() => removeHabit(habit.id)}>
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resetar todos */}
      {habits.length > 0 && (
        <div className="actions">
          <button onClick={resetAll}>Resetar Todos</button>
        </div>
      )}
    </div>
  );
}
