import React, { useCallback } from "react";
import { useState } from "react";
import SwitchBtn from "./SwitchBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRainbow } from "@fortawesome/free-solid-svg-icons";

function Header({ units, setUnits }) {
  const [checked, setChecked] = useState(false);

  const handleCheckChange = useCallback(() => {
    setChecked(!checked);
    setUnits(checked === true ? "imperial" : "metric");
  }, [units]);

  return (
    <header className="header">
      <h1 className="header__title">
        <FontAwesomeIcon icon={faRainbow} className="icon"></FontAwesomeIcon>
        Weather App{" "}
      </h1>
      <SwitchBtn checked={checked} handleCheckChange={handleCheckChange} />
    </header>
  );
}

export default Header;
