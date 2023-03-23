import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "./Button/Button";
import InputText from "./InputText/InputText";

Input.propTypes = {};

function Input(props) {
  const { handleAddTaskClick, handleOnChangeInput, inputValue } = props;
  return (
    <div
      className="form row my-3 d-flex justify-content-center"
      handleOnChangeInput={handleOnChangeInput}
      handleAddTaskClick={handleAddTaskClick}
      inputValue={inputValue}
    >
      <InputText
        className="form-control w-50"
        handleOnChangeInput={handleOnChangeInput}
        inputValue={inputValue}
      />
      <Button handleAddTaskClick={handleAddTaskClick} />
    </div>
  );
}

export default Input;
