import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Item({ task, tasks, addTask, taskTitle }) {
  const deleteTaskHandler = () => {
    addTask(tasks.filter((el) => el.id !== task.id));
  };

  const checkTaskHandler = () => {
    addTask(
      tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      })
    );
  };

  return (
    <li className="list__item item">
      <button
        onClick={checkTaskHandler}
        className="item__check btn"
        aria-label="check-task"
      >
        <FontAwesomeIcon icon={faCheck} className="icon" />
      </button>
      <p className={`item__text ${task.status ? "item__text--checked" : ""}`}>
        {taskTitle}
      </p>
      <button
        onClick={deleteTaskHandler}
        className="item__delete btn"
        aria-label="delete-task"
      >
        <FontAwesomeIcon icon={faTrash} className="icon" />
      </button>
    </li>
  );
}

export default Item;
