const defaultState = {
  initialized: false,
  completed: false,
  title: '',
  tasks: []
}

const SET_TITLE = 'SET_TITLE';
const SET_TASKS = 'SET_TASKS';
const COMPLETE_SUBTASK = 'COMPLETE_SUBTASK';
const SET_COMPLETED = 'SET_COMPLETED';
const SET_INITIALIZED = 'SET_INITIALIZED';

export const taskManagerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    case SET_TASKS: {
      return {
        ...state,
        tasks: action.payload
      }
    }
    case COMPLETE_SUBTASK: {
      const { tasks } = state;
      const { taskId, subtaskId } = action.payload;

      let completed = false;

      const taskIndex = tasks.findIndex(task => task.id === taskId);
      const subtaskIndex = tasks[taskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);

      tasks[taskIndex].subtasks[subtaskIndex].completed = true;
      
      if (!tasks[taskIndex].subtasks.find(subtask => !subtask.completed)) {
        tasks[taskIndex].completed = true;
      }

      if (!tasks.find(task => !task.completed)) {
        completed = true;
      }

      return {
        ...state,
        completed: completed,
        tasks: tasks
      }
    }
    case SET_COMPLETED: {
      return {
        ...state,
        completed: action.payload
      }
    }
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export const actions = {
  setTitle: payload => ({ type: SET_TITLE, payload }),
  setTasks: payload => ({ type: SET_TASKS, payload }),
  completeSubtask: payload => ({ type: COMPLETE_SUBTASK, payload }),
  setCompleted: payload => ({ type: SET_COMPLETED, payload }),
  setInitialized: payload => ({ type: SET_INITIALIZED, payload }),
}