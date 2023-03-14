import { createAction, createSlice } from "@reduxjs/toolkit";
import { setError } from "./errors";
import todosService from "./services/todos.service";

const initialState = {
  entities: [],
  isLoading: true,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed } = actions;

export const loadTasks = () => async (dispatch) => {
  try {
    const data = await todosService.fetch();
    dispatch(taskRequested());
    dispatch(recived(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export const getError = () => (state) => state.errors.entities[0];

export default taskReducer;
