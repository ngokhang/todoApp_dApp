import React from "react";
import Task from "./Task/Task";

function ListTask(props) {
  const { listTask, handleOnClickInput } = props;
  return (
    <ul>
      {listTask.map((e) => (
        <Task
          className="task d-flex flex-row-reverse gap-2 justify-content-between"
          key={e.id}
          id={e.id}
          onClickComplete={handleOnClickInput}
          taskTitle={e.title}
        />
      ))}
    </ul>
  );
}

export default ListTask;
