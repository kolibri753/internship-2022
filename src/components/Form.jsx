import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Form({ setInputText, inputText, tasks, addTask }) {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();

    if (!inputText) {
      alert("The ToDo can't be empty!");
      return;
    }

    const d = new Date();
    addTask([...tasks, { title: inputText, status: false, id: d.getTime() }]);
    setInputText("");
  };

  return (
    <form className="main__form form" action="#" method="get">
      <input
        onChange={inputTextHandler}
        value={inputText}
        className="form__input"
        type="text"
        placeholder="Write down your todo..."
        required
      />
      <button
        onClick={addTaskHandler}
        className="form__submit btn"
        type="submit"
        aria-label="submit-task"
      >
        <FontAwesomeIcon icon={faPlus} className="icon" />
      </button>
    </form>
  );
}

export default Form;
