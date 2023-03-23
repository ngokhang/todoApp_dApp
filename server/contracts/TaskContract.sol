// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TaskContract {
    uint countTask = 0;

    struct Task {
        uint id;
        string taskTitle;
        bool isCompleted;
    }

    mapping(uint => Task) public tasks;

    function createTask(string memory _taskName) public {
        tasks[countTask] = Task(countTask, _taskName, false);
        countTask++;
    }

    function getCountTask() public view returns (uint) {
        return countTask;
    }

    function completedTask(uint idTask) public {
        tasks[idTask].isCompleted = true;
    }

    constructor() {
        createTask("Hello World task");
        createTask("Hello World task 2");
    }
}
