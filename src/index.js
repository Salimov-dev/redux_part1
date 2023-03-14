import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChanged,
  taskDeleted,
  completTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  getError,
  createNewTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  console.log("state", state);
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const removeTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const handleAddNewTask = () => {
    const newTask = {
      userId: 1,
      id: "",
      title: "New title",
      completed: false,
    };
    dispatch(createNewTask(newTask));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>APP</h1>
      <button onClick={handleAddNewTask}>Add new task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>change title</button>
            <button onClick={() => removeTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
