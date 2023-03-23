import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

InputText.propTypes = {};

function InputText(props) {
  const { handleOnChangeInput, inputValue } = props;
  return (
    <input
      className="form-control w-50"
      type="text"
      placeholder="New task ... "
      aria-label="default input example"
      onChange={(e) => handleOnChangeInput(e)}
      value={inputValue}
    />
  );
}

export default InputText;
