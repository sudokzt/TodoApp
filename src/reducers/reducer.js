import { ALL, DONE, NOT_DONE, ADD_TASK, INPUT_TASK, DONE_TASK, SELECT_TASKTYPE } from '../constants/Task';

const initialState = {
  task: {
    name: '',
    status: '',
  },
  tasks: [],
  printTask: ALL,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_TASK:
      return {
        ...state,
        task: {
          name: action.payload.task,
          // status: state.task.status,
        }
      }
    case ADD_TASK:
      const newTask = {
        id: state.tasks.length,
        name: action.payload.task,
        status: NOT_DONE,
      };
      return {
        ...state,
        task: {
          name: '',
          status: '',
        },
        tasks: state.tasks.concat([newTask]),
      }
    case DONE_TASK:
      const doneTaskIndex = action.payload.taskId;
      const updateTasks = state.tasks.slice(); // 配列コピー
      updateTasks[doneTaskIndex].status = (updateTasks[doneTaskIndex].status === DONE) ? NOT_DONE : DONE;
      // newTasks.splice(doneTaskIndex, 1); // 要素削除(=完了)
      return {
        ...state,
        tasks: updateTasks,
      }
    case SELECT_TASKTYPE:
      return {
        ...state,
        printTask: action.payload.printTask,
      };
    default:
      return state;
  }
}
