import React from "react";
import Item from "./Item";

function List({ tasks, addTask }) {
  return (
    <ul className="main__list list">
      {tasks.map((task) => (
        <Item
          tasks={tasks}
          addTask={addTask}
          key={task.id}
          task={task}
          taskTitle={task.title}
        />
      ))}
    </ul>
  );
}

export default List;
