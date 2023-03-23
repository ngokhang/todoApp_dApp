import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

Button.propTypes = {};

function Button(props) {
  const { handleAddTaskClick } = props;
  return (
    <button
      className="btn btn-primary text-white ms-2"
      onClick={(e) => handleAddTaskClick(e)}
    >
      Add
    </button>
  );
}

export default Button;
