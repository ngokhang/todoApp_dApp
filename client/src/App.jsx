import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskAbi from "./utils/TaskContract.json";
import { ethers } from "ethers";
import { TaskContractAddress } from "./config/TaskContractAddress.js";
import Task from "./components/ListTask/Task/Task";

function App() {
  let [tasks, setTasks] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [currentAccount, setCurrentAccount] = useState("");
  let [connected, setConnected] = useState(false);

  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0x7a69";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Testnet!");
        return;
      } else {
        setConnected(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const getAllTasks = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        let allTasks = Number(await TaskContract.getCountTask());
        let newList = [];
        for (let i = 0; i < allTasks; i++) {
          let task = await TaskContract.tasks(i);
          let newTask = {
            id: Number(task[0]),
            title: task[1],
            isCompleted: task[2],
          };
          if (newTask.isCompleted) continue;
          newList.push(newTask);
        }
        setTasks(newList);
        // console.log(tasks);
      } else {
        console.log("Ethereum object not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTaskClick = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        await TaskContract.createTask(inputValue);
      } else {
        console.log("Ethereum object not exist");
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };

  const handleOnChangeInput = async (e) => {
    setInputValue(e.target.value);
  };

  const handleOnClickInput = async (id) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        await TaskContract.completedTask(id);
      } else {
        console.log("Ethereum object not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  return (
    <div>
      {!connected ? (
        <button className="btn btn-primary" onClick={connectToWallet}>
          Connect to wallet
        </button>
      ) : (
        <div className="container">
          <div className="row h-100 pt-3 d-flex justify-content-center">
            <div className="row">
              <h1 className="text-center">Todo App</h1>
            </div>
            <div className="form row my-3">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control w-50"
                  type="text"
                  placeholder="New task ... "
                  aria-label="default input example"
                  onChange={(e) => handleOnChangeInput(e)}
                  value={inputValue}
                />
                <button
                  className="btn btn-primary text-white ms-2"
                  onClick={(e) => handleAddTaskClick(e)}
                >
                  Add
                </button>
              </div>
            </div>
            <ul className="list__tasks">
              {tasks.map((e) => (
                <Task
                  className="task d-flex flex-row-reverse gap-2 justify-content-between"
                  key={e.id}
                  id={e.id}
                  onClickComplete={handleOnClickInput}
                  taskTitle={e.title}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
