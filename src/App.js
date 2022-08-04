import React, { useEffect, useState } from "react";
import "./styles/style.scss";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, addTask] = useState([]);

  useEffect(() => {   
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [tasks]);

  const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadFromLocalStorage = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      const localList = JSON.parse(localStorage.getItem("tasks"));
      addTask(localList);
    }
  };

  return (
    <main className="main">
      <Form
        setInputText={setInputText}
        inputText={inputText}
        tasks={tasks}
        addTask={addTask}
      />
      <List tasks={tasks} addTask={addTask} />
    </main>
  );
}

export default App;
