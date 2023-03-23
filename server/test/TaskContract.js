const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TaskContract", () => {
  let TaskContract;
  let taskContract;
  let owner;

  beforeEach(async function () {
    TaskContract = await ethers.getContractFactory("TaskContract");
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();
  });

  // describe("createTask", () => {
  //   it("should return true when return Hello World task", async () => {
  //     // const tasksFromChain = await taskContract.getCountTask();
  //     await taskContract.createTask("Test create task");
  //     const test = await taskContract.tasks(1);
  //     expect(test[1]).to.equal("Hello World task");
  //   });
  // });

  // describe("get list tasks", () => {
  //   it("should return taskList", async () => {
  //     const countTaskFromChain = await taskContract.getCountTask();
  //     for (let i = 0; i < countTaskFromChain; i++) {
  //       console.log(await taskContract.tasks(i));
  //     }
  //   });
  // });

  describe("complete the task", () => {
    it("should return isCompleted equal to true", async () => {
      await taskContract.completedTask(1);
      const test = await taskContract.tasks(1);
      expect(test.isCompleted).to.equal(true);
    });
  });
});
