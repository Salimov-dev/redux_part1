import { legacy_createStore as createStore } from "redux";
import { taskReducer } from "./taskReducer";

const initialState = [
  { id: 1, title: "Task1", completed: false },
  { id: 2, title: "Task2", completed: false },
];

export function initiateStore() {
  return createStore(taskReducer, initialState);
}
