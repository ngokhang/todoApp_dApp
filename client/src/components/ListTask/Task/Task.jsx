import React from "react";
// import PropTypes from "prop-types";

Task.propTypes = {};

function Task(props) {
  const { taskTitle, id, onClickComplete } = props;
  return (
    <li className="task d-flex flex-row-reverse gap-2 justify-content-between">
      <input
        type="checkbox"
        name="isCompleted"
        id="isCompletedCheck"
        className="mt-1 me-1"
        onClick={() => onClickComplete(id)}
      />
      <p className="task__title m-0">{taskTitle}</p>
    </li>
  );
}

export default Task;
