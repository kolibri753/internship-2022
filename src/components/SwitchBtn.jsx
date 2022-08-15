import React from "react";

function SwitchBtn({checked, handleCheckChange}) {
  
  return (
    <div className="switch">
      <span className="switch__text switch__text--red">°F</span>
      <label className="switch__container" htmlFor="switch-checkbox">
        <input
          className="switch__checkbox"
          id="switch-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckChange}
        />
        <span className="switch__icon"></span>
      </label>
      <span className="switch__text switch__text--blue">°C</span>
    </div>
  );
}

export default SwitchBtn;
